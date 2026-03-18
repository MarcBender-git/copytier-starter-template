---
name: new-client
description: Start a new contractor website project. Triggers the strategy-site-config skill.
disable-model-invocation: true
---
# New Client Website Build

Start a new Copytier contractor website build: $ARGUMENTS

## Workflow

1. If arguments contain a Build Brief (long text with sections), parse it and proceed to step 3.
2. If arguments are empty or just a company name, ask: "Paste your filled-in Build Brief to start the build. Use the template at docs/build-brief-template.md"
3. Activate the strategy-site-config skill to process the Build Brief.
4. Generate site.config.ts at src/config/site.config.ts
5. Run the validation checklist.
6. Output the summary and confirm "Ready for Pack 2."
