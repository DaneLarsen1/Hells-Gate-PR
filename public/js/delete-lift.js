async function deleteFormHandler(event) {
   event.preventDefault();

   const id = window.location.toString().split("/")[window.location.toString().split("/").length - 1];
   const response = await fetch(`/api/lift/userLifts/${id}`, {
      //* same question, should this be lifts or posts??
      method: "DELETE",
   });

   if (response.ok) {
      document.location.replace("/dashboard/");
   } else {
      alert(response.statusText);
   }
}

document.querySelector(".delete-lift-btn").addEventListener("click", deleteFormHandler);
