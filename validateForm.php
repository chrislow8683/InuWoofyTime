<!-- PHP to create an object and to encode it into a JSON file -->
<?php
    $user = new \stdClass();

    $user->fname = $_POST['fname'];
    $user->lname = $_POST['lname'];
    $user->email = $_POST['email'];
    $user->feedbacks = $_POST['feedbacks'];

    $jsonFile = fopen('feedbacks/feedback_' . date("Y-m-d_His") . '.json', 'w');
    fwrite($jsonFile, json_encode($user));
    fclose($jsonFile);
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<title>InuWoofyTime-FeedBackForm</title>
	<meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Bootstrap -->
    <link href="frameworks/css/bootstrap.min.css" rel="stylesheet" />
	<meta name="language" content="english" />
	<meta name="keywords" content="InuWoofyTime, Inu, Dogs, Feedback" />
	<meta name="description" content="InuWoofyTime-FeedbackForm" />

    <style type="text/css">
        html, body{
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        th, td{
            text-align: center;
        }

        .container{
            background-color: #dae0e5;
            border-radius: 0.25em;
            padding: 20px;
        }

        table{
            overflow: auto;
        }
    </style>
</head>

<body>
    <div class="container">
        <!-- Shows all the feedbacks given by the user
            Fname and Lname will only show when it is not empty -->
        <h1>Feedback Confirmation</h1>
        <p>Thank you for submitting your feedback to us! We will use them wisely to improve the website.</p>
        <p>Below are the feedbacks that you had provided to us.</p>
        <table class="table">
            <tbody>
                <tr class="thead-dark show">
                    <th>First Name</th>
                </tr>
                <tr class="show">
                    <td class="content"><?php echo $_POST['fname']; ?></td>
                </tr>
                <tr class="thead-dark show">
                    <th>Last Name</th>
                </tr>
                <tr class="show">
                    <td class="content"><?php echo $_POST['lname']; ?></td>
                </tr>
                <tr class="thead-dark">
                    <th>Email</th>
                </tr>
                <tr>
                    <td><?php echo $_POST['email']; ?></td>
                </tr>
                <tr class="thead-dark">
                    <th>Feedback</th>
                </tr>
                <tr>
                    <td><?php echo $_POST['feedbacks']; ?></td>
                </tr>
            </tbody>
        </table>
        <div style="text-align: center; margin-top: 8%;">
            <button class="btn btn-dark" onclick="location.href='InuWoofyTime.html';">Back</button>
        </div>
    </div>


    <!-- jQuery – required for Bootstrap's JavaScript plugins) -->
    <script src="frameworks/js/jquery.min.js"></script>
    <noscript>Your browser does not support JQuery!</noscript>
    <!-- All Bootstrap plug-ins file -->
    <script src="frameworks/js/bootstrap.min.js"></script>
    <noscript>Your browser does not support Bootstrap!</noscript>
    <!-- Basic AngularJS -->
    <script src="frameworks/js/angular.min.js"></script>
    <noscript>Your browser does not support AngularJS!</noscript>
    <!-- Javascript -->
    <script>
        var content = document.getElementsByClassName("content");
        var show = document.getElementsByClassName("show");

        function init(){
            for(i=0; i<content.length; i++){
                if(!content[i].innerText){
                    for(i=0; i<show.length; i++){
                        show[i].style.display = "none";
                    }
                }
                else{
                    for(i=0; i<show.length; i++){
                        show[i].style.display = "table-row";
                    }
                }
            }
        }

        init();
    </script>
    <noscript>Your browser does not support Javascript!</noscript>
</body>
</html>