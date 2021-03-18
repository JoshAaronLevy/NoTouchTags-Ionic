export function storeTag(tag: any) {
  if (tag.attributes) {
    tag = { id: tag.id, ...tag.attributes };
  } else {
    tag = { ...tag };
  }
  localStorage.setItem('id', tag.id);
}

export function getStoredTag() {
  return {
    id: localStorage.getItem('id')
  };
}

export function clearTag() {
  localStorage.clear();
}
