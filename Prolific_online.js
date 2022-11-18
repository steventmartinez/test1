// Constants
var TODAY = new Date();
var DD = String(TODAY.getDate()).padStart(2, '0'); // this gets the date 
var MM = String(TODAY.getMonth() + 1).padStart(2, '0');  // this gets the month  
var YYYY = TODAY.getFullYear();  // this gets the year

const DATE = YYYY + MM + DD;
const fulldate = new Date().toLocaleString().replace(',','');
//Confirm fulldate in the console
console.log(fulldate);

//Experimental Parameters -- basically setting the repetitions for practice and experiment trials
PRACT_REP = 5;
EXP_REP = 1;


// Initialize the experiment -- THE INITIALIZE PART HAS TO BE WRITTEN IN THE TASK SCRIPT THAT YOU ARE SUBSEQUENTLY RUNNING AS PART OF THE MAIN SCRIPT
//Here, we are saying that we will use var csv to get the csv file
//var filename to name the csv file ####### event: 'focus', 'blur';
//and the downloadCSV function from the utils.js script in order to output the csv file


function startExp() {}
var jsPsych = initJsPsych({
    on_finish: function() {
        var csv = jsPsych.data.get().csv();
        var filename = jsPsych.data.get().values()[0].PID + "_" + DATE + ".csv";
        //downloadCSV(csv, filename);
        jsPsych.data.displayData()
    }
});


//Create timeline
var timeline = [];


//Create stimulus index
var stimuli = [0, 1, 2, 3, 4, 5, 6, 7];


//Organize video stimuli
video1 = 'vids/video1.mp4'
video2 = 'vids/video2.mp4'
video3 = 'vids/video3.mp4'
video4 = 'vids/video4.mp4'
video5 = 'vids/video5.mp4'
video6 = 'vids/video6.mp4'
video7 = 'vids/video7.mp4'
video8 = 'vids/video8.mp4'

video_stimuli = [video1, video2, video3, video4, video5, video6, video7, video8];
console.log(video_stimuli);

//Organize images
video1_image = 'imgs/video1.png'
video2_image = 'imgs/video2.png'
video3_image = 'imgs/video3.png'
video4_image = 'imgs/video4.png'
video5_image = 'imgs/video5.png'
video6_image = 'imgs/video6.png'
video7_image = 'imgs/video7.png'
video8_image = 'imgs/video8.png'

image_stimuli = [video1_image, video2_image, video3_image, video4_image, video5_image, video6_image, video7_image, video8_image];


//Load in video and images
var preload = {
type: jsPsychPreload,
image: image_stimuli,
video: video_stimuli
};

timeline.push(preload);


//Randomize index list
var RandList = jsPsych.randomization.shuffle(stimuli)
//var RandList = shuffle(stimuli)
console.log(RandList)

//Select 4 items from the random index list
var stimlist = jsPsych.randomization.sampleWithoutReplacement(RandList, 4);
console.log(stimlist);





///Welcome message and PID entry
var welcome = {
  type: jsPsychSurveyText,
  questions: [{prompt: "<p><div style ='font-size:50px;'>Welcome to the experiment!</div></p>" +
  "<p><div style ='font-size:50px;'>Please enter your participant ID.</div></p>", name: 'PID', required: true}],
  data: {startdate: fulldate},
  trial_duration: 0,
  on_finish: function(data) {
  // when this trial ends, check the data
  //console.log('response: ', data.response);
  var response = data.response;
  console.log(response)
  console.log(response.PID)
  //console.log(response.PID)
  id = Number(Object.values(response))
  console.log(id)
  jsPsych.data.addProperties({
      PID: response.PID, 
  })
  PID_condition = id % 3
  console.log(PID_condition)
},
}

timeline.push(welcome);


