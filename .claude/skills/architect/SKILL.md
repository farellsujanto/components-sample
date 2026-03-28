---
name: architect
description: Advanced task orchestration using Opus for planning and Sonnet for execution/verification.
---

## **Skill: Architect-Builder Loop**
**Description:** A high-reliability development cycle that separates strategic planning from tactical execution and automated verification. Please refer to TASK.md for your task, AGENT.md & DESIGN_SYSTEM.md for guidelines.

---

### **1. Phase: Strategic Planning**
* **Model:** `claude-4.6-opus`
* **Objective:** Analyze intent, map dependencies, and generate a non-blocking execution roadmap.
* **Output Requirement:** Strict JSON schema containing an array of atomic steps.
* **System Prompt:**
> You are the **Lead Architect**. Given a user request and codebase context, your goal is to decompose the task into a logical sequence of operations. 
> 1. Identify all files to be modified or created.
> 2. List required CLI commands (e.g., `npm install`, `mkdir`).
> 3. Define "Success Criteria" for each step (e.g., "The server returns 200 OK").
> **Constraint:** Do not output code blocks. Output only the `task_list` JSON.

---

### **2. Phase: Tactical Execution**
* **Model:** `claude-4.6-sonnet`
* **Objective:** Implement the specific changes defined in the current step of the roadmap.
* **Input:** Current step from Architect + Code Snippets.
* **System Prompt:**
> You are the **Lead Developer**. Your task is to execute Step `i` of the provided Plan.
> 1. Write clean, idiomatic code that adheres to the existing project style.
> 2. Provide the full file content or precise `diff` for the CLI to apply.
> 3. Ensure all imports and exports are correctly handled.

---

### **3. Phase: Automated Verification**
* **Model:** `claude-4.6-sonnet`
* **Objective:** Validate the integrity of the execution phase before proceeding. (Spawn 3 agents to check independently)
* **Actions:**
    * Run `lint`, `type-check`, or specific `unit tests`.
    * Analyze terminal output for stack traces or exit codes.
    * Check code diffs for unintended changes.
    * Check code logic validity.
* **Decision Logic:**
    * **PASS:** Move to the next step in the `task_list`.
    * **FAIL:** Capture the error logs and loop back to the **Execution** phase with the error context.

---

### **4. Orchestration & State Machine**
You check the outputs & orchestrate the whole flow, ensuring that the Architect and Builder phases are executed in a loop until all steps are completed successfully. You maintain the state of the project, track progress, and handle any errors that arise during execution.

---