---
title: "Building utter-sense: A Week of RAG Pipeline Adventures in Salesforce"
date: "2024-01-10"
subtitle: "Exploring RAG pipelines & Salesforce's AI Capabilities to Build a Smart Call Center Assistant"
---

**This week I worked on building a RAG (Retrieval Augmented Generation) pipeline** that enhances call center operations. The system processes PDF-based knowledge articles to provide real-time response recommendations to agents during customer calls. By converting incoming audio to text transcripts, the system can automatically retrieve relevant information and generate suggested responses. While agents already have access to knowledge articles, this new application (which I'm calling "utter-sense") proactively surfaces relevant content and recommended responses. Call center agents can use, ignore, or provide feedback on these suggestions, enabling continuous model improvement.

**The utter-sense system architecture breaks down into three main components** that work together to deliver real-time response recommendations to call center agents.

**1. Data Pipeline:** The foundation starts with our knowledge base - a collection of PDF files containing Q&A content. These files go through a transformation process:

- First, they're ingested into Data Cloud as Unstructured Data Lake Objects (UDLOs)
- The UDLOs are then mapped to Unstructured Data Model Objects (UDMOs)
- A search index chunks these documents into semantically meaningful segments
- Finally, these chunks are converted into embeddings and stored in our vector database

**2. Client Application:** On the frontend, we're building a Lightning Web Component that integrates directly into the Salesforce interface. Here's what it does:

- Taps into the Service Cloud Voice Toolkit API to capture real-time call transcripts
- Processes these utterances to identify potential questions or topics
- Provides a clean interface for agents to view and interact with recommended responses
- Handles feedback collection to improve response quality over time

**3. API Layer:** The glue that holds it all together is a streamlined API layer that:

- Accepts incoming search queries based on processed utterances
- Performs vector similarity search against our knowledge base
- Uses a carefully crafted prompt template to generate contextual responses
- Returns formatted recommendations ready for agent consumption

What makes this architecture particularly neat is how it leverages Salesforce's native capabilities while introducing modern RAG concepts. Instead of building separate services for vector search and response generation, we're keeping it simple with a single API endpoint that handles both operations. This approach should make maintenance and debugging a lot more straightforward.

The beauty of this design is its simplicity - while there's a lot of complex processing happening under the hood, from the agent's perspective it's just a helpful assistant that surfaces relevant information exactly when they need it.

**Getting the vector store up and running was quite the journey**. Initially, I hit a wall with Salesforce's standard data ingestion - turns out they're pretty restrictive when it comes to handling unstructured data. My first instinct was to try converting PDFs to CSVs (classic developer move, right?), but that felt like forcing a square peg into a round hole.

Then I discovered Einstein Data Libraries (EDL), which was a game-changer. Here's how the EDL pipeline works:

1. **File Ingestion**
    - EDL accepts PDF uploads directly
    - Creates an "AI Grounding File Ref" data stream
    - Automatically handles file metadata extraction (path, size, name)
2. **Data Model Creation**
    - Generates a UDMO (Unstructured Data Model Object) called "AI Grounding File Ref"
    - Auto-maps all fields from the data stream
    - Handles the complex relationship between file metadata and content
3. **Search Index Configuration**
    - Creates a "File UDMO" search index automatically
    - Implements passage extraction for chunking
    - Uses the Multilingual E5 Large Embedding Model
    - Configures indexing fields based on content type

**The prompt engineering phase** turned out to be surprisingly straightforward. Salesforce's Prompt Builder playground provided an intuitive environment for rapid iteration - a welcome relief after the complexity of setting up the vector store. The workflow felt natural: write, test, refine, repeat.

The system handles all the heavy lifting - at runtime, it executes the vector search, retrieves relevant chunks, and seamlessly injects them into the prompt template. This approach not only simplified the code but also made it easier to maintain and iterate on the prompt structure as requirements evolved.

The real magic happened when integrating the vector search results. Instead of complex data pipelines, Salesforce simplified it down to what essentially feels like template merge fields.

While the implementation is working, there are some important questions that I feel are still left unanswered based on what's available through Data Cloud currently:

1. **Data Ingestion Scalability**
    - How do we handle continuous updates to knowledge articles?
    - What's the best way to manage document versions?
2. **Performance Optimization**
    - Current average response time: ~3000ms which isn't horrible, but may feel slow in the real world when call center agents are actually interacting with this agent
    - Chunking strategy optimization needed for better retrieval: Is passage based chunking the best approach? I couldn't find a way to modify this chunking strategy within Data Cloud
    - Potential for response caching
3. **Enterprise Integration Challenges**
    - Need a strategy for handling distributed knowledge bases
    - Question of how to handle cross-org data sharing

One of the most interesting challenges I'm still working through is the question of centralized knowledge management. Most enterprises have their documentation scattered across SharePoint, Confluence, internal wikis, and various other systems. Creating a unified ingestion pipeline that can handle this diversity while maintaining consistent vector representations is going to be crucial for broader adoption.

**While finalizing the client implementation** for the MVP, I opted for a streamlined approach to the client-side implementation. Rather than creating separate endpoints for search and response generation, I consolidated everything into a single Salesforce API. This API handles both the knowledge article search and LLM response generation, simplifying the architecture significantly. The integration was made even smoother thanks to Salesforce's Models API, which can be accessed directly through Apex. This approach not only reduces complexity but also makes the system more maintainable and easier to debug.

**Reflecting back on the journey** of this week's progress, I'm genuinely impressed by how Salesforce has democratized RAG implementation. What would have been a complex, multi-month project just a year or two ago can now be accomplished through a series of configurable steps. The platform has abstracted away much of the complexity, making advanced AI capabilities accessible to developers who might not have deep machine learning expertise. It's remarkable to think that developers can now take a PDF document, and through the combination of Einstein Data Libraries, prompt templates, and AgentForce, create an interactive AI system that can intelligently discuss its contents.

**Looking at the bigger picture,** while Salesforce has made significant strides in rolling out their Generative AI services, their position in the broader AI landscape raises interesting questions. On one hand, they've successfully integrated AI capabilities that are now considered table stakes, putting them in the conversation with tech giants like Google, Microsoft, Amazon, Meta, and Netflix. On the other hand, many of these capabilities have been available from other providers for some time now, which suggests Salesforce might be playing catch-up rather than leading the innovation charge.

However, what Salesforce might lack in being first-to-market, they make up for in enterprise integration and ease of use. Their approach of making complex AI implementations accessible through their familiar platform could prove to be a winning strategy, especially for organizations already invested in their ecosystem.

**Looking ahead to 2025**, I'm excited about the potential for generative AI to break through in non-tech sectors. As these tools become more integrated into enterprise platforms like Salesforce, we're likely to see innovative applications that deliver tangible ROI across industries. The real breakthrough won't just be in the technology itself, but in how it's applied to solve real-world business problems in practical, measurable ways.