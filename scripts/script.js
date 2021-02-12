const auth = firebase.auth();
const db = firebase.firestore();
const realtime_db = firebase.database();
function goBack() {
    window.history.back();
}

function setURL(the_id) {
    localStorage.setItem("page", "/toolbox/"+the_id) + "/";
}
function setName(the_id) {
    localStorage.setItem("name", the_id);
}
function signout(){
    console.log("logged out user, stupid");
    auth.signOut();
}

//Cloud Firestore Lesson pages

const lessonSection = document.getElementById("lesson"); //section where the lesson will be rendered

const elements = {
    image: function() {
      const img = document.createElement("img");
      img.src = this.content.link;
      if(typeof this.content.class == "string") {
        img.classList.add(this.content.class);
      }
      if(typeof this.content.title == "string") {
         img.id = this.content.title; //set
         createDirectory(this.content.title); //add title name of each section to the directory
      }
      lessonSection.appendChild(img);
    },
    hyperlink: function() {
      const link = document.createElement("a");
      link.href = this.content.link;
      link.textContent = this.content.text;
      if(typeof this.content.class == "string") {
        link.classList.add(this.content.class);
      }
      lessonSection.appendChild(link);
    },
    paragraph: function() {
      const p = document.createElement("p");
      p.innerHTML = this.content;
      lessonSection.appendChild(p);
    },
    header: function() {
      const head = document.createElement("h4");
      head.innerHTML = this.content;
      lessonSection.appendChild(head);
    },
    button: function() {
      const button = document.createElement("button");
      button.setAttribute('onclick', "window.open('" + this.content.link + "','_blank');");
      button.textContent = this.content.text;
      lessonSection.appendChild(button);
    },
    video: function() {
      const video = document.createElement("iframe");
      const yt = document.createElement("div");
      yt.classList.add("yt-container");
      video.classList.add("responsive-iframe");
      video.setAttribute('frameborder', "0");
      video.setAttribute('allowfullscreen', "");
      video.setAttribute('allow','accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      video.src = this.content.link;
      yt.appendChild(video);
      lessonSection.appendChild(yt);
    }
};
// <iframe width="560" height="315" src="https://www.youtube.com/embed/U8r3oTVMtQ0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//
// function loadLesson(lesson){
//   for(var i = 0; i<sections.length; i++){ //how many sections the edition has, iterates through sections (below)
//       db.collection("editions").doc("edition" + edition).collection(sections[i]).get()
//         .then(querySnapshot => {
//           querySnapshot.forEach(doc => {
//             const data = doc.data(); //retrieves all the sections as 'objects'
//             let entries1 = Object.entries(data); //return array of each object's key-value pairs
//             for (const [key, value] of entries1.sort()) { //loop through each element (key-value) in the array
//               let keyword = `${key}`; //the different key properties
//               let values = `${value}`; //the different value properties
//               let renderElement = new Object();
//               renderElement.content = value;
//               //create a new object with content property of value
//               let entries2 = Object.entries(elements); //create array of the 'elements'
//               for(let j=0;j<entries2.length;j++) { //access the elements + call the apropriate function to the element
//                 if(keyword.includes(entries2[j][0])==true) {
//                   if(entries2[j][0] == "image") { //use call method
//                     elements.image.call(renderElement);
//                   } else if(entries2[j][0] == "header") {
//                     elements.header.call(renderElement);
//                   } else if(entries2[j][0] == "hyperlink") {
//                     elements.hyperlink.call(renderElement);
//                   } else if(entries2[j][0] == "paragraph") {
//                     elements.paragraph.call(renderElement);
//                   } else if(entries2[j][0] == "button") {
//                     elements.button.call(renderElement);
//                   } else if(entries2[j][0] == "video") {
//                     elements.video.call(renderElement);
//                   }
//                 }
//               }
//             }
//           });
//         });
//     };
//   }
const lessons = db.collection("lessons");

function loadLesson(lesson) {
   //how many sections the edition has, iterates through sections (below)
      lessons.doc("biology").collection("gel-electro").doc("background").get()
        .then(doc => {
            const data = doc.data(); //retrieves all the sections as 'objects'
            console.log(data);
            let entries1 = Object.entries(data); //return array of each object's key-value pairs
            for (const [key, value] of entries1.sort()) { //loop through each element (key-value) in the array
              let keyword = `${key}`; //the different key properties
              let values = `${value}`; //the different value properties
              lessonSection.append(values); 
            }
        });
  }

//FIREBASE REALTIME DATABASE FUNCTIONS


  function writeUserData(first_name, last_name, email, password, birthday, imageUrl, realtime_db) {
    //using email as tree structure for users because its a very unique identifier
    //realtime_db = firebase.database();
    realtime_db.ref('users/' + first_name + "-" + last_name).set({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      birthday: birthday,
      profile_picture : imageUrl
    });
  }



