import re

with open('frontend/pages/admin/slots/[id].vue', 'r', encoding='utf-8') as f:
    text = f.read()

template_match = re.search(r'<template>(.*?)</template>', text, re.DOTALL)
if template_match:
    template_content = template_match.group(1)
    lines = template_content.split('\n')

    stack = []

    for i, line in enumerate(lines):
        for m in re.finditer(r'<(/)?(div|form|nav|section|main|header|footer)\b[^>]*?(/)?>', line, re.IGNORECASE):
            if bool(m.group(3)): continue
            tag = m.group(2).lower()
            if bool(m.group(1)):
                if stack and stack[-1][0] == tag:
                    stack.pop()
                else:
                    print(f"Mismatch at line {i+1}: expected </{stack[-1][0] if stack else 'none'}> but found </{tag}>. Stack size: {len(stack)}")
                    if stack:
                        print(f"Top was opened at line {stack[-1][1]}")
            else:
                stack.append((tag, i+1))

    print("Remaining in stack:", [(t[0], t[1]) for t in stack])
