# Demo sandbox

Open [the demo](/demo) or add `/demo` to the product URL. The landing-page action **Try it with sample data** opens the same route in one click.

The sample is a 20-minute **Shape machine** activity for two teams. It immediately renders one facilitation guide, one challenge sheet, ten role cards, and twenty instruction cards.

While the persistent **Demo — sample data, nothing is saved to your real kit** banner is shown, changes use the `demo:classroom-algorithm-cards:settings` browser-storage key. Normal kit settings use `real:classroom-algorithm-cards:settings`. Demo code never reads or writes the real key. **Reset demo** restores the shipped sample; **Start for real** discards the demo key and returns to normal settings.

The service worker caches the application shell after the first visit. The `/demo` route is therefore also the entry point for the offline claim test.
