export async function decorate(block) {
  // Get form URL or use default
  const formAnchor = block.querySelector('a[href$=".json"]');
  const formURL =
    formAnchor?.href ||
    "https://main--capstone--sai-teja-sagari.aem.page/registration-form.json";
 
  // Fetch form data
  async function fetchFormData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`Failed to fetch form: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching form data:", error);
      return null;
    }
  }
 
  // Component factory functions
  const fieldComponents = {
    select: (fd) => {
      const select = document.createElement("select");
      select.id = fd.Field;
 
      if (fd.Placeholder) {
        const placeholder = document.createElement("option");
        placeholder.textContent = fd.Placeholder;
        placeholder.value = "";
        placeholder.selected = true;
        placeholder.disabled = true;
        select.append(placeholder);
      }
 
      fd.Options.split(",")
        .map((option) => option.trim())
        .forEach((option) => {
          const optionElement = document.createElement("option");
          optionElement.textContent = option;
          optionElement.value = option;
          select.append(optionElement);
        });
 
      if (fd.Mandatory === "true") select.required = true;
      return select;
    },
 
    input: (fd) => {
      const input = document.createElement("input");
      input.type = fd.Type;
      input.id = fd.Field;
      input.placeholder = fd.Placeholder || "";
      if (fd.Mandatory === "true") input.required = true;
      return input;
    },
 
    "text-area": (fd) => {
      const textarea = document.createElement("textarea");
      textarea.id = fd.Field;
      textarea.placeholder = fd.Placeholder || "";
      if (fd.Mandatory === "true") textarea.required = true;
      return textarea;
    },
 
    label: (fd) => {
      const label = document.createElement("label");
      label.htmlFor = fd.Field;
      label.textContent = fd.Label;
      if (fd.Mandatory === "true") label.classList.add("required");
      return label;
    },
 
    submit: (fd) => {
      const buttonContainer = document.createElement("p");
      buttonContainer.classList.add("button-container");
 
      const horizontalLine = document.createElement("hr");
      const italics = document.createElement("em");
      const button = document.createElement("button");
      button.textContent = fd.Label;
      button.classList.add("button", "secondary");
 
      italics.append(button);
      buttonContainer.append(italics, horizontalLine);
      return buttonContainer;
    },
 
    plaintext: (fd) => {
      const heading = document.createElement("h4");
      heading.textContent = fd.Label;
      return heading;
    },
  };
 
  // Create form field based on field type
  function createFormField(fd) {
    const fieldWrapper = document.createElement("div");
    fieldWrapper.className = "field-wrapper";
 
    switch (fd.Type) {
      case "select":
        fieldWrapper.append(
          fieldComponents.label(fd),
          fieldComponents.select(fd)
        );
        break;
      case "text-area":
        fieldWrapper.append(
          fieldComponents.label(fd),
          fieldComponents["text-area"](fd)
        );
        break;
      case "checkbox":
        fieldWrapper.append(
          fieldComponents.input(fd),
          fieldComponents.label(fd)
        );
        break;
      case "plaintext":
        fieldWrapper.append(fieldComponents.plaintext(fd));
        break;
      case "submit":
        fieldWrapper.append(fieldComponents.submit(fd));
        break;
      default:
        fieldWrapper.append(
          fieldComponents.label(fd),
          fieldComponents.input(fd)
        );
    }
 
    return fieldWrapper;
  }
 
  // Create form from JSON data
  function createForm(jsonData) {
    const form = document.createElement("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // Add form submission logic here
      console.log("Form submitted");
    });
 
    jsonData.data.forEach((fieldData) => {
      form.append(createFormField(fieldData));
    });
 
    return form;
  }
 
  // Main execution
  const jsonData = await fetchFormData(formURL);
 
  block.innerHTML = "";
  if (jsonData) {
    block.appendChild(createForm(jsonData));
  } else {
    block.innerHTML = "<p>Error loading form data. Please try again later.</p>";
  }
}
 
export default decorate;