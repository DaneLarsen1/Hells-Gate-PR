async function newFormHandler(event) {
   event.preventDefault();

   const title = document.querySelector("#lift-title").value;
   const liftWeight = document.querySelector("#lift-weight").value;
   const liftUnit = document.querySelector("#unit").value;

   const description = {
      weight: liftWeight,
      unit: liftUnit,
   };

   const response = await fetch("/api/lift/userLifts", {
      method: "POST",
      body: JSON.stringify({
         title,
         description,
      }),
      headers: {
         "Content-Type": "application/json",
      },
   });

   if (response.ok) {
      document.location.replace("/dashboard");
   } else {
      alert(response.statusText);
   }
}

document.querySelector(".new-lift-form").addEventListener("submit", newFormHandler);
