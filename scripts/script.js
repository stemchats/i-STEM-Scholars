const auth = firebase.auth();
const db = firebase.firestore();
//const realtime_db = firebase.database();
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
    image: function() { //uses map
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
    header: function() { //uses map
		const head = document.createElement("h4");
		head.innerHTML = this.content.text;
		if(typeof this.content.title == "string") {
			head.id = this.content.title;
		}
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
    },
    caption: function() {
		const p = document.createElement("p");
		p.classList.add("caption");
		p.innerHTML = this.content;
		lessonSection.appendChild(p);
    },
    bullets: function() { //uses array
		const ul = document.createElement("ul");
		for (const element of this.content) {
			const li = document.createElement("li");
			li.innerHTML = element;
			ul.appendChild(li);
		}
		lessonSection.appendChild(ul);
    },
    numbered: function() { //uses array
		const ol = document.createElement("ol");
		for (const element of this.content) {
			const li = document.createElement("li");
			li.innerHTML = element;
			ol.appendChild(li);
		}
		lessonSection.appendChild(ol);
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

function loadLesson(subject, lesson) {
	for (var i = 0; i<sections.length; i++) { //how many sections the edition has, iterates through sections (below)
		lessons.doc(subject).collection(lesson).doc(sections[i]).get()
			.then(doc => {
				const data = doc.data(); //retrieves all the sections as 'objects'
				console.log(subject, lesson, data);
				if (data==undefined) return
				let entries1 = Object.entries(data); //return array of each object's key-value pairs
				for (const [key, value] of entries1.sort()) { //loop through each element (key-value) in the array
					let keyword = `${key}`; //the different key properties
					let values = `${value}`; //the different value properties
					let renderElement = new Object();
					renderElement.content = value;
					//create a new object with content property of value
					let entries2 = Object.entries(elements); //create array of the 'elements'
					for (let j = 0; j < entries2.length; j++) { //access the elements + call the apropriate function to the element
						if (keyword.includes(entries2[j][0]) == true) {
							if (entries2[j][0] == "image") { //use call method
								elements.image.call(renderElement);
							} else if (entries2[j][0] == "header") {
								elements.header.call(renderElement);
							} else if (entries2[j][0] == "hyperlink") {
								elements.hyperlink.call(renderElement);
							} else if (entries2[j][0] == "paragraph") {
								elements.paragraph.call(renderElement);
							} else if (entries2[j][0] == "button") {
								elements.button.call(renderElement);
							} else if (entries2[j][0] == "video") {
								elements.video.call(renderElement);
							} else if (entries2[j][0] == "caption") {
								elements.caption.call(renderElement);
							} else if (entries2[j][0] == "bullets") {
								elements.bullets.call(renderElement);
							} else if (entries2[j][0] == "numbered") {
								elements.numbered.call(renderElement);
							}
						}
					}
					//lessonSection.append(values); 
				}
			});
	}
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
/*
//AN ATTEMPT!
//Login/Signup Required Fields
const fname = document.getElementByID('fname');
const lname = document.getElementByID('lname');
const emailSignUp = document.getElementByID('emailSignUp');
const passwordSignUp = document.getElementByID('passwordSignUp');
const passwordConfSignUp = document.getElementByID('passwordConfSignUp');
const form = document.getElementByID('form');
const errorElement = document.getElementById('error')

form.addEventListener('submit', (e) => {
	let messages = []
	if (fname.value == '' || fname.value == null){
		messages.push('First Name is required')
	}

	if (lname.value == '' || lname.value == null){
		messages.push('Last Name is required')
	}
	if (emailSignUp.value == '' || emailSignUp.value == null){
		messages.push('Email is required')
	}

	if (passwordSignUp.value.length <= 6){
		messages.push('Password must be longer than 6 characters')
	}

	if (messages.length > 0){
		e.preventDefault()
		errorElement.innerText = messages.join(', ')
	}
})
*/




