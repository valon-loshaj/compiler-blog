---
title: "The Art of Shipping Software Projects"
date: "2024-01-06"
subtitle: "A guide to shipping software projects effectively"
---
## Introduction

One of the most important indicators of success in software development is whether the built solution operates stably in production. Therefore, successfully 'shipping' a project is crucial to achieving success. However, the natural tendency for software projects is to resist shipping - it's more common for projects to be shipped to production kicking and screaming than to be shipped smoothly.

Why is this, and what aspects of software development make this so? This, and much more was discussed on an episode of the Pragmatic Engineer podcast which I listened to recently. As I was listening to the interview between Gergely Orosz and Sean Goedecke, I found myself nodding along in agreement with much of what was being discussed. This brought to the forefront of my mind so many experiences that I wanted to put on paper, which is how this blog post came to be.

I highly recommend Sean's blog post "How I Ship Projects at Big Tech Companies". Additionally, Gergely's newsletter and podcast, "The Pragmatic Engineer", has become the tech content I most look forward to reading during the week. Now, let's dive into shipping this blog post.
## The Critical Role of the Tech Lead

The biggest point that resonated with me from Sean's blog post was regarding the tech lead or directly responsible individual (DRI) role, specifically the criticality of this individual on a project. While a project's success isn't solely due to this individual's efforts, it's very likely the project wouldn't ship without them.

Who is this individual? They're someone who has both breadth and depth of knowledge on the project. They understand how all the inner workings of the project function together to create the overall solution. On many projects I've worked on, this individual has been me. I can't say I consciously strive for this role, but I consider myself hyper-curious, always wanting to know how things work. Even on projects where I'm not formally the tech lead or DRI, I somehow find myself playing that role. On every project in my career, I've ended up being "the project encyclopedia," knowing everything about the technical functionality. I find myself being the individual that "gets the project over the finish line." The one thing I enjoy almost as much as building software is seeing it deployed into the wild and having users interact with it.
## What is Shipping?

It's important to define what qualifies as shipping software. In my view, shipping software involves taking a solution from ideation through design, development, testing, release, and maintenance. When that solution is functioning in production as expected and, most importantly, is stable, it's shipped.

However, Sean brings up a crucial point: something is not shipped unless the leadership team wanting that solution in production considers it shipped. I'll refer to these individuals as stakeholders in this blog post - they could be anyone from the business, a staff-level engineer, a CTO, and beyond. Unless that person or group acknowledges the solution as shipped, it's not shipped. This is a critical distinction because whatever checklist you've created to establish something as shipped becomes irrelevant if the key stakeholders don't acknowledge it as such.

Looking back on numerous releases throughout my career, I always appreciated the positive reinforcement from leadership after a project goes live, or the words of gratitude from my manager after a big project crosses the finish line. But I never viewed that as the definitive measure of whether a project was live. After hearing Sean's perspective, I have a whole new outlook on those experiences.
## Building and Maintaining Trust

Working with stakeholders is crucial to any project's success. Understanding their goals and maintaining consistent communication is critical throughout the software development lifecycle. While establishing a good working relationship with stakeholders is important, earning their trust is paramount.

Reflecting on previous projects, most stakeholders had limited technical knowledge but clear visions of what they wanted built and their goals. They relied heavily on me as their guide through the technical complexities. Their confidence mirrored my own: if I showed concern, they worried; if I expressed confidence about delivery timelines, they felt assured; when they raised potential edge cases and I demonstrated I'd already planned for them, their trust grew.

Sean highlights several effective ways to maintain leadership trust:

- Build a track record of successful shipping
- Project confidence (your worry becomes their worry)
- Demonstrate competence (aim for a NASA mission control vibe)
- Communicate professionally and proactively through regular updates
## Ship Early, Often, and Confidently

The frequency of shipping to production directly correlates with stakeholder confidence. Early feature sharing with stakeholders is equally crucial - waiting until a feature is complete before showing it is risky. More often than not, stakeholders' mental image differs from the engineering team's understanding.

In my projects, I prefer showing features to stakeholders even with some edge cases uncovered and UI/UX elements unpolished. This approach provides invaluable feedback and allows for quick course correction if needed. Moreover, it helps stakeholders familiarize themselves with the solution well before UAT testing.

Transparency builds trust. Even if stakeholders don't understand technical details like caching issues causing slower load times, showing them the application in action - slow loading due to the missing cache and all - demonstrates tangible progress. Avoiding any appearance of hiding information is crucial to maintaining trust.

Regular production deployments are vital. Consider this scenario: you're leading a project where stakeholders haven't deployed to production in over 12 months. Their deployment process knowledge has faded, and their confidence is practically non-existent. It's like basketball - if you haven't played in years, your skills deteriorate. But with regular practice, you regain competence. Shipping to production is similar - it's a muscle that needs regular exercise.

I once worked on a project with only two releases in the previous year. One release went so poorly that a stakeholder suggested never touching that build again and starting fresh for new requirements. After six months of my involvement, we achieved bi-weekly releases. We started small with monthly deployments, familiarizing stakeholders with processes and procedures. After seeing several successful bugfix deployments, their anxiety noticeably decreased. By the end of my tenure, they were considering weekly and ad-hoc releases - a testament to the power of trust and confidence.
## Conclusion

Sean captures it perfectly: "The default state of a project is to _not ship_: to be delayed indefinitely, cancelled, or to go out half-baked and burst into flames." My key takeaways from Sean's insights and my own experiences are that while shipping software will always be challenging, having a tech lead with comprehensive project knowledge provides a solid foundation for success. Combined with strong stakeholder trust, this foundation enables teams to successfully ship projects to production and into users' hands.