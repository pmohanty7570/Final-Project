# FoodFit

FoodFit is a food-analysis website that helps users understand how a packaged food fits their personal health goals.

## Purpose

Many people receive confusing nutrition advice from different sources. FoodFit helps users focus on their own goals by looking at a food's nutrition facts, macro ratio, and ingredients.

## Features

- Users can choose a weight goal:
  - Lose weight
  - Maintain weight
  - Gain weight

- Users can choose nutrition priorities:
  - Build muscle
  - Control sugar
  - Prefer simple ingredients

- FoodFit gives each food a personalized score out of 100.

- FoodFit shows:
  - Calories
  - Protein
  - Carbohydrates
  - Fat
  - Sugar
  - Sodium
  - Macro ratio
  - Ingredients
  - Ingredient warnings
  - Reasons for the food score

## Barcode Feature

The original FoodFit design included barcode scanning. Users could:

- Scan a barcode with a camera
- Upload a barcode image
- Type a barcode number manually

The barcode would be used to find food nutrition facts and ingredients from an online food database.

## Demo Version

The current version uses demo food products instead of an online API. This makes the project reliable for testing and presentations, even when an external food database is unavailable.

Demo products include:

- Protein Bar
- Frosted Cereal
- Greek Yogurt
- Peanut Butter

## How the Score Works

Each food starts with a score of 50 out of 100.

FoodFit adds or removes points based on the user's selected goals.

Examples:

- Foods with high protein receive more points for a build-muscle goal.
- Foods with low sugar receive more points for a control-sugar goal.
- Foods with high sugar lose points for a control-sugar goal.
- Foods with artificial sweeteners or preservatives can lose points when simple ingredients are selected.
- Foods with protein and lower calories can receive points for a weight-loss goal.
- Foods with more calories can receive points for a weight-gain goal.

## Macro Ratio

FoodFit calculates the percentage of calories from protein, carbohydrates, and fat.

- Protein has 4 calories per gram.
- Carbohydrates have 4 calories per gram.
- Fat has 9 calories per gram.

## Files

```text
index.html
style.css
app.js
foodfit-goal-guide.png
```

## How to Run

1. Download or copy all project files into one folder.
2. Open the folder in Visual Studio Code.
3. Right-click `index.html`.
4. Select **Open with Live Server**.
5. Choose a demo food and click **Analyze Food**.

## Future Improvements

- Reconnect a reliable food database API.
- Bring back live camera barcode scanning.
- Add more food products.
- Let users save their goals and food results.
- Add allergy and dietary preference filters.

## Disclaimer

FoodFit is a school demonstration project. It provides general nutrition information and is not medical advice.
