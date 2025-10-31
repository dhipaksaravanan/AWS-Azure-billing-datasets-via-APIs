// NOTE: Replace mock data with actual API calls using AWS or Azure SDKs.

const fetchButton = document.getElementById("fetchData");
const providerSelect = document.getElementById("provider");
const summary = document.getElementById("summary");
const ctx = document.getElementById("billingChart").getContext("2d");

let chart;

fetchButton.addEventListener("click", async () => {
  const provider = providerSelect.value;
  summary.innerHTML = "Loading billing data...";

  // Mock data (replace this with actual API data)
  const data = await getBillingData(provider);

  summary.innerHTML = `Total Cost for ${provider.toUpperCase()}: $${data.total.toFixed(2)}`;

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.services.map((s) => s.name),
      datasets: [
        {
          label: "Cost (USD)",
          data: data.services.map((s) => s.cost),
          backgroundColor: "#0078d4aa",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: true, text: `${provider.toUpperCase()} Billing by Service` },
      },
    },
  });
});

// Mock function for demo purposes
async function getBillingData(provider) {
  // Replace with API calls to AWS Cost Explorer or Azure Billing API
  if (provider === "aws") {
    return {
      total: 120.5,
      services: [
        { name: "EC2", cost: 45.3 },
        { name: "S3", cost: 20.1 },
        { name: "RDS", cost: 30.0 },
        { name: "Lambda", cost: 25.1 },
      ],
    };
  } else {
    return {
      total: 98.7,
      services: [
        { name: "Virtual Machines", cost: 40.2 },
        { name: "Blob Storage", cost: 22.5 },
        { name: "SQL Database", cost: 15.0 },
        { name: "Functions", cost: 21.0 },
      ],
    };
  }
}
