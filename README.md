<h1>All-In: A portfolio website using JavaScript, HTML, CSS, and Bootstrap</h1>

This website is to showcase and explain smaller personal projects. At the moment, two projects (an art and database application) are available to test. 
The editor used was Visual Studio Code where you can directly view the website, however, to test the database application, you need to be run docker and go to on http://localhost:7272/index.html using the command 'docker compose up -d'.

<h2>Aspects</h2>
<i>(Due to the GIF format, there is slight discoloration, flickering, and jittery motions that are not present in the actual project)</i> <br> <br>
<h3>Art Application</h3>
1. Interactive demonstration of the art application using an i-frame. The window can expand and shrink without unwanted bugs on your drawings. The current features are: erasing lines, drawing strokes, undo/redoing
strokes, a reference button to upload multiple images as mini windows (each being able to zoom in, out, and drag around), and clearing the canvas. <br> <br>
<img src="https://github.com/ShizuR/All-In/blob/main/siteContent/pages/artRes/drawDemo.gif" alt="gif of information slides working and video demonstration on hover">
<br>
2. Below the i-frame is a collapsible description section. There are three artwork examples proving the application's functionality which you are able to switch by clicking on either of the smaller two.
There are also two slides that elaborate on the Toolkit and Bottom Toolkit. The user is able to switch between the slides by clicking the '>' button.
They can also view a looping video demonstration by hovering over an image.
<br><br>
<img src="https://github.com/ShizuR/All-In/blob/main/siteContent/pages/artRes/imgExhib.gif" alt="gif of information slides working and video demonstration on hover">
<img src="https://github.com/ShizuR/All-In/blob/main/siteContent/pages/artRes/slideDemo.gif" alt="gif of information slides working and video demonstration on hover">
<br>
<h3>Database Application</h3>
This was built using Postgres SQL and Typescript as the backend. This project uses two tables, Criminals and Prisons, which have a many-to-one relationship. CRUD operations are used to change the Criminals database while RESTful APIs are used to send queries from the frontend to the backend. Results are rendered as a table.

1. A map of the UK is shown to the left. All prisoners are displayed by default (along with the name of the prison they're currently in using INNER JOIN). When the user clicks on a country, the table changes to show only the prisoners in those countries (depending on the prison they're in).
2. The user can create a new criminal via a form. The criminal's personal details must be confirmed before selecting an appropriate prison. This is because the prisons returned in the dropdown must 

<h3>Misc.</h3>
1. The background is able to be changed between two seasons. More will be added in future updates, including season-dependent colour schemes and more animated background elements to increase liveliness.
<br><br>
<img src="https://github.com/ShizuR/All-In/blob/main/siteContent/pages/artRes/seasonGIF.gif" alt="gif of animation intros and outros when switching seasons">
