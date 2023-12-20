import type { MarkdownHeading, MDXInstance, Page } from 'astro';

type Theme = 'light' | 'dark';

interface IElement {
  readonly as?: keyof HTMLElementTagNameMap;
}

type SiteMeta = {
  title: string;
  description?: string;
  image?: string;
};

type PaginationLink = {
  url: string;
  text?: string;
  srLabel?: string;
};

interface Post {
  title: string;
  description: string;
  publishDate?: Date;
  tags?: string[];
}

export type { MDXInstance, Page, Theme, IElement, SiteMeta, PaginationLink, Post };

export interface GhostPost {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string;
  comment_id: string;
  feature_image: string;
  featured: boolean;
  visibility: string;
  created_at: Date;
  updated_at: Date;
  published_at: Date;
  custom_excerpt: null;
  codeinjection_head: null;
  codeinjection_foot: null;
  custom_template: null;
  canonical_url: null;
  tags: Tag[];
  authors: Author[];
  primary_author: Author;
  primary_tag: Tag | null;
  url: string;
  excerpt: string;
  reading_time: number;
  access: boolean;
  comments: boolean;
  og_image: null;
  og_title: null;
  og_description: null;
  twitter_image: null;
  twitter_title: null;
  twitter_description: null;
  meta_title: null;
  meta_description: null;
  email_subject: null;
  frontmatter: null;
  feature_image_alt: null;
  feature_image_caption: null;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  profile_image: string;
  cover_image: null;
  bio: null;
  website: null;
  location: null;
  facebook: null;
  twitter: null;
  meta_title: null;
  meta_description: null;
  url: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  description: null;
  feature_image: null;
  visibility: string;
  meta_title: null;
  meta_description: null;
  og_image: null;
  og_title: null;
  og_description: null;
  twitter_image: null;
  twitter_title: null;
  twitter_description: null;
  codeinjection_head: null;
  codeinjection_foot: null;
  canonical_url: null;
  accent_color: null;
  url: string;
}

export interface SimplePost {
  title: string;
  description: string;
  url: string;
  publishDate: Date;
  slug?: string | undefined;
  tags?: string[];
  headings?: MarkdownHeading[];
}

export interface PostV2 {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string;
  comment_id: string;
  feature_image: string;
  featured: true;
  visibility: string;
  created_at: Date;
  updated_at: Date;
  published_at: Date;
  custom_excerpt: string;
  codeinjection_head: string;
  codeinjection_foot: null;
  custom_template: null;
  canonical_url: null;
  url: string;
  excerpt: string;
  reading_time: 7;
  access: true;
  comments: false;
  og_image: null;
  og_title: null;
  og_description: null;
  twitter_image: string;
  twitter_title: null;
  twitter_description: null;
  meta_title: null;
  meta_description: null;
  email_subject: null;
  frontmatter: null;
  feature_image_alt: null;
  feature_image_caption: string;
}

