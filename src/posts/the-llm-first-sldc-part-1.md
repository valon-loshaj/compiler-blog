---
title: "The LLM First SDLC - Part 1: A New Approach to Problem Identification"
date: "2024-01-17"
subtitle: "Rethinking how we find, analyze and prioritize problems to solve."
---

**It's funny how stepping back from a bug sometimes leads to bigger realizations**. This week I spent a good amount of time thinking about how generative AI is fundamentally changing the software development lifecycle. It wasn't just theoretical pondering - I kept coming back to this while working through some coding challenges. I also eventually squashed the bug...spoiler alert, it was the cache that did me in!. But back to the SDLC.

I was listening to an episode of [The Changelog Podcast](https://changelog.com/) and they were going over the results of a developer survey. There was a stat that came out of the survey's respondents - something like 75% of developers are now using generative AI in their daily workflow. That's huge. But here's what's been nagging at me: are we really making the most of these tools? Right now it feels like we're just sprinkling generative AI on top of our existing processes - like adding sprinkles to vanilla ice cream and calling it a day.

What if we took a step back and approached this differently? Instead of treating LLMs as just another tool in our toolkit, what if we made them first-class citizens in our software development process end to end? In this post, I'm been particularly interested in how this might reshape one of the most critical parts of the software development lifecycle - identifying the actual problem we're trying to solve.

Let me walk you through a real-world example to show what I mean. Picture a large retail company's contact center where agents are struggling to access customer order history during calls...

**When identifying problems in software development, there's a set of questions that we typically need to answer**, and they're usually more complex than they first appear. In our contact center example, what seems like a simple request - "Hey, can we make the order history more accessible?" - actually opens up a whole cascade of questions that need answering.

Here's what I typically look for when trying to understand a problem:
- What problem am I actually solving? (Sometimes what's being asked for isn't what's actually needed)
- Is this a real problem or just a perceived one? 
- What's the root cause, and who's actually reporting it?
- How will I know when I've actually solved it? Are there metrics I can track?
- What constraints am I working with?
- What's the opportunity cost of solving this versus other problems?
- How does this align with our broader organizational goals?

In the traditional approach, answering these questions usually involves a lot of meetings, emails, document diving, and probably a fair amount of Slack messages. I've sat through countless requirements gathering sessions where we spend hours trying to piece together the full picture, often realizing halfway through that we're missing critical context or key stakeholders..

And here's the kicker - even after all that effort, we sometimes still miss important details. I can't count the number of times I've been knee-deep in coding a solution, only to discover some crucial piece of information that would have completely changed our approach if we'd known about it earlier.

This is where I think we can fundamentally change how we approach problem identification by leveraging LLMs in a more integrated way. But before we dive into that, let's break down these questions a bit more systematically.

**So what does it look like when we treat an LLM as a first-class citizen in our problem identification process?** Let's break this down using our contact center example.

**Finding the Right APIs**
First up - is the order data we need even accessible, or do we need to build new APIs? In the traditional approach, this would involve digging through API documentation (if we can find it) or tracking down the right team to ask (if they have the bandwidth to answer your pings). But with an LLM-first approach, if our organization has their API inventory well documented, the LLM can quickly parse through this documentation and identify potential APIs that either meet our needs or come close. Think of it as having a really smart technical architect who has memorized every API in your organization and knows their purpose.

**Understanding the Scope of the Problem**
Instead of manually sifting through JIRA tickets or ServiceNow incidents, we can feed this data to our LLM assistant. Combined with vector search, it can analyze patterns across incidents, summarize the actual impact, and help us understand if this is a widespread issue or just a vocal minority. I've found this particularly helpful because it often surfaces patterns that might not be obvious when you're looking at tickets one by one.

**Identifying Technical Constraints**
Anyone who's worked in a large codebase knows there's usually a graveyard of technical decisions that impact what we can and can't do. These decisions are (hopefully) documented somewhere - architecture decision records, wiki pages, old pull requests. An LLM can process all of this documentation and quickly identify the constraints we need to work within. This alone can save me from going down several rabbit holes that would have ended in "oh, we can't do that because of X decision made two years ago."

**Cost and Impact Analysis**
Here's where it gets interesting. By analyzing similar features that have been built before, the LLM can help estimate the effort required to build a similar feature. This can help more accurately answer the question "well how long will this take and how many resources will be needed?" On a similar thread, we can analyze any features that are also on the roadmap which would be impacted if the team chooses to focus on this feature instead. Sorry Sally, looks like your confetti feature might have to wait - but at least we can clearly show why! The LLM can provide a comprehensive view of the trade-offs we're making, helping inform those always-fun prioritization discussions.

**Strategic Alignment Check**
Company goals and priorities change faster than we update our documentation. By feeding our LLM assistant the latest company priorities, board meeting minutes, and strategic initiatives, it can help evaluate how well our proposed solution aligns with current organizational direction. This beats trying to map everything back to year-old OKRs that might not even be relevant anymore.

What I'm finding most interesting about this approach is how it changes the dynamics of problem identification. Instead of spending days or weeks gathering information, we can quickly get a comprehensive view of the problem space. But - and this is important - the LLM isn't making decisions for us. It's more like having a really thorough research assistant who can quickly pull together all the relevant information we need to make informed decisions.

The key difference is that we're not just using the LLM to help answer our questions - we're fundamentally changing how we approach the entire process of problem identification with the LLM's capabilities in mind from the start.

**One of the most common failures I've seen in software development projects** is rushing to write code before properly understanding the problem. It's tempting, right? The keyboard is right there, the IDE is open, your calendar is blocked with focus time for the next 3 hours, and we think we know exactly what needs to be built. But what I've learned over the years is that if you're going to make assumptions, assume the problem is more complex than you think and that you don't have all the context needed to properly tackle it.

This might sound pessimistic, but I've found it actually keeps my mind in a state of discovery and curiosity. The moment my inside voice says "well that's all there is to know about this feature" things tend to go downhill pretty quickly. Sure, "curiosity killed the cat" might apply to our feline friends, but in software engineering, curiosity is what keeps us from walking straight into that proverbial mac truck.

**Efficiency Gains**
Taking an LLM-first approach to problem identification isn't just about doing things faster (though that's definitely a nice bonus). It's about being more thorough in our discovery process. The LLM can process and analyze vast amounts of documentation, tickets, and historical data that we might otherwise skip due to time constraints. This means we're making decisions based on a more complete picture, rather than just the parts we had time to look at.

**Better Decision Making**
When we integrate LLMs as first-class citizens in our problem identification process, we're not just getting faster answers - we're getting more informed ones. The LLM can surface patterns and connections that might not be obvious when we're looking at information piecemeal. This helps us avoid the "oh, if we'd only known about X" moments that often pop up mid-development.

**Risk Mitigation**
By having a more comprehensive view of the problem space early on, we can identify potential risks and constraints before we've invested significant time in a particular solution. This isn't about being risk-averse - it's about being risk-aware. The LLM can help flag similar projects that ran into issues, technical constraints that might impact our approach, or dependencies we need to consider.

The real power here isn't just in what the LLM can do - it's in how it changes our approach to problem identification. Instead of treating problem identification as a phase we need to get through to start coding, it becomes a more thorough, data-driven process that sets us up for success in the actual development phase.

And here's the interesting part - while this approach might seem like it would slow things down initially, I'm finding it actually speeds up the overall development process. When you have a clearer understanding of the problem space from the start, you make better technical decisions and avoid those costly mid-project pivots; the old "slow down to go fast" approach.

**So what's the takeaway from all of this?** I strongly believe that integrating generative AI into the problem identification phase of the SDLC isn't just about having a smarter assistant - it's about fundamentally changing how we approach the discovery process. By treating the LLM as a first-class citizen rather than just a bolt-on tool, we unlock efficiencies and insights that weren't possible before.

This post focused on just the problem identification phase of the SDLC, but I'm excited to explore how this LLM-first approach could reshape other parts of the software development lifecycle. Each area of the SDLC presents its own unique opportunities and challenges when we start thinking about treating LLMs as first-class citizens in the process. I'll be diving into these in future posts as I continue experimenting with this approach.

One thing's becoming clear though - the traditional software development lifecycle is evolving, and those sprinkles on vanilla ice cream might just be the beginning of a much more interesting dessert menu!