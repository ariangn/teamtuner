# TeamTuner
Created for Race System Solutions Hackathon 2024, Tokyo, Japan <br>
3rd place, Judges' Special Award <br> <br>
Presentation (in Japanese): <br>
https://www.canva.com/design/DAGI4jyp298/X81s_6ZBPs4uNsIN2BBFEA/view?utm_content=DAGI4jyp298&utm_campaign=designshare&utm_medium=link&utm_source=editor

## Overview
Our team developed a VSCode extension / Discord bot called TeamTuner. We focused on addressing issues commonly found in large companies, such as knowing who is knowledgeable in which area and difficulty keeping track of who is having problems where. The motivation behind the development was that if engineers could easily notify other knowledgeable in-house engineers about issues they encounter based on the nature of the error, it would shorten the time spent on the process from asking questions to consultation to resolution, ultimately leading to improved productivity. <br>

Time allotted: 1 day <br>
Total members: 4

## How it works

<img src="https://github.com/user-attachments/assets/a67ae5b2-1ca0-4fc7-a9eb-8ec7219f4a2a">
<br> <br>
VSCode detects an error  <br>
↓  <br>
A "Request Help" button is displayed  <br>
↓  <br>
When the button is clicked, a message is automatically created and sent to a dedicated Discord channel, mentioning people who might be able to help, along with the name of the person requesting help and the error message  <br>
↓  <br>
Someone who can help reacts to the message, indicating "I'll help." The name of the person who reacted is notified on the VSCode side. <br>
↓  <br>
Once the issue is resolved, the person in need can press the "Resolved!" button in VSCode, notifying the Discord channel that the issue has been resolved, and the process is complete.