export const mockPost: PostV2 = {
  id: '65829bcd54d36600010ef26f',
  uuid: '5fdd4dac-9e04-4a65-accc-01c2a0e298c0',
  title: '3 reasons why nobody wants to review your pull requests',
  slug: '3-reasons-why-nobody-wants-to-review-your-pull-requests-2',
  html: '<p>I have accumulated over 11 years of experience working as a Software Engineer. Throughout my career, I have had the opportunity to work in various companies located in both Asia and Europe. One aspect of my job that has consistently posed challenges is the review of pull requests. From my very first job, I quickly realized that reviewing pull requests can be a daunting and time-consuming task. It requires not only making proper pull requests, but also meticulously examining and providing feedback on the pull requests submitted by my colleagues. Despite its inherent difficulties, I have come to appreciate the importance of thorough pull request reviews in maintaining code quality and fostering collaboration within a development team.</p><div class="kg-card kg-callout-card kg-callout-card-blue"><div class="kg-callout-emoji">💡</div><div class="kg-callout-text"> Why do you think the “in review” column of issues in boards is almost always the longest?</div></div><p>One of the main challenges that arises in the software development process is the difficulty of conducting effective PR reviews. These reviews, while essential for ensuring code quality and collaboration, can often be perceived as tedious and unengaging by fellow developers who are also working on the same project. It is important to find ways to make the PR review process more stimulating and interactive, in order to maintain the interest and involvement of all team members throughout the development cycle.</p><p>Let’s explore together <strong>three</strong> big mistakes that will make your PR stay a long time in an idle state.</p><figure class="kg-card kg-image-card"><img src="https://www.gaetanbloch.org/content/images/2023/12/The-Art-of-making-Pull-Requests-1.png" class="kg-image" alt loading="lazy" width="2000" height="1000" srcset="https://www.gaetanbloch.org/content/images/size/w600/2023/12/The-Art-of-making-Pull-Requests-1.png 600w, https://www.gaetanbloch.org/content/images/size/w1000/2023/12/The-Art-of-making-Pull-Requests-1.png 1000w, https://www.gaetanbloch.org/content/images/size/w1600/2023/12/The-Art-of-making-Pull-Requests-1.png 1600w, https://www.gaetanbloch.org/content/images/size/w2400/2023/12/The-Art-of-making-Pull-Requests-1.png 2400w" sizes="(min-width: 720px) 720px"></figure><h1 id="1-enormous-diffs">1. Enormous diffs</h1><p>There is nothing less appealing for a reviewer than a pull request (PR) with a difference of several thousand lines of code (LOC) across multiple files. It can be quite overwhelming for the reviewer to go through such a large diff, and it may deter them from conducting a thorough review of the feature.</p><p>Who wants to spend their time reviewing a diff that spans a thousand lines of code? When the diff is too long, it becomes more likely that other developers will simply leave a quick “LGTM” (Looks Good To Me) comment without taking the time to carefully review the changes. This can result in missed opportunities for identifying potential issues or improvements in the code.</p><p>It is important to ensure that pull requests are manageable in size, making it easier for reviewers to provide meaningful feedback. By keeping the changes concise and focused, it encourages reviewers to engage in a more detailed and comprehensive review process, which ultimately leads to higher code quality and better collaboration within the development team.</p><figure class="kg-card kg-embed-card kg-card-hascaption"><div><blockquote class="twitter-tweet"><p lang="en" dir="ltr">Pull requests:<br><br>- 3 files have changed<br>&gt; 25 comments in conversation<br><br>- 40 files have changed<br>&gt; LGTM!</p>— I Am Devloper (@iamdevloper) <a href="https://twitter.com/iamdevloper/status/851445899008106496?ref_src=twsrc%5Etfw&ref=gaetanbloch.org">April 10, 2017</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></div><figcaption><p><a href="https://twitter.com/iamdevloper/status/851445899008106496?s=20&t=Q-EdsFPVvh9t2MWtCt0EAQ&ref=gaetanbloch.org"><span style="white-space: pre-wrap;">LGTM (Looks Good To Me) ❤️</span></a></p></figcaption></figure><p>The larger the difference in code changes, the more likely the pull request (PR) will have bugs, be time-consuming to review, and potentially cause delays. A big PR demands significant attention and may even require additional testing from the reviewer(s).</p><p>On the other hand, if the code changes are kept smaller and more focused, the pull request will be easier to review and less likely to introduce bugs or delays. By breaking down the changes into smaller, manageable chunks, the reviewer can provide a more thorough and efficient review process. This approach also allows for better collaboration and reduces the risk of conflicts or misunderstandings.</p><p>Therefore, it is highly recommended to aim for smaller and more focused pull requests. This will not only expedite the review process but also ensure a higher quality of code and a smoother workflow for everyone involved.</p><figure class="kg-card kg-image-card kg-card-hascaption"><img src="https://www.gaetanbloch.org/content/images/2023/12/graph-loc.png" class="kg-image" alt loading="lazy" width="667" height="400" srcset="https://www.gaetanbloch.org/content/images/size/w600/2023/12/graph-loc.png 600w, https://www.gaetanbloch.org/content/images/2023/12/graph-loc.png 667w"><figcaption><a href="https://www.linkedin.com/pulse/size-pullmerge-request-more-important-than-you-think-rodrigo-miguel/?ref=gaetanbloch.org"><span style="white-space: pre-wrap;">Graph from Rodrigo Miguel</span></a></figcaption></figure><blockquote><em>“We can view the transaction cost as the cost of sending a batch to the next process and the holding cost as the cost of not sending it.” -</em> <a href="http://reinertsenassociates.com/about/?ref=gaetanbloch.org">Don Reinertsen</a></blockquote><p>In the figure above, it is clear that the optimal PR size is around 450 LOC. Considering various studies and my own perspective, I strongly believe that in order to ensure timely code reviews of 1 hour or less, it is highly recommended to keep the PR size below <strong>400 LOC</strong>. However, it\'s important to note that this suggested number should not be treated as a strict rule, as there may be cases where refactoring or boilerplate PRs could extend up to this limit without being overly complex or convoluted.</p><h1 id="2-generic-title-and-bad-description">2. Generic title and bad description</h1><p>The title of a pull request plays a vital role in effectively communicating its purpose. It is significant to ensure that the title is not only clear and concise, but also provides enough context to understand the intention behind the pull request. By including relevant information in the title, such as a reference to the related issue in your project management software, you can provide additional clarity to the reviewers. This will help them better understand the changes being proposed and expedite the review process. Remember, a well-crafted pull request title sets the stage for a productive collaboration and ensures that everyone involved is on the same page.</p><p>For example, a simple and efficient PR title:</p><div class="kg-card kg-callout-card kg-callout-card-blue"><div class="kg-callout-emoji">✅</div><div class="kg-callout-text">Fix: Clean config file location cache only when needed #5007</div></div><p>An example of a bad commit title would be:</p><div class="kg-card kg-callout-card kg-callout-card-blue"><div class="kg-callout-emoji">❌</div><div class="kg-callout-text">Update code</div></div><p>A vague and generic commit title like this does not provide any useful information about the changes made in the commit.</p><p>The description of the PR should also provide further information on the changes and the different commits linked. It should describe <strong>what</strong> changed and <strong>why,</strong> but <strong>not how.</strong></p><div class="kg-card kg-callout-card kg-callout-card-blue"><div class="kg-callout-emoji">💡</div><div class="kg-callout-text">On <b><strong style="white-space: pre-wrap;">Github</strong></b>, you can create a file named <b><strong>pull_request_template.md</strong></b> so that any new PR created will use this template. <a href="https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository?ref=gaetanbloch.org">See Github documentation</a></div></div><p>A template of a detailed PR description could be like this:</p><pre><code class="language-markdown">## Description\n&lt;!--- The WHAT --&gt;\n&lt;!--- Describe your changes in details --&gt;\n\n## Motivation and Context\n&lt;!--- The WHY --&gt;\n&lt;!--- Why is this change required? What problem does it solve? --&gt;\n\n## Related Issues\n&lt;!--- List of related issues --&gt;\n\n## How Has This Been Tested?\n&lt;!--- Please describe in detail how you tested your changes. --&gt;\n&lt;!--- Include details of your testing environment, and the tests you ran to --&gt;\n&lt;!--- see how your change affects other areas of the code, etc. --&gt;\n\n## Screenshots (if appropriate):\n</code></pre><h3 id="benefits-of-having-good-pull-request-titles-and-descriptions">Benefits of Having Good Pull Request Titles and Descriptions</h3><p>Having clear and informative pull request titles and descriptions brings several benefits to the development process:</p><ol><li><strong>Improved Understanding:</strong> A well-crafted title provides context and sets expectations for reviewers, helping them understand the purpose and scope of the pull request. A comprehensive description further clarifies the changes made and the motivation behind them, ensuring that everyone involved is on the same page.</li><li><strong>Efficient Review Process:</strong> When reviewers can quickly grasp the essence of a pull request from its title and description, they can focus their attention on providing meaningful feedback and identifying potential issues. This streamlines the review process, saving time for both the reviewer and the pull request author.</li><li><strong>Effective Collaboration:</strong> Clear titles and descriptions foster effective collaboration within the development team. By providing relevant information and linking related issues, the pull request becomes a centralized source of knowledge, enabling better communication and coordination among team members.</li><li><strong>Reduced Misunderstandings:</strong> With well-defined titles and descriptions, there is less room for misunderstandings and confusion. Reviewers can better understand the changes being proposed and provide more accurate feedback. This reduces the likelihood of misinterpretation and ensures that the pull request aligns with the project\'s goals and standards.</li><li><strong>Maintained Code Quality:</strong> A pull request with a clear title and description encourages thorough reviews and attention to detail. Reviewers can dive into the code changes more confidently, identifying potential bugs, suggesting improvements, and maintaining the overall code quality.</li></ol><p>In summary, investing time and effort in creating good pull request titles and descriptions pays off by facilitating smoother and more efficient collaboration, improving code quality, and fostering a positive development environment.</p><h1 id="3-multiple-purposes">3. Multiple purposes</h1><p>I’m sure you have encountered a situation where you came across a piece of code that required fixing or an algorithm that needed improvement. In such instances, you might have thought to yourself:</p><blockquote>Oh! I’ll simply rectify it and submit a pull request with the necessary changes.</blockquote><p><strong>Well, you’re wrong!</strong></p><p>When creating a pull request (PR), it is important to ensure that each PR focuses on a single purpose and responsibility. It is crucial to avoid including any unrelated code modifications in the PR, regardless of whether they are in a separate commit or not. If there are multiple changes that need to be addressed, it is recommended to divide the PR into multiple ones, each addressing a specific change. By following this approach, it allows for better clarity and organization in the PR process, making it easier for reviewers to understand and provide feedback on the changes made.</p><p>When creating a pull request, it is crucial to ensure that each PR focuses on a single purpose and responsibility. Including unrelated code modifications in a PR, even if they are in separate commits, can lead to confusion and inefficiency in the review process. By dividing the PR into multiple ones, each addressing a specific change, it allows for better clarity and organization. This approach makes it easier for reviewers to understand and provide feedback on the changes made, leading to a smoother and more effective review process. Additionally, separating changes into distinct PRs helps maintain code quality, reduces the risk of introducing bugs or conflicts, and promotes better collaboration within the development team.</p><h1 id="a-few-more-tips">A few more tips</h1><ul><li>Before submitting your PR, make sure to rebase the latest version of the main branch onto your PR branch.</li><li>If your PR is not yet ready to be reviewed, you can use the keywords [WIP] or [DRAFT] in the title.</li><li>If there is something important to notify the reviewer(s), you can add inline comments.</li><li>Apply your code formatting standard to your changes.</li><li>Use a semantic-based commit message format, such as the one used by <a href="https://github.com/angular/angular/blob/main/CONTRIBUTING.md?ref=gaetanbloch.org#-commit-message-format">Angular</a>.</li><li>For front-end related PRs, including a screenshot can be more helpful than explaining with many lines of text.</li></ul><h1 id="wrapping-up">Wrapping up</h1><p>Let\'s expand on the 3 main rules for your "ideal" pull request:</p><ol><li>Keep it reasonably small and comprehensive. It\'s important to ensure that your pull request is of a manageable size and covers all the necessary aspects. By keeping it concise yet thorough, you\'ll make it easier for reviewers to understand and provide feedback.</li><li>Provide an explanatory title and a helpful description. When creating a pull request, it\'s crucial to give it a clear and descriptive title that summarizes the purpose of the changes. Additionally, a well-written description can provide context, explain any challenges faced, and highlight the benefits of the proposed changes.</li><li>Focus on one and only one subject, whether it\'s a feature, a bug fix, a refactoring, documentation, or any other specific area. By honing in on a single subject, you can ensure that your pull request remains focused and targeted. This allows for better collaboration and makes it easier to track and review the changes made.</li></ol><p>Remember, following these guidelines will not only improve the quality of your pull requests but also streamline the reviewing process and increase the chances of your changes being merged smoothly.</p>',
  comment_id: '65829bcd54d36600010ef26f',
  feature_image:
    'https://images.unsplash.com/photo-1556075798-4825dfaaf498?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDIxfHxjb2RlfGVufDB8fHx8MTcwMzA1ODQyMXww&ixlib=rb-4.0.3&q=80&w=2000',
  featured: true,
  visibility: 'public',
  created_at: new Date('2023-12-20T07:46:21.000+00:00'),
  updated_at: new Date('2023-12-20T08:36:45.000+00:00'),
  published_at: new Date('2023-12-20T07:58:57.000+00:00'),
  custom_excerpt:
    'One challenge in software development is effective pull request (PR) reviews. Large code diffs, unclear titles/descriptions, and multiple purposes hinder reviews. Guidelines for better PRs: concise diffs, clear titles/descriptions, and focused purposes.',
  codeinjection_head: '["programming", "GitHub", "Pull Requests"]',
  codeinjection_foot: null,
  custom_template: null,
  canonical_url: null,
  url: 'https://www.gaetanbloch.org/3-reasons-why-nobody-wants-to-review-your-pull-requests-2/',
  excerpt:
    'One challenge in software development is effective pull request (PR) reviews. Large code diffs, unclear titles/descriptions, and multiple purposes hinder reviews. Guidelines for better PRs: concise diffs, clear titles/descriptions, and focused purposes.',
  reading_time: 7,
  access: true,
  comments: false,
  og_image: null,
  og_title: null,
  og_description: null,
  twitter_image:
    'https://www.gaetanbloch.org/content/images/2023/12/The-Art-of-making-Pull-Requests-2.png',
  twitter_title: null,
  twitter_description: null,
  meta_title: null,
  meta_description: null,
  email_subject: null,
  frontmatter: null,
  feature_image_alt: null,
  feature_image_caption:
    '<span style="white-space: pre-wrap;">Photo by </span><a href="https://unsplash.com/@yancymin?utm_source=ghost&amp;utm_medium=referral&amp;utm_campaign=api-credit"><span style="white-space: pre-wrap;">Yancy Min</span></a><span style="white-space: pre-wrap;"> / </span><a href="https://unsplash.com/?utm_source=ghost&amp;utm_medium=referral&amp;utm_campaign=api-credit"><span style="white-space: pre-wrap;">Unsplash</span></a>',
};