var welcome = {
    type: jsPsychSurveyText,
    questions: [{prompt: "<p><div style ='font-size:50px;'>Welcome to the experiment!</div></p>" +
    "<p><div style='font-size:50px;color:white;'>.</div></p>" + 
    "<p><div style ='font-size:50px;'>Please enter your participant ID.</div></p>", name: 'PID', required: true}],
}


  // define instructions message trial
  var instructions_block = {
    type: jsPsychInstructions,
    pages: [
        "<p> Please turn off music, cell phone and other devices that might be distracting.</p>" +
        "<p> By click the <b>Next</b> button, the experiment will begin.</p>"
    ],
    show_clickable_nav: true
};
timeline.push(instructions_block);






/////////////Practice Trials
var pract_instructions = {
    data: {
        screen_id: "instructions"
    },
    type: jsPsychInstructions,
    pages: [
      "<p><div style ='font-size:40px;'>You're about to watch a series of videos.</div></p>" +
      "<p><div style ='font-size:40px;'>After each video, you will be asked to write a short summary.</div></p>" +
      "<p><div style ='font-size:40px;'>The summary should be between <b>150 and 400 characters</b>.</div></p>" +
      "<p><div style ='font-size:40px;'>We will begin with some practice trials.</div></p>" +
      "<p><div style ='font-size:40px;'>Press <b>Next</b> to begin.</div></p>",
    ],
    show_clickable_nav: true
}



var pract_stimuli = [
    { practice_stimulus: ["vids/Non-Valence-Sample Clip/ALJAZAM_20150312_120000_Fault_Lines_pract.mp4"], data: {screen_id: "pract_trial"}}
];



//Fixation point
var fixation_point = {
    data: {screen_id: "fixation", stimulus: "+"}, //this adjusts the naming of the stimulus column in the to-be-exported csv file
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<div style='font-size: 100px'><b>+</b></div>",
    choices: "NO_KEYS",
    trial_duration: 500,
};


//Create a variable for a practice text response
var pract_text = {
    data: jsPsych.timelineVariable("data"),
    type: jsPsychSurveyText,
    questions: [
        {prompt: "<p><div style ='font-size:40px;'>Please write your summary below.</div></p>" +
        "<p><div style ='font-size:40px;'>As a reminder, it should be between 150-400 characters.</div></p>", 
        rows: 20, columns: 80, required: true}
    ],
    trial_duration: 5000,
    pract_trial_response: jsPsych.timelineVariable("pract_trial_response"),
    on_finish: function(data) {
        response = data.response,
        jsPsych.data.addProperties({
            Response: response, 
        })
    }
};





//Create practice trials
var pract_trial = {
    data: jsPsych.timelineVariable("data"),
    type: jsPsychVideoKeyboardResponse,
    stimulus: jsPsych.timelineVariable("practice_stimulus"),
    trial_ends_after_video: true,
    choices: "ALL_KEYS",
    width: 800,
    height: 800,
}


//Combine into practice procedure
var pract_procedure = {
    timeline: [pract_instructions, fixation_point, pract_trial, pract_text],
    timeline_variables: pract_stimuli,
}

timeline.push(pract_procedure);






///Organize each of the condition instruction blocks
var control_instructions = {
  data: {
    instructions_type: "control instructions"
  },
  type: jsPsychInstructions,
  pages: [
      "<p><div style ='font-size:40px;'>You're about to watch a series of videos.</div></p>" +
      "<p><div style ='font-size:40px;'>After each video, you will be asked to write a short summary.</div></p>" +
      "<p><div style ='font-size:40px;'>The summary should be between <b>150 and 400 characters</b>.</div></p>" +
      "<p><div style ='font-size:40px;'>Press <b>Next</b> to begin.</div></p>",
  ],
  show_clickable_nav: true
}



