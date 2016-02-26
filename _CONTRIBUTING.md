# Contributing

## General Workflow

1. Fork the repo
1. Cut a namespaced feature branch from the 'develop' branch
  - bug/...
  - feat/...
  - test/...
  - doc/...
  - refactor/...
1. Make commits to your feature branch. Prefix each commit like so:
  - (feat) Added a new feature
  - (fix) Fixed inconsistent tests [Fixes #0]
  - (refactor) ...
  - (cleanup) ...
  - (test) ...
  - (doc) ...
  - (style) ...
1. When you've finished with your fix or feature, Rebase upstream changes into your branch. Submit a [pull request][]
   directly to the 'develop' branch. Include a description of your changes.
1. Your pull request will be reviewed by another maintainer. The point of code
   reviews is to help keep the codebase clean and of high quality and, equally
   as important, to help you grow as a programmer. If your code reviewer
   requests you make a change you don't understand, ask them why.
1. Fix any issues raised by your code reviewer, and push your fixes as a single
   new commit.
1. Once the pull request has been reviewed, it will be merged by another member of the team. Do not merge your own commits.

## Detailed Workflow

### Fork the repo

Use github’s interface to make a fork (which will be the 'origin' of your local clone) of the 'develop branch' of our organization's repo, then add our organization's repo as an 'upstream' remote of your fork:

```
git remote add upstream https://github.com/INeedClosure/Freebees.git
```

### Cut a namespaced feature branch from master

Your branch should follow this naming convention:
  - bug/...
  - feat/...
  - test/...
  - doc/...
  - refactor/...

These commands will help you do this:

``` bash

# Simultaneously creates your branch and brings you there
git checkout -b `your-branch-name`
```

### Make commits to your feature branch.

Prefix each commit like so
  - (feat) Added a new feature
  - (fix) Fixed inconsistent tests [Fixes #0]
  - (refactor) ...
  - (cleanup) ...
  - (test) ...
  - (doc) ...

Make changes and commits on your branch, and make sure that you
only make changes that are relevant to this branch. If you find
yourself making unrelated changes, make a new branch for those
changes.

Commit every time you implement a working piece of your program. Try not to add code in 1 file and more code in another unrelated file before committing once.

#### Checking the State of Your Code
 1. `git status` will tell you if your changes are staged, unstaged, or in a clean state.
 1. `git branch -a` will tell you what branch you are currently on.

#### Commit Message Guidelines

- Commit messages should be written in the past tense; e.g. "Fixed continuous
  integration script".
- The first line of your commit message should be a brief summary of what the
  commit changes. Aim for about 70 characters max. Remember: this is a summary,
  not a detailed description of everything that changed.
- If you want to explain the commit in more depth, following the first line should
  be a blank line and then a more detailed description of the commit. This can be
  as detailed as you want, so dig into details here and keep the first line short.

### Rebase upstream changes into your branch

Once you are done making changes, you can begin the process of getting
your code merged into the main repo. Step 1 is to rebase upstream
changes to the 'develop' branch into yours by running this command
from your branch:

```bash
git pull --rebase upstream develop
```

This will start the rebase process. You must commit all of your changes
before doing this. If there are no conflicts, this should just roll all
of your changes back on top of the changes from upstream, leading to a
nice, clean, linear commit history.

If there are conflicting changes, git will notify you. Git will pause rebasing to allow you to sort
out the conflicts. You do this the same way you solve merge conflicts,
by checking all of the files git says have been changed in both histories
and picking the versions you want. Be aware that these changes will show
up in your pull request, so try and incorporate upstream changes as much
as possible.

You pick a file by `git add`ing it - you do not make commits during a
rebase.

Once you are done fixing conflicts for a specific commit, run:

```bash
git rebase --continue
```

This will continue the rebasing process. Once you are done fixing all
conflicts, add and run some tests to make sure you didn’t break
anything.

If rebasing broke anything, fix it, then repeat the above process until
you get here again and nothing is broken and all the tests pass.

### Make a pull request

After all merge conflicts have been resolved and the rebase has successfully completed, push your local branch to your github fork. Make a clear pull request from your fork and branch to the upstream master
branch, detailing exactly what changes you made and what feature this
should add. The clearer your pull request is the faster you can get
your changes incorporated into this repo.

At least one other person MUST give your changes a code review, and once
they are satisfied they will merge your changes into the upstream 'develop' branch. Alternatively,
they may have some requested changes in which case they will make comments within the pull request for you to address. You should make more commits to your
branch to fix the requested changes, then follow this process again from rebasing onwards.

Once you get back here, make a comment requesting further review and
someone will look at your code again. If they like it, it will get merged,
else, just repeat again.

Thanks for contributing!

### Code Review

A guide for reviewing code and having your code reviewed.

#### Everyone 

- Accept that many programming decisions are opinions. Discuss tradeoffs, which you prefer, and reach a resolution quickly.
- Ask questions; don't make demands. (E.g. "What do you think about putting the routing in its own file?")
- Ask for clarification. (E.g. "I didn't understand - could you please clarify?")
- Avoid selective ownership of code. (E.g. "mine," "not mine," or "yours")
- Avoid using terms that could be seen as referring to personal traits. (E.g. "dumb" or "stupid") Assume everyone is intelligent and well-meaning.
- Be explicit. Remember that people don't always understand your intentions online.
- Be humble. (E.g. "I'm not sure - let's look it up.")
- Don't use hyperbole. (E.g. "always," "never," "endlessly," or "nothing")
- Don't use sarcasm.
- Talk in person if there are many "I didn't understand" or "Alternative solution:" comments. Post a follow-up comment summarizing offline discussion.

#### Reviewing Code

- Communicate which ideas you feel strongly about and which you don't.
- Identify ways to simplify the code while still solving the problem.
- Offer alternative implementations, but assume the author already considered them. (E.g. "What do you think about using adding a link to the forager section here?")
- Seek to understand the author's perspective.

#### Having your code reviewed

- Be grateful for the reviewer's comments (E.g. "Good call. I'll make that change.")
- Don't take it personally. The review is of the code, not you.
- Explain why the code exists. (E.g. "It's like that because of these reasons. Would it be more clear if I rename this variable?")
- Seek to understand the reviewer's perespective.
- Try to respond to every comment.
- Wait for the Scrum Master to merge your pull request.

### Guidelines

1. Uphold the current code standard:
    - Keep your code [DRY][].
    - Apply the [boy scout rule][].
    - Follow [STYLE-GUIDE.md](_STYLE-GUIDE.md)
1. If there are any tests, run them before submitting a pull request.
1. Tests are very, very important. Submit tests if your pull request contains
   new, testable behavior.
1. Your pull request should be comprised of a single ([squashed][]) commit.

## Checklist:

This is just to help you organize your process

- [ ] Did I cut my work branch off of the 'develop' branch? (Don't cut new branches from existing feature brances)
- [ ] Did I follow the correct naming convention for my branch?
- [ ] Is my branch focused on a single main change?
 - [ ] Do all of my changes directly relate to this change?
- [ ] Did I rebase the upstream 'develop' branch after I finished all my
  work?
- [ ] Did I write a clear pull request message detailing what changes I made?
- [ ] Did I get a code review?
 - [ ] Did I make any requested changes from that code review?

If you follow all of these guidelines and make good changes, you should have
no problem getting your changes merged in.

### Resources
------------------

* [Getting confident with Git Part 1](https://github.com/mks-greenfield/planning/wiki/Getting-Confident-with-Git-Part-1)
* [Getting confident with Git Part 2: Managing History](https://github.com/mks-greenfield/planning/wiki/Getting-Confident-with-Git-Part-2:-Managing-History)
* [Getting confident with Git Part 3: Undoing](https://github.com/mks-greenfield/planning/wiki/Getting-Confident-with-Git-Part-3:-Undoing)

<!-- Linkss -->
[pull request]: https://help.github.com/articles/using-pull-requests/
[DRY]: http://en.wikipedia.org/wiki/Don%27t_repeat_yourself
[boy scout rule]: http://programmer.97things.oreilly.com/wiki/index.php/The_Boy_Scout_Rule
[squashed]: http://gitready.com/advanced/2009/02/10/squashing-commits-with-rebase.html
<!-- A link to your directory of tests on github -->
[tests]: tests/
