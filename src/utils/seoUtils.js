export function updatePageSeo(title, description) {
  if (title) {
    document.title = `${title} | Hindu Panchang Calendar`;
  } else {
    document.title = 'Panchang Calendar – Daily Hindu Panchang & Festival Calendar';
  }

  if (description) {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
  }
}