var socialmedia_instructions = {
  data: {
      instructions_type: "social media instructions"
  },
  type: jsPsychInstructions,
  pages: [
      "<p><div style ='font-size:40px;'>You're about to watch a series of videos.</div></p>" +
      "<p><div style ='font-size:40px;'>After each video, you will be asked to write a social media post.</div></p>" +
      "<p><div style ='font-size:40px;'>The post should be between <b>150 and 400 characters</b>.</div></p>" +
      "<p><div style ='font-size:40px;'>This social media post will be assessed for its value to a social media audience.</div></p>" +
      "<p><div style ='font-size:40px;'>Press <b>Next</b> to begin.</div></p>", 
  ],
  show_clickable_nav: true
}



var news_instructions = {
  data: {
    instructions_type: "news instructions"
  },
  type: jsPsychInstructions,
  pages: [
      "<p><div style ='font-size:40px;'>You're about to watch a series of videos.</div></p>" +
      "<p><div style ='font-size:40px;'>After each video, you will be asked to write a news brief that could be used as part of a news article.</div></p>" +
      "<p><div style ='font-size:40px;'>The news brief should be between <b>150 and 400 characters</b>.</div></p>" +
      "<p><div style ='font-size:40px;'>This news brief will be assessed for its value to a news outlet.</div></p>" +
      "<p><div style ='font-size:40px;'>Press <b>Next</b> to begin.</div></p>",
  ],
  show_clickable_nav: true
}




////Push one of the conditions depending on the PID entry
var control_condition = {
  timeline: [control_instructions],
  conditional_function: function () {
      var data = jsPsych.data.get().last(1).values()[0];
      if (PID_condition === 1) {
          return true;
      } else {
          return false;
      }
  }
}



var control_start = {
  timeline: [control_condition]
};

timeline.push(control_start);




var socialmedia_condition = {
  timeline: [socialmedia_instructions],
  conditional_function: function () {
      var data = jsPsych.data.get().last(1).values()[0];
      if (PID_condition === 2) {
          return true;
      } else {
          return false;
      }
  }
}



var socialmedia_start = {
  timeline: [socialmedia_condition]
};

timeline.push(socialmedia_start);




var news_condition = {
  timeline: [news_instructions],
  conditional_function: function () {
      var data = jsPsych.data.get().last(1).values()[0];
      if (PID_condition === 0) {
          return true;
      } else {
          return false;
      }
  }
}



var news_start = {
  timeline: [news_condition]
};

timeline.push(news_start);







//Show 4 randomized videos
for (var i=0; i < stimlist.length; i++){
var video_trials = {
data: jsPsych.timelineVariable("data"),
type: jsPsychVideoKeyboardResponse,
stimulus: [video_stimuli[stimlist[i]]],
width: 800,
height: 700,
data: {
video_name: video_stimuli[stimlist[i]],
}
};

timeline.push(video_trials);
}






////////////////// Post-Video Memory Questions


var recall_instructions_block = {
    data: {
        screen_id: "recall_instructions"
    },
    type: jsPsychInstructions,
    pages: ["<p><div style ='font-size:30px;'>Next we will be showing you an image of a video clip you recently watched.</div</p>" + 
    "<p><div style ='font-size:30px;'>Please type everything that you can remember about this video clip.</div</p>" +
    "<p><div style ='font-size:30px;'>Spend at least 3 minutes trying to write down as much as you can remember about the video clip.</div></p>" +
    "<p><div style ='font-size:30px;'>Press <b>Next</b> to continue.</div</p>"],
    show_clickable_nav: true
};

timeline.push(recall_instructions_block);



//Use this index to name the questions in the recall_response
questions_index = [0,1,2,3]


//Show 4 screenshots matching randomized videos
for (var i=0; i < stimlist.length; i++){

var image_trials = {
data: jsPsych.timelineVariable("data"),
type: jsPsychImageKeyboardResponse,
prompt: "<p>Here is a screenshot of a video you recently watched. The next questions will be about this video.</p>",
stimulus: [image_stimuli[stimlist[i]]],
stimulus_width: 500,
stimulus_height: 400,
trial_duration: 10000,
data: {
pic_name: image_stimuli[stimlist[i]],
}
};

var recall_response = {
    data: jsPsych.timelineVariable("data"),
    type: jsPsychSurveyText,
    questions: [
        {prompt: "<p><div style ='font-size:30px;'>Please type everything that you can remember about this video clip.</div</p>", 
        name: 'Q' + questions_index[i],
        rows: 30,  
        columns: 
        100, 
        required: true}
    ],
    trial_duration: 3000,
    //view_duration: 5000, //the correct number for 3 minutes is 180000
    data: {task_part: 'recall_response'},
};

timeline.push(fixation_point);
timeline.push(image_trials);
timeline.push(recall_response);
}





