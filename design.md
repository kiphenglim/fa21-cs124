# Design Decisions
+ used links to html pages that resembled buttons to make transitioning
between pages easier.
+ used white, grey, and black for a minimalistic look
+ used san serif font for buttons and serif for other text
+ mark an item as completed by selecting the checkbox next
+ show all items at all times
  + don't let editing create a dialog box and hides other items

![Screenshot of Lab 1](lab1-images/design-decisions.png)

# Alternative Designs
+ no alternative designs

# User Testing
+ tested by Kip, going through tasks sequentially

# Final Design

![Task Flow](lab1-images/task-flow.png)

1. task 1: add item "Buy new John Grisham book"
+ To add item "Buy new John Grisham book", type in the desired task name in the text box next to "Add Item",
then select the Add Item button. After the Add Item button is pressed, the list will update to show the item.
![before](lab1-images/t1-begin.png)
![add](lab1-images/t1-add.png)
![after](lab1-images/t1-end.png)

2. task 2: add item "Eat lunch"
+ To add item "Eat lunch", type in the desired task name in the text box next to "Add Item",
then select the Add Item button. After the Add Item button is pressed, the list will update to show the item.
![before](lab1-images/t2-begin.png)
![add](lab1-images/t2-add.png)
![after](lab1-images/t2-end.png)

3. task 3: mark item "Call Mom" completed
+ To mark item "Call Mom" completed, the item first needs to be added. To add item, type in the desired task name in the text box next to "Add Item", then select the Add Item button. After the Add Item button is pressed, the list will update to show the item. Then, select the check box left of the item to mark the item
completed. The list will update to show the item with grey text and strikethrough.
![before](lab1-images/t2-begin.png)
![add](lab1-images/t2-add.png)
![after](lab1-images/t2-end.png)

4. task 4: add item "Text John" and edit to "Text John about bank statements"
5. task 5: show uncompleted tasks
6. task 6: delete completed tasks
7. index: contains list of tasks and links to respective pages



# Challenges
+ not understanding the specifications - how the tasks related to each other
  + attended office hours and received clarification about assignment
  + determined that task is to create a series of html pages that show
the specified tasks being executed
+ Chrome mobile view displays elements with abnormally small size, but
other browsers are unaffected

# Design Highlights
+ disguising links as buttons that link to the next page
+ allowed users to complete the tasks successfully and continuously,
without going back to index

# Timeline
+ 9 Sept
  + tried using a form with checkboxes and text inputs as labels
  + tried changing label color on checking box to resemble deletion
  + added button for creating new items (non-functional)
  + added css to modify text size and font

+ 13 Sept
  + attended office hours for clarification

+ 16 Sept
  + created html pages with lists and links to transition between them
decided order of tasks
  + used flexbox and gridbox to align elements
  + tested tasks and wrote design.md
