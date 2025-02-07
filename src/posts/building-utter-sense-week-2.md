---
title: "Building utter-sense: The Pivot"
date: "2024-02-07"
subtitle: "Making a pivot to explore browser-based audio handling while maintaining the project's practical utility"
---

### Introduction & Background

A few weeks ago, I introduced utter-sense, an open-source project that leverages Salesforce's telephony API to enhance customer service interactions. The initial implementation focused on analyzing voice calls in real-time, using utterances to surface relevant knowledge articles through semantic search against unstructured PDF documents stored in a vector database. This foundation proved to be a compelling starting point, but it also sparked my curiosity about the underlying mechanics of audio processing in web browsers.

While the original implementation relied heavily on abstracted APIs, I found myself increasingly curious about what was happening beneath these abstractions. This curiosity led to an interesting pivot in the project's direction, focusing on a more fundamental exploration of browser-based audio handling while maintaining the project's practical utility.

### The Pivot: Voice-Activated Assistants

The pivot emerged from a simple question: How can we create a more direct interaction model with Salesforce's AI capabilities? While Salesforce offers powerful generative AI agents, they're currently limited to text-based interactions, similar to the chat-based features of ChatGPT or Claude. I saw an opportunity to enhance this interaction model by adding voice capabilities, creating a bridge between natural spoken language and Salesforce's existing agent infrastructure.

What makes this particularly interesting is Salesforce's Agentforce framework, which allows these AI agents to be configured with specific actions that map to executable code within your Salesforce environment. Combined with their Atlas reasoning engine, this creates a foundation for intelligent voice-driven interactions with your Salesforce instance.

### Use Cases and Requirements

Consider a common scenario in enterprise environments: managing tasks and calendar events. Instead of navigating through multiple screens and click paths, imagine using voice commands to:
- Review upcoming tasks for the week
- Reschedule meetings based on availability
- Mark tasks as complete

The power lies in the combination of voice interaction and the Atlas reasoning engine's ability to understand intent and execute the appropriate configured actions. This creates a more natural and efficient interaction model while leveraging existing Salesforce infrastructure. Not to mention it also eliminates a lot of data entry tasks for users of Salesforce which has historically been a big pain point.

### Technical Stack Breakdown

The implementation architecture breaks down into several key components:

Frontend Framework:
In keeping with Salesforce's ecosystem, I chose Lightning Web Components (LWC) as the frontend framework. This decision simplifies integration with Salesforce environments while leveraging an open-source framework maintained by their team.

Voice Processing Layer:
For handling text-to-speech (TTS) and speech-to-text (STT) functionality, I evaluated several options before settling on OpenAI's Whisper API. The decision was driven by its superior performance characteristics and clear documentation, with initial testing confirming its reliability for our use case.

Agent Integration:
While AgentForce's API is still in development, I discovered a workable solution through Salesforce's in-app messaging API. This API, typically used for traditional chatbot sessions, provides the necessary infrastructure for maintaining conversational state and handling message flow with the autonomous agent.

Data Layer:
Rather than implementing a custom data model for conversation tracking, I leveraged Salesforce's existing in-app messaging data structures. This approach provides a robust foundation for tracking participants, messages, timestamps, and other conversation metadata while utilizing Salesforce's managed database infrastructure.

### Next Steps and Future Development

While the current implementation successfully handles the core test scenarios, there are several areas that I want to dive into for further exploration and refinement:

1. Performance optimization of the voice processing pipeline
2. Enhanced error handling and recovery mechanisms
3. Implementation of more sophisticated conversation state management
4. Expansion of the action framework to support more complex business processes

 The current implementation is a solid foundation, but there's significant potential for expanding its capabilities while maintaining the simplicity of the core design. The project is available on GitHub at [Utter Sense Project](https://github.com/valon-loshaj/utter-sense). Feel free to poke around the code and of course contributions are always welcome. The application can be deployed into an environment in the current state, so if you're curious and want to see manual data entry tasks get automated with the power of your voice, have at it! In subsequent posts, I'll dive deeper into specific components of this architecture, exploring the technical challenges encountered and their solutions.