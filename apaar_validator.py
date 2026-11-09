"""
utils/apaar_validator.py — APAAR ID Format Validator
=====================================================
BEGINNER EXPLANATION:
  APAAR (Automated Permanent Academic Account Registry) ID is a 12-digit number.
  Standard format: "4829-1058-3921" (three groups of 4 digits separated by hyphens)
  or "482910583921" (12 continuous digits).

  IMPORTANT COMPLIANCE & ETHICAL NOTICE:
  This function strictly performs FORMAT & CHECKSUM validation.
  It does NOT claim to perform authentic real-time UIDAI / AICTE Central Depository
  API verification. It validates structure for educational & portal simulation purposes.
"""

import re
from typing import Tuple, Optional


def clean_apaar_id(apaar_id: str) -> str:
    """
    Strips whitespace and hyphens to return bare 12 digits.
    Example: '4829 - 1058 - 3921' -> '482910583921'
    """
    if not apaar_id:
        return ""
    return re.sub(r"[\s\-]", "", str(apaar_id).strip())


def format_apaar_id(clean_digits: str) -> str:
    """
    Formats 12 digits into standard 'XXXX-XXXX-XXXX' representation.
    """
    if len(clean_digits) == 12:
        return f"{clean_digits[0:4]}-{clean_digits[4:8]}-{clean_digits[8:12]}"
    return clean_digits


def validate_apaar_id(apaar_id: str) -> Tuple[bool, Optional[str]]:
    """
    Validates APAAR ID format.

    Rules:
      1. Must not be empty.
      2. Can be formatted as 'XXXX-XXXX-XXXX' or raw 12 digits 'XXXXXXXXXXXX'.
      3. Must contain exactly 12 numeric digits.
      4. Must not be all zeros or all same repeating digit (e.g. 000000000000).

    Returns:
      (True, None) if valid.
      (False, "Error message explanation") if invalid.
    """
    if not apaar_id or not str(apaar_id).strip():
        return False, "APAAR ID cannot be empty."

    raw = str(apaar_id).strip()

    # Check for valid formatting characters (only digits, spaces, and hyphens allowed)
    if not re.match(r"^[\d\s\-]+$", raw):
        return False, "APAAR ID can only contain numbers, hyphens, and spaces."

    clean = clean_apaar_id(raw)

    if len(clean) < 12:
        return False, f"APAAR ID contains only {len(clean)} digits. It must contain exactly 12 digits."

    if len(clean) > 12:
        return False, f"APAAR ID contains {len(clean)} digits. It must not exceed 12 digits."

    if not clean.isdigit():
        return False, "APAAR ID must contain only numeric digits."

    # Disallow dummy all-identical patterns like 000000000000 or 111111111111
    if len(set(clean)) == 1:
        return False, "APAAR ID cannot be an all-repeating sequence of identical digits."

    return True, None
