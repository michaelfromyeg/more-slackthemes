#!/usr/bin/env python3
"""
Pull YAML theme data from the original paracycle/slackthemes repository.

Run via `uv`, i.e., `uv run --with requests --with PyYAML scripts/themes.py`.
"""

import json
from pathlib import Path

import requests
import yaml

DEBUG = False


def fetch_themes() -> list:
    url = (
        "https://raw.githubusercontent.com/paracycle/slackthemes/master/data/themes.yml"
    )
    response = requests.get(url)
    response.raise_for_status()
    return yaml.safe_load(response.text)


def convert_themes(themes: list) -> str:
    formatted_themes = [
        {
            "name": theme["name"],
            "colors": theme["colors"],
            "submitter": {
                "name": "paracycle",
                "link": "https://github.com/paracycle/slackthemes",
            },
            "tags": ["paracycle"],
        }
        for theme in themes
    ]

    ts_code = f"""// `data/themes.ts` GENERATED BY `scripts/themes.py`
import {{ processTheme }} from "@/lib/theme-utils";
import {{ SlackTheme, Theme }} from "@/types/theme";

const rawThemes: SlackTheme[] = {json.dumps(formatted_themes, indent=2)};

const themes: Theme[] = rawThemes.map(processTheme);

export default themes;"""

    return ts_code


def main():
    script_path = Path(__file__)
    root_path = script_path.parent.parent
    output_path = root_path / "src" / "data" / "themes.ts"

    if DEBUG:
        print(f"{script_path=}, {root_path=}, {output_path=}")

    themes = fetch_themes()
    output_text = convert_themes(themes)
    output_path.write_text(output_text)
    print(f"Conversion complete! Check {output_path}")


if __name__ == "__main__":
    main()