/////Recognition Memory? 

//Recognition Memory multiple choice
var recognition_instruction_block = {
    data: {
        screen_id: "Post Task instructions"
    },
    type: jsPsychInstructions,
    pages: [
        "<p><div style ='font-size:30px;'>Next, we will be asking you more questions about the videos you just watched.</div></p>" + 
        "<p><div style ='font-size:30px;'>Prior to the questions, you will see a picture of the video we are asking you about.</div></p>" +
        "<p><div style ='font-size:30px;'>We will begin the questions now.</div></p>"
    ],
    show_clickable_nav: true
}

timeline.push(recognition_instruction_block);



///Here is where the questions are organized into objects via nested timelines.
var video1_questions = {
    timeline: [
        {
          type: jsPsychSurveyMultiChoice,
          questions: [
          {prompt: "<p><div style ='font-size:30px;'><b>What time did the fire start?</b></div></p>",
              name: 'video1_Question1',
              options: ['2:30AM', '4:00AM', '8:30PM', '2:00PM'], 
              required: true,
              horizontal: true,
          }]
        },
        {
          type: jsPsychSurveyMultiChoice,
           questions: [
            {prompt: "<p><div style ='font-size:30px;'><b>Where in Baltimore County did this fire take place?</b></div></p>",
              name: 'video1_Question2',
              options: ['Owings Mills', 'Hampton', 'Overlea', 'Crofton'], 
              required: true,
              horizontal: true,
          },
           ],
      },
      {
      type: jsPsychSurveyMultiChoice,
      questions: [
          {prompt: "<p><div style ='font-size:30px;'><b>Who woke the son up?</b></div></p>",
              name: 'video1_Question3',
              options: ['Mother', 'Father', 'Cat', 'Puppy'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
            {prompt: "<p><div style ='font-size:30px;'><b>Where in the house did the fire start?</b></div></p>",
              name: 'video1_Question4',
              options: ['Basement', '1st floor', '2nd floor', 'Living room'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>What object was to the right of the ambulance?</b></div></p>",
              name: 'video1_Question5',
              options: ['Fire Truck', 'House', 'Stop Sign', 'Car'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>In the beginning, where was the 'Live' icon displayed?</b></div></p>",
              name: 'video1_Question6',
              options: ['Basement', '1st floor', '2nd floor', 'Living room'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>What was the color of the pick-up truck next to the house?</b></div></p>",
              name: 'video1_Question7',
              options: ['Red', 'Blue', 'Tan', 'Black'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>What was the color of the reporter's jacket?</b></div></p>",
              name: 'video1_Question8',
              options: ['Green', 'Black', "Red", 'White'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>How many firefighers were on the ladder?</b></div></p>",
              name: 'video1_Question9',
              options: ['1', '0', '3', '2'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        ],
  }
  
  
  var video2_questions = {
    timeline: [
        {
          type: jsPsychSurveyMultiChoice,
          questions: [
          {prompt: "<p><div style ='font-size:30px;'><b>What was the name of the professor?</b></div></p>",
              name: 'video2_Question1',
              options: ['Professor Douglas', 'Professor Duma', 'Professor Carter', 'Professor Watts'],
              required: true,
              horizontal: true,
          }]
        },
        {
          type: jsPsychSurveyMultiChoice,
           questions: [
           {prompt: "<p><div style ='font-size:30px;'><b>What does H.I.T.S. stand for?</b></div></p>",
              name: 'video2_Question2',
              options: ['Heart Intervals Tracking System', 'Head Impact Telemtry System', 'Head Impact Tracking Software', 'Heart Impact Telemetry System'], 
              required: true,
              horizontal: true,
          },
           ],
      },
      {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>What do the H.I.T.S. helmet sensors measure?</b></div></p>",
              name: 'video2_Question3',
              options: ['Angle of the Head', 'Acceleration of the head', 'Blood flow in the head', 'Angle and Acceleration of the head'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>Where is the H.I.T.S. acronym revealed in the video?</b></div></p>",
              name: 'video2_Question4',
              options: ['Left', 'Top', 'Right', 'Bottom'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>In the first scene, where were the coaches standing?</b></div></p>",
              name: 'video2_Question5',
              options: ['To the right of the play', 'Behind the play', 'To the left of the play', 'No coaches were present'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>What was displayed below the head diagram on the laptop?</b></div></p>",
              name: 'video2_Question6',
              options: ['A graph', 'Another head diagram', 'Nothing', 'Demographic information'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>In the beginning, what was the color of the football jerseys?</b></div></p>",
              name: 'video2_Question7',
              options: ['White', 'Navy Blue', 'Maroon', 'Green'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>How many sensors were inside the helmet?</b></div></p>",
              name: 'video2_Question8',
              options: ['Over 10', 'Under 10', "20", '30'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>In the intro scene, what number was the player in the yellow jersey wearing?</b></div></p>",
              name: 'video2_Question9',
              options: ['10', '22', '6', '42'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        ],
  }
  
  
  var video3_questions = {
    timeline: [
        {
          type: jsPsychSurveyMultiChoice,
          questions: [
          {prompt: "<p><div style ='font-size:30px;'><b>What social media platform were the messages being displayed on?</b></div></p>",
              name: 'video3_Question1',
              options: ['Facebook', 'Instagram', 'Twitter', 'WhatsApp'], 
              required: true,
              horizontal: true,
          }]
        },
        {
          type: jsPsychSurveyMultiChoice,
           questions: [
           {prompt: "<p><div style ='font-size:30px;'><b>Which country did Sir Clive Woodward Coach?</b></div></p>",
              name: 'video3_Question2',
              options: ['New Zealand', 'South Africa', 'England', 'Wales'], 
              required: true,
              horizontal: true,
          },
           ],
      },
      {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>Which country did Dan Carter play for?</b></div></p>",
              name: 'video3_Question3',
              options: ['New Zealand', 'South Africa', 'England', 'Wales'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>In the first scene, how many individuals had sunglasses?</b></div></p>",
              name: 'video3_Question4',
              options: ['3', '0', '2', '1'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>In the first scene, how many individuals were on the screen?</b></div></p>",
              name: 'video3_Question5',
              options: ['1', '2', '3', '4'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>Where was the BBC News Banner being displayed?</b></div></p>",
              name: 'video3_Question6',
              options: ['Bottom', 'Top', 'Was not displayed', 'Top Right'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>What was the color of the reporter's blazer?</b></div></p>",
              name: 'video3_Question7',
              options: ['White', 'Navy Blue', 'Beige', 'Black'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>What color was the jersey of the rugby players during the news broadcast segment?</b></div></p>",
              name: 'video3_Question8',
              options: ['Green', 'White', "Black", 'Blue'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>In the intro scene, what was the player wearing around his neck?</b></div></p>",
              name: 'video3_Question9',
              options: ['Scarf', 'Neck brace', 'Nothing', 'Neck warmer'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        ],
  }
  
  
  var video4_questions = {
    timeline: [
        {
          type: jsPsychSurveyMultiChoice,
          questions: [
          {prompt: "<p><div style ='font-size:30px;'><b>How many homes were undergoing re-modeling?</b></div></p>",
              name: 'video4_Question1',
              options: ['1', '2', '3', '4'], 
              required: true,
              horizontal: true,
          }]
        },
        {
          type: jsPsychSurveyMultiChoice,
           questions: [
           {prompt: "<p><div style ='font-size:30px;'><b>What type of company is Peak One Builders?</b></div></p>",
              name: 'video4_Question2',
              options: ['General Contracting', 'Home Repair', 'Construction', 'Furniture Outlet'], 
              required: true,
              horizontal: true,
          },
           ],
      },
      {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>What was the name of the Peak One Builders' owner?</b></div></p>",
              name: 'video4_Question3',
              options: ['Mike Christensen', 'Tyler Christensen', 'David Cannonier', 'Michael Owens'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>Where was the Fox Business Network Logo displayed on the screen?</b></div></p>",
              name: 'video4_Question4',
              options: ['Bottom right', 'Top right', 'Bottom left', 'Top left'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>Where was the business logo located?</b></div></p>",
              name: 'video4_Question5',
              options: ['Bottom right', 'Top right', 'Bottom left', 'Top left'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>Which tools were the workers using throughout the film?</b></div></p>",
              name: 'video4_Question6',
              options: ['Hammer', 'Drill', 'Hammer and Drill', 'Hammer, Drill, and Wrench'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>How many workers were standing on ladders?</b></div></p>",
              name: 'video4_Question7',
              options: ['1', '2', '0', '3'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>What was the color of the worker's shirts?</b></div></p>",
              name: 'video4_Question8',
              options: ['Lime Green', 'Navy Blue', "Maroon", 'Orange'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>What were the workers rolling on the dolley?</b></div></p>",
              name: 'video4_Question9',
              options: ['Boxes', 'Sand Bags', 'Water', 'Snacks'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        ],
  }
  
  
  var video5_questions = {
    timeline: [
        {
          type: jsPsychSurveyMultiChoice,
          questions: [
          {prompt: "<p><div style ='font-size:30px;'><b>What was the name of the film festival?</b></div></p>",
              name: 'video5_Question1',
              options: ['Berlin International Film Festival', 'Belgium International Film Festival', 'Amsterdam Film Festival', 'Beirut Film Festival'], 
              required: true,
              horizontal: true,
          }]
        },
        {
          type: jsPsychSurveyMultiChoice,
           questions: [
           {prompt: "<p><div style ='font-size:30px;'><b>How many photographers were invited by festival organizers to the festival?</b></div></p>",
              name: 'video5_Question2',
              options: ['8', '12', '18', '3'], 
              required: true,
              horizontal: true,
          },
           ],
      },
      {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>How many photos are taken at the festival every day?</b></div></p>",
              name: 'video5_Question3',
              options: ['More than 200,000', 'More than 100,000', 'Less than 50,000', 'Less than 20,000'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>Where does the map of the film festival location appear?</b></div></p>",
              name: 'video5_Question4',
              options: ['Bottom right', 'Top right', 'Bottom left', 'Top left'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>Where was the KCSM logo located?</b></div></p>",
              name: 'video5_Question5',
              options: ['Bottom right', 'Top right', 'Bottom left', 'Top left'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>What does the celebrity do as her photo is being taken?</b></div></p>",
              name: 'video5_Question6',
              options: ['Waves hello', 'Spins', 'Stands still', 'Covers her face'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>What was displayed in the first photo that was presented?</b></div></p>",
              name: 'video5_Question7',
              options: ['Two fingers', 'A celebrity', "The crowd's reaction", 'Selfie'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>What was the color of the dress in the second photo that was presented?</b></div></p>",
              name: 'video5_Question8',
              options: ['Black', 'Light Blue', "White", 'Purple'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>At the end, what type of requipment was lying next to the stage?</b></div></p>",
              name: 'video5_Question9',
              options: ['Ladders', 'Hammers', 'Microphone', 'Red Carpet'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        ],
  }
  
  
  var video6_questions = {
    timeline: [
        {
          type: jsPsychSurveyMultiChoice,
          questions: [
          {prompt: "<p><div style ='font-size:30px;'><b>What weather issues was the reporter discussing?</b></div></p>",
              name: 'video6_Question1',
              options: ['Mudslide', 'Thunderstorm', 'Snow', 'Hail'], 
              required: true,
              horizontal: true,
          }]
        },
        {
          type: jsPsychSurveyMultiChoice,
           questions: [
           {prompt: "<p><div style ='font-size:30px;'><b>How many lanes were operating by the Vine Hill exit?</b></div></p>",
              name: 'video6_Question2',
              options: ['0', '1', '2', '4'], 
              required: true,
              horizontal: true,
          },
           ],
      },
      {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>What did the land experts place in the ground?</b></div></p>",
              name: 'video6_Question3',
              options: ['Cones', 'Markers', 'Salt', 'Sand'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>What object is seen next to the street light?</b></div></p>",
              name: 'video6_Question4',
              options: ['Tree', 'Street Sign', 'Store', 'Shopping Cart'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>Where was the 'Live' icon located?</b></div></p>",
              name: 'video6_Question5',
              options: ['Bottom right', 'Top right', 'Bottom left', 'Top left'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>How many pedestrians were seen walking in the background?</b></div></p>",
              name: 'video6_Question6',
              options: ['0', '1', '2', '3'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>In the intro scene, what was behind the reporter?</b></div></p>",
              name: 'video6_Question7',
              options: ['Highway', 'Stadium', "Cornfield", 'Parking lot'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>At the end, what number was on the last street sign?</b></div></p>",
              name: 'video6_Question8',
              options: ['7', '17', "42", 'No number'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>What was the color of the reporter's jacket?</b></div></p>",
              name: 'video6_Question9',
              options: ['Yellow', 'Blue', 'White', 'Black'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        ],
  }
  
  
  var video7_questions = {
    timeline: [
        {
          type: jsPsychSurveyMultiChoice,
          questions: [
          {prompt: "<p><div style ='font-size:30px;'><b>How many consecutive days were the stores remaining open for right before the holidays?</b></div></p>",
              name: 'video7_Question1',
              options: ['1 week straight', '3 days straight', '2 days straight', '5 days straight'], 
              required: true,
              horizontal: true,
          }]
        },
        {
          type: jsPsychSurveyMultiChoice,
           questions: [
           {prompt: "<p><div style ='font-size:30px;'><b>How many stores was Macy's keeping open?</b></div></p>",
              name: 'video7_Question2',
              options: ['4', '10', 'More than a Dozen', 'More than 50'], 
              required: true,
              horizontal: true,
          },
           ],
      },
      {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>Of the stores that would remain open, where were most stores located?</b></div></p>",
              name: 'video7_Question3',
              options: ['East and Midwest', 'Midwest and South', 'West and East', 'West and South'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>What object did the Macy's employee give to the customer?</b></div></p>",
              name: 'video7_Question4',
              options: ['Bag', 'Receipt', 'Nothing', 'Cash'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>Where was the 'FOX5' logo located?</b></div></p>",
              name: 'video7_Question5',
              options: ['Bottom right', 'Top right', 'Bottom left', 'Top left'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>What information was displayed on the right side of the screen?</b></div></p>",
              name: 'video7_Question6',
              options: ['Crime reports', 'Weather', 'Sales', 'Store locations'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>What were the first items being purchased by customers?</b></div></p>",
              name: 'video7_Question7',
              options: ['Bags', 'Watches', "Video games", 'Holiday decorations'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>What were customers using to get downstairs?</b></div></p>",
              name: 'video7_Question8',
              options: ['Escalators', 'Stairs', "Ramp", 'Elevator'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>What storefront of Macy's was first presented?</b></div></p>",
              name: 'video7_Question9',
              options: ["Macy's Women's", "Macy's Kid's", "Macy's Men's", "Macy's Bedding"], 
              required: true,
              horizontal: true,
          },
        ],
        },
        ],
  }
  
  
  var video8_questions = {
    timeline: [
        {
          type: jsPsychSurveyMultiChoice,
          questions: [
          {prompt: "<p><div style ='font-size:30px;'><b>At the end, what was the name of the street being displayed?</b></div></p>",
              name: 'video8_Question1',
              options: ['Main Street', 'K Street', "2nd Street", 'Broad Street'], 
              required: true,
              horizontal: true,
          }]
        },
        {
          type: jsPsychSurveyMultiChoice,
           questions: [
           {prompt: "<p><div style ='font-size:30px;'><b>Which university was Matt Mitchell representing?</b></div></p>",
              name: 'video8_Question2',
              options: ['Georgetown University', 'George Mason University', 'The George Washington University', 'American University'], 
              required: true,
              horizontal: true,
          },
           ],
      },
      {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>What was the name of the hotel that was referenced?</b></div></p>",
              name: 'video8_Question3',
              options: ['West End Washington Hotel', 'Lombardi Hotel', 'Willard Hotel', 'The Darcy Hotel'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>Where was the 'Lobbying Connection' banner displayed?</b></div></p>",
              name: 'video8_Question4',
              options: ['Below the presidential photo', 'Above the presidential photo', 'To the right of the presidential photo', 'To the left of the presidential photo'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>Where was the 'FOX5' logo located?</b></div></p>",
              name: 'video8_Question5',
              options: ['Bottom right', 'Top right', 'Bottom left', 'Top left'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>What information was displayed on the right side of the screen?</b></div></p>",
              name: 'video8_Question6',
              options: ['Crime reports', 'Weather', 'Sales', 'Stocks'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>Which flag was displayed?</b></div></p>",
              name: 'video8_Question7',
              options: ['USA flag', 'United Nations Flag', "Washington D.C. Flag", 'None of the above'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>What building was seen in the background?</b></div></p>",
              name: 'video8_Question8',
              options: ['White House', 'Washington Monument', "Capitol Building", 'Lincoln Memorial'], 
              required: true,
              horizontal: true,
          },
        ],
        },
        {
      type: jsPsychSurveyMultiChoice,
      questions: [
      {prompt: "<p><div style ='font-size:30px;'><b>In the intro, which president was displayed?</b></div></p>",
              name: 'video8_Question9',
              options: ["Theodore Roosevelt", "Abraham Lincoln", "Ulysses Grant", "Thomas Jefferson"], 
              required: true,
              horizontal: true,
          },
        ],
        },
        ],
  }
  


//Organize all the video questions into one array
var video_questions = [video1_questions, video2_questions, video3_questions, video4_questions, video5_questions, video6_questions, video7_questions, video8_questions];



//Re-shuffle the videos so the videos aren't shown in the same order they were presented
var stimlist = jsPsych.randomization.shuffle(stimlist)
console.log(stimlist)




//Show matching set of questions
for (var i=0; i < stimlist.length; i++){

var questions_trials = video_questions[stimlist[i]]

var image_trials_rec = {
    data: jsPsych.timelineVariable("data"),
    type: jsPsychImageKeyboardResponse,
    prompt: "<p>Here is a screenshot of a video you recently watched. The next questions will be about this video. </p>",
    stimulus: [image_stimuli[stimlist[i]]],
    stimulus_width: 500,
    stimulus_height: 400,
    trial_duration: 5000,
    data: {
    pic_name: image_stimuli[stimlist[i]],
    }
    };

timeline.push(fixation_point);
timeline.push(image_trials_rec);
timeline.push(questions_trials)
};



//Debrief
var debrief = {
    data: {
        screen_id: "debrief" //this is basically the answer that we are putting in the screen_id column on the csv.
    },
    type: jsPsychInstructions,
    pages: [
        "<p><div style ='font-size:30px;'>We have completed our experiment.</div></p>" + 
        "<p><div style ='font-size:30px;'>Please contact the experimenter.</div></p>"
    ],
    show_clickable_nav: true
};

timeline.push(debrief);