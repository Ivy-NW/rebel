import { GoogleGenerativeAI } from "@google/generative-ai";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js"; // Convert MarkDown to HTML

const API_KEY = "AIzaSyBhP9E-uAJ64ARJWF1LASgjWYeoR6Lsd58";

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

const display_div = document.querySelector('.display'); // div of Class display

// For the text-only input
async function run_text() {

  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = document.getElementById("query").value;  // To get the value from the input tag
  
  const display = document.getElementById("display");
  display.append('Q. ' + prompt + '\n\n');  // To display the question
  

  const div_loader = document.createElement("div"); // Loading Spinner
  div_loader.classList.add("spinner");
  display.appendChild(div_loader);
  
  display_div.scrollTop = display_div.scrollHeight;  // Scroll Down

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  display.removeChild(div_loader); // Remove the loader

  const html = marked.parse(text);  // To convert the markdown 
  display.innerHTML += (html + '\n\n');  // Display the answer

  hljs.highlightAll();  // To highlight the code blocks

  display_div.scrollTop = display_div.scrollHeight;  // Scroll-down automatically

}


// Converts a File object to a GoogleGenerativeAI.Part object.
async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}

// For the image only input
async function run_image() {
  // For text-and-images input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = document.getElementById("query").value;  // To get the value from the input tag

  const display = document.getElementById("display");
  display.append('Q. ' + prompt + '\n\n');  // To display the question

  const div_loader = document.createElement("div"); // Loading Spinner
  div_loader.classList.add("spinner");
  display.appendChild(div_loader);
  
  display_div.scrollTop = display_div.scrollHeight;  // Scroll-down automatically

  const fileInputEl = document.querySelector("input[type=file]");  // To select the image
  const imageParts = await Promise.all(
    [...fileInputEl.files].map(fileToGenerativePart)
  );

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();

  display.removeChild(div_loader); // Remove the loader

  const html = marked.parse(text);  // To convert the markdown 
  document.getElementById("display").innerHTML += (html + '\n\n');  // Display the answer

  hljs.highlightAll();  // To highlight the code blocks

  display_div.scrollTop = display_div.scrollHeight;  // Scroll-down automatically
}


// Added EventListener to the button
const send_button = document.getElementById('send-button');
send_button.addEventListener("click", () => {

  const file = document.getElementById('upload-image');  // Selecting the value of input of type file

  if (file.value){
    run_image();  // Run the function which handle image
    file.value = '';  // To reset the file selected
    console.log("Image function run");
  }
  else{
    run_text();  // Run the text-only function
    console.log("Text function run");
  }
  document.getElementById('query').value = '';  // To clear the input
})


// Added EventListener --> When Press Enter it gets executed
const input = document.getElementById('query');
input.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    event.preventDefault();  // Prevent the Default action
    send_button.click();  // Send the control to the send-button
  }
})
