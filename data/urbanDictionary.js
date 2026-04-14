// Urban Dictionary API lookup for new/unknown slang terms
// Uses the free unofficial Urban Dictionary API

const UD_API = "https://api.urbandictionary.com/v0/define";

/**
 * Look up a slang term on Urban Dictionary.
 * Returns the top definition or null if not found.
 */
export async function lookupSlang(term) {
  try {
    const res = await fetch(`${UD_API}?term=${encodeURIComponent(term)}`, {
      timeout: 8000,
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.list || data.list.length === 0) return null;

    // Get the top-voted definition
    const top = data.list.sort((a, b) => b.thumbs_up - a.thumbs_up)[0];
    return {
      term: top.word,
      definition: top.definition.replace(/\[|\]/g, ""), // strip UD bracket links
      example: top.example.replace(/\[|\]/g, ""),
      thumbsUp: top.thumbs_up,
      thumbsDown: top.thumbs_down,
      author: top.author,
    };
  } catch (e) {
    console.warn("Urban Dictionary lookup failed:", e);
    return null;
  }
}

/**
 * Search Urban Dictionary for trending/random terms.
 * Returns an array of term objects.
 */
export async function getRandomTerms(count = 5) {
  try {
    const res = await fetch("https://api.urbandictionary.com/v0/random");
    if (!res.ok) return [];
    const data = await res.json();
    return data.list.slice(0, count).map((item) => ({
      term: item.word,
      definition: item.definition.replace(/\[|\]/g, ""),
      example: item.example.replace(/\[|\]/g, ""),
      thumbsUp: item.thumbs_up,
    }));
  } catch (e) {
    console.warn("Urban Dictionary random fetch failed:", e);
    return [];
  }
}
