const foods = {
  bar: {
    name: "Demo Protein Bar",
    brand: "FoodFit Sample Foods",
    calories: 220,
    protein: 20,
    carbs: 22,
    fat: 8,
    sugar: 2,
    sodium: 190,
    ingredients: "Whey protein isolate, peanut butter, soluble corn fiber, chocolate coating, sucralose"
  },

  cereal: {
    name: "Demo Frosted Cereal",
    brand: "FoodFit Sample Foods",
    calories: 160,
    protein: 2,
    carbs: 37,
    fat: 1,
    sugar: 14,
    sodium: 210,
    ingredients: "Milled corn, sugar, corn syrup, salt, artificial flavor"
  },

  yogurt: {
    name: "Demo Greek Yogurt",
    brand: "FoodFit Sample Foods",
    calories: 130,
    protein: 15,
    carbs: 9,
    fat: 3,
    sugar: 7,
    sodium: 65,
    ingredients: "Cultured nonfat milk, milk protein concentrate, cane sugar, fruit puree, live active cultures"
  },

  pb: {
    name: "Demo Peanut Butter",
    brand: "FoodFit Sample Foods",
    calories: 190,
    protein: 8,
    carbs: 7,
    fat: 16,
    sugar: 3,
    sodium: 140,
    ingredients: "Roasted peanuts, sugar, hydrogenated vegetable oil, salt"
  }
};

const $ = (id) => document.getElementById(id);

function boxes(items) {
  return items.map(item =>
    `<div class="box"><strong>${item[0]}</strong><br>${item[1]}</div>`
  ).join("");
}

$("analyze").onclick = () => {
  const food = foods[$("food").value];

  if (!food) {
    $("message").textContent = "Choose a demo product first.";
    return;
  }

  const goal = document.querySelector('input[name="goal"]:checked').value;
  const muscle = $("muscle").checked;
  const sugarGoal = $("sugarGoal").checked;
  const simple = $("simple").checked;
  const ingredientText = food.ingredients.toLowerCase();

  let score = 50;
  const reasons = [];
  const warnings = [];

  if (muscle) {
    if (food.protein >= 20) {
      score += 20;
      reasons.push("Has 20g or more of protein.");
    } else if (food.protein >= 10) {
      score += 10;
      reasons.push("Has a moderate amount of protein.");
    } else {
      score -= 10;
      reasons.push("Has lower protein for a muscle-building goal.");
    }
  }

  if (sugarGoal) {
    if (food.sugar <= 5) {
      score += 15;
      reasons.push("Has lower sugar.");
    } else if (food.sugar >= 12) {
      score -= 20;
      reasons.push("Has higher sugar.");
      warnings.push("Higher sugar conflicts with your control-sugar goal.");
    }
  }

  if (simple && /sucralose|aspartame|acesulfame/.test(ingredientText)) {
    score -= 12;
    reasons.push("Contains an artificial sweetener.");
    warnings.push("Artificial sweetener found.");
  }

  if (simple && /sodium benzoate|potassium sorbate|\bbha\b|\bbht\b/.test(ingredientText)) {
    score -= 10;
    reasons.push("Contains a preservative.");
    warnings.push("Preservative found.");
  }

  if (goal === "lose" && food.calories <= 250 && food.protein >= 10) {
    score += 10;
    reasons.push("Provides protein without high calories.");
  }

  if (goal === "gain" && food.calories >= 180) {
    score += 8;
    reasons.push("Provides calories that may support weight gain.");
  }

  score = Math.max(0, Math.min(100, score));

  const proteinCalories = food.protein * 4;
  const carbCalories = food.carbs * 4;
  const fatCalories = food.fat * 9;
  const totalMacroCalories = proteinCalories + carbCalories + fatCalories;

  const proteinPercent = Math.round(proteinCalories / totalMacroCalories * 100);
  const carbPercent = Math.round(carbCalories / totalMacroCalories * 100);
  const fatPercent = Math.round(fatCalories / totalMacroCalories * 100);

  let scoreText = "Less aligned with your goals";

  if (score >= 80) {
    scoreText = "Good fit for your goals";
  } else if (score >= 50) {
    scoreText = "Partial fit for your goals";
  }

  $("name").textContent = food.name;
  $("brand").textContent = food.brand;
  $("score").textContent = `${score}/100`;
  $("scoreText").textContent = scoreText;

  $("nutrition").innerHTML = boxes([
    ["Calories", food.calories],
    ["Protein", `${food.protein}g`],
    ["Carbohydrates", `${food.carbs}g`],
    ["Fat", `${food.fat}g`],
    ["Sugar", `${food.sugar}g`],
    ["Sodium", `${food.sodium}mg`]
  ]);

  $("macros").innerHTML = boxes([
    ["Protein", `${proteinPercent}%`],
    ["Carbohydrates", `${carbPercent}%`],
    ["Fat", `${fatPercent}%`]
  ]);

  $("reasons").innerHTML = reasons.length
    ? reasons.map(reason => `<li>${reason}</li>`).join("")
    : "<li>This score uses your selected goals.</li>";

  $("warnings").innerHTML = warnings.length
    ? warnings.map(warning => `<li class="warning">${warning}</li>`).join("")
    : "<li>No ingredient conflicts were found.</li>";

  $("ingredients").textContent = food.ingredients;
  $("message").textContent = "Demo product analyzed.";
  $("result").hidden = false;
};