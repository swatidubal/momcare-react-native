
export const selfCareTips = [
  "Drink a full glass of water — right now, before anything else.",
  "It's okay to put the baby down safely and take 5 minutes for yourself.",
  "You don't have to finish the to-do list today.",
  "Ask for help. Needing support doesn't mean you're failing.",
  "Step outside for two minutes of fresh air, even just on a balcony.",
  "Your body just did something incredible. Be gentle with it.",
  "Nap when you can — sleep debt is real and it's okay to rest.",
  "Eat something nourishing, even if it's simple.",
  "Text one person who makes you feel supported.",
  "Feelings of doubt don't mean you're a bad mom. They mean you're human.",
  "You're doing better than you think you are.",
];

export function randomTip() {
  return selfCareTips[Math.floor(Math.random() * selfCareTips.length)];
}
