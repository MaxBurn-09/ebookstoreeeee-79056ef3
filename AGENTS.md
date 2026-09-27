<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the order-placement server function disabled until a payment provider callback verifies a captured charge; otherwise unpaid orders can unlock private ebooks.
- Calculate bundle comparisons from current individual book prices, not inflated crossed-out historical prices; this keeps the displayed savings equal to the cart discount.
- Render scroll reveals visibly by default and animate only after intersection; this keeps content accessible before hydration and avoids blank sections.
- Keep the store context/hook separate from StoreProvider; React Fast Refresh otherwise invalidates the provider and can render the header against a different context instance during edits.
- Keep the seller chat session-only and route model calls through the server streaming endpoint; visitors chose no saved history and secrets must stay server-side.
