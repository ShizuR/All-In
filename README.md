<h1>All-In: A portfolio website using JavaScript, HTML, CSS, and Bootstrap</h1>

This website is to showcase and explain smaller personal projects. At the moment, two projects (an art and database application) are available to test. 
The editor used was Visual Studio Code where you can directly view the website, however, to test the database application, you need to be run docker and go to on http://localhost:7272 using the command 'docker compose up -d'.
<br><br>
<img src="https://github.com/ShizuR/All-In/blob/main/siteContent/pages/artRes/intro.gif" alt="gif of website on load">

<h2>Aspects</h2>
<i>(Due to the GIF format, there is slight discoloration, flickering, and jittery motions that are not present in the actual project)</i> <br> <br>

<h3>Database Application</h3>
This was built using PostgreSQL and Typescript as the backend. This project uses two tables, Criminals and Prisons, which have a many-to-one relationship. CRUD operations were used to change the Criminals database while RESTful APIs were used to send queries from the frontend to the backend. Results are rendered as a table with data seeded.
<br><br>
1. An svg map of the UK is shown to the left. All prisoners are displayed by default (along with the name of the prison they're currently in using INNER JOIN). When the user clicks on a country, the table changes to show only the prisoners in those countries (depending on the prison they're in). Clicking the same country twice will show the default table again.
<img src="https://github.com/ShizuR/All-In/blob/main/siteContent/pages/artRes/dbShowcase/countryG.gif" alt="gif of country selection on svg map">

2. The user can create a new criminal via a form. The criminal's personal details must be confirmed before selecting an appropriate prison. This is because the prisons in the dropdown menu are returned with constraints: whether the prison accepted criminal's of their gender, and its current prisoner count compared to maximum prisoner count. The chosen prison will increase in prisoner count on submission. To ensure data consistency, constraints were added to the form, such as setting the maximum length of name and crime (25), and setting the maximum and minimum age (18-100).
<img src="https://github.com/ShizuR/All-In/blob/main/siteContent/pages/artRes/dbShowcase/createG.gif" alt="gif of criminal creation">

4. The user can also choose to alter the entries of criminals. The user can use the search bar to search for criminals using the ILIKE operator. Leaving an empty search would display all criminals.
<img src="https://github.com/ShizuR/All-In/blob/main/siteContent/pages/artRes/dbShowcase/searchG.gif" alt="gif of country selection on svg map">

6. When selecting a criminal, the same form as criminal creation appears but has all fields automatically filled out. If the form was submitted without any change in prison, the prison's prisoner count would stay the same. However, if the prison was changed, the old prison count would decrease and vice versa for the new prison. Finally, the user may delete a criminal instead.
<img src="https://github.com/ShizuR/All-In/blob/main/siteContent/pages/artRes/dbShowcase/deleteUpdateG.gif" alt="gif of country selection on svg map">

<h3>Art Application</h3>
1. Interactive demonstration of the art application using an i-frame. The window can expand and shrink without unwanted bugs on your drawings. The current features are: erasing lines, drawing strokes, undo/redoing
strokes, a reference button to upload multiple images as mini windows (each being able to zoom in, out, and drag around), and clearing the canvas. <br> <br>
<img src="https://github.com/ShizuR/All-In/blob/main/siteContent/pages/artRes/drawDemoG.gif" alt="gif of information slides working and video demonstration on hover">
<br>
2. Below the i-frame is a collapsible description section. There are three artwork examples proving the application's functionality which you are able to switch by clicking on either of the smaller two.
There are also two slides that elaborate on the Toolkit and Bottom Toolkit. The user is able to switch between the slides by clicking the '>' button.
They can also view a looping video demonstration by hovering over an image.
<br><br>
<img src="https://github.com/ShizuR/All-In/blob/main/siteContent/pages/artRes/imgExhibG.gif" alt="gif of information slides working and video demonstration on hover">
<img src="https://github.com/ShizuR/All-In/blob/main/siteContent/pages/artRes/slideDemoG.gif" alt="gif of information slides working and video demonstration on hover">
<br>
