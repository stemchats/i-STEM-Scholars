var db = firebase.firestore();

function setURL(the_id) {
    localStorage.setItem("page", "/toolbox/"+the_id) + "/";
}
function setName(the_id) {
    localStorage.setItem("name", the_id);
}
// function signout(){
//     console.log("logged out user, stupid");
//     auth.signOut();
// }

//Cloud Firestore Lesson pages

var lessonSection = document.getElementById("lesson"); //section where the lesson will be rendered

var elements = {
    image: function() { //uses map
		const img = document.createElement("img");
		img.src = this.content.link;
		if(typeof this.content.class == "string") {
			img.classList.add(this.content.class);
		}
		if(typeof this.content.title == "string") {
			img.id = this.content.title; //set
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
		if(typeof this.content.image == "string") {
			const img = document.createElement("img");
			img.src = this.content.image;
			link.appendChild(img);
		}
		link.setAttribute('target', "_blank");
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
		video.src = this.content.link; //MAKE SURE URL IS IN FORM "https://www.youtube.com/watch?v=VIDEO_ID"
		var replaceIndex = video.src.indexOf("watch?v=");
		video.src = video.src.substring(0, replaceIndex) + "embed/" + video.src.substring(replaceIndex+8);
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
var lessons = db.collection("lessons");

function loadLesson(subject, lesson) {
	for (var i = 0; i<sections.length; i++) { //how many sections the edition has, iterates through sections (below)
		lessons.doc(subject).collection(lesson).doc(sections[i]).get()
			.then(doc => {
				const data = doc.data(); //retrieves all the sections as 'objects'
				// console.log(subject, lesson, data);
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


// function writeUserData(first_name, last_name, email, password, birthday, imageUrl, realtime_db) {
// //using email as tree structure for users because its a very unique identifier
// //realtime_db = firebase.database();
// 	realtime_db.ref('users/' + first_name + "-" + last_name).set({
// 		first_name: first_name,
// 		last_name: last_name,
// 		email: email,
// 		password: password,
// 		birthday: birthday,
// 		profile_picture : imageUrl
// 	});
// }
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

//Blog list and grid view
// Get the elements with class="column"
var elements = document.getElementsByClassName("column");

// List View
function listView() {
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.width = "70%";
  }
}

// Grid View
function gridView() {
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.width = "33.33%";
  }
}

let blogsArray = {};
const createBlogs = $(function() {
    var mediumPromise = new Promise(function (resolve) {
    var $content = $('#jsonContent');
    var data = {
        rss: 'https://medium.com/feed/@blueprint-magnify'
    };
    $.get('  https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40blueprint-magnify', data, function (response) {
        if (response.status == 'ok') {
            $("#logo").append(`<img src="${response.feed["image"]}" class="rounded mx-auto d-block">`)
            var display = '';

            $.each(response.items, function (k, item) {
				console.log(k);
				blogsObj[k].title = item.title;
				display +=`<div class = "column" style = "padding:2% 2.31% 0% 0%; width: 70%; margin-left: auto; margin-right: auto;">`;
                display += `<div class="card h-100 mb-3 mx-auto mr-5">`;
                var src = item["thumbnail"]; // use thumbnail url
                display += `<a href = "${item.link}"><img src="${src}" class="blog-img-hover card-img-top" alt="Cover image">`;
                display += `<div class="card-body">`;
                display += `<h4 class="card-title"><a href="${item.link}" target="_blank">${item.title}</a></h4>`;
                var yourString = item.description.replace(/<img[^>]*>/g,""); //replace with your string.
                yourString = yourString.replace('h4', 'p');
                yourString = yourString.replace('h3', 'p');
                var maxLength = 190; // maximum number of characters to extract
                //trim the string to the maximum length
                var trimmedString = yourString.substr(0, maxLength);
                //re-trim if we are in the middle of a word
                trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
                display += `<p class="card-text">${trimmedString}...</p>`;

				// display+= `<div class = "card-footer">`;
                // display += `<a href="${item.link}" target="_blank" type="button" class="card-footer yellow-btn" style = "bottom:0;">Read More</a>`;
                display += `</div></div></div>`;
				// blogsObj[k].display = display;
				blogsArray += display;
				// console.log(blogsArray);

                return k < 10;
            });
			// display+= `</center>`;
            resolve($content.html(display));
        }
    });
	});

	mediumPromise.then(function()
    {
        //Pagination
        pageSize = 10;

        var pageCount = $(".card").length / pageSize;

        for (var i = 0; i < pageCount; i++) {
            $("#pagin").append(`<li class="page-item"><a class="page-link" href="#">${(i + 1)}</a></li>`);
        }
        $("#pagin li:nth-child(1)").addClass("active");
        showPage = function (page) {
            $(".card").hide();
            $(".card").each(function (n) {
                if (n >= pageSize * (page - 1) && n < pageSize * page)
                    $(this).show();
            });
        }

        showPage(1);

        $("#pagin li").click(function () {
            $("#pagin li").removeClass("active");
            $(this).addClass("active");
            showPage(parseInt($(this).text()))
            return false;
        });
    });
});

let blogsObj = [
	{
		title: "Cynthia Fayssal: A New Era of Cancer Treatment",
		topic: "tech"
	},
	{
		title: "Bhavya Bansal: Investigating the Willingness to Take a Rapid COVID-19 Test",
		topic: "bio"
	},
	{
		title: "Juliet Amadi: Race for a Cure",
		topic: "chem"
	},
	{
		title: "Kaitlyn Leitherer: How to Save the Bay",
		topic: "tech"
	},
	{
		title: "A Closer Look: Gonzalez",
		topic: "tech"
	},
	{
		title: "A Closer Look: Bianca",
		topic: "chem"
	},
	{
		title: "A Closer Look: Audrey",
		topic: "bio"
	},
	{
		title: "A Closer Look: April",
		topic: "bio"
	},
	{
		title: "A Closer Look: Sakshi",
		topic: "chem"
	},
	{
		title: "A Closer Look: Gina",
		topic: "phys"
	}
];

const category = document.getElementById("article-topic");
const blog = document.getElementById("jsonContent");
// const blog = document.querySelectorAll("div.card");
const drop = document.getElementById("posts");
const testing = document.getElementsByClassName("column");

hide = () => {
  const posts = blog.querySelectorAll("div.column");
  [...posts].map(post => {
    post.style.display = "none";
  });
}

unhide = () => {
  const posts = blog.querySelectorAll("div.column");
  [...posts].map(post => {
    post.style.display = "block";
  });
}

//select Team
function select(topic) {
	category.textContent = topic;
}

filterPost = (topic) => {
	const posts = document.querySelectorAll("div.column");
    const displayPosts = [];
    [...posts].map(post => {
      const title = post.querySelector("h4.card-title").textContent;
      blogsObj.forEach(blog => {
          if(title == blog.title && blog.topic == topic) {
            // make all non-tech posts invisible!
            post.style.display = "block";
          }
        })
    });
}
