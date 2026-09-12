INCIDENT LEK-002

Cause: Renaming HTML IDs during refactor without renaming the corresponding querySelector strings.
Impact: Sick Bay remained stuck at "Checking authentication..."
Root cause: Error-40
Corrective action: Remember that CSS classes can be aspirational, IDs cannot. 