# [Hacktive](https://hashrocket-hacktive-staging.herokuapp.com) Design Spec
---

### General Remarks
* **Color Scheme**
  * Red (~`#B93030`) & White (~`#FDFDFD`)
  * You have final say in exact hex strings
* Should be flat design
* The focus should be the feed of developer activity cards
* Should be **responsive** and adapt nicely to mobile screens in landscape as well as portrait orientations.

### Logo
* Contains "Hacktive"
* Involves a creative, flat graphic
  * Somehow related to activity or software development
  * Cogs, brain, code symbols, computer, etc.
* Contains "A Hashrocket Project"

### Developer Card
> A card that shows a developer and his most recent Github activities. It is divided into two sections:
1. Top
    * Developer full name (links to user's Github account)
    * Developer's Github handle (links to user's Github account)
    * Developer's Github avatar
    * One line excerpt of the most recent activity (MRA)'s message/description
      * Most recent commit message for push event, message body of pull request, etc.
      * This links to the message's Github URL [example](https://github.com/hashrocket/hr-til/commit/be496330b99cd599657bb1a7f357c061c877060f)
    * Repository name of MRA. Links to repository.
    * Type-specific statistic for the MRA
      * **Push**: A pie chart that shows the percentage of total line changes for each language (35% Javascript, 50% ruby, etc)
        * Example [pie charts](https://bl.ocks.org/mbostock/3887235)
      * **Pull Request**: Number of stars that the repo has.
2. Bottom
    * Next three most recent Github activities. Each activity should show
    * Repository name
    * Activity type (Push, Pull Request, etc.)
      * One line excerpt of activity's message/description 
      
### Search Bar
> Standard search bar for search developers by name, github handle, repo name, repo language, etc.

### Extras
* Cool parallax CSS background that quasi-animates
as user scrolls down page
  * Like [ACR website](http://ancientcityruby.com)
