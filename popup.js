document.addEventListener('DOMContentLoaded', () => {
  const listContainer = document.getElementById('animations-list');
  const openViewerButton = document.getElementById('open-viewer');

  // List available .glb files
  const animations = ['able.glb', 'above.glb', 'absent.glb', 'accept.glb', 'access.glb', 'action.glb', 'add.glb', 'after.glb', 'better.glb', 'big.glb', 'bill.glb', 'bite.glb', 'boy.glb', 'brain.glb', 'break.glb', 'breakfast.glb', 'deaf.glb', 'devil.glb', 'different.glb', 'director.glb', 'energy.glb', 'english.glb', 'environment.glb', 'event.glb', 'funny.glb', 'future.glb', 'get.glb', 'give.glb', 'go.glb', 'house.glb', 'icecream.glb', 'join.glb', 'know.glb', 'knowledge.glb', 'last.glb', 'let down.glb', 'never.glb', 'new.glb', 'next.glb', 'nice to meet you.glb', 'other.glb', 'our.glb', 'part.glb', 'past.glb', 'see.glb', 'shallow.glb', 'share.glb', 'up.glb', 'yaer.glb', 'you.glb']
  animations.forEach((file) => {
    const item = document.createElement('div');
    item.innerText = file;
    item.dataset.file = file;
    item.className = 'animation-item';
    listContainer.appendChild(item);
  });

  // Open viewer with selected animation
  openViewerButton.addEventListener('click', () => {
    const selected = document.querySelector('.animation-item.selected');
    if (selected) {
      const file = selected.dataset.file;
      window.open(`viewer.html?file=${file}`, '_blank');
    } else {
      alert('Please select an animation.');
    }
  });

  // Highlight selected animation
  listContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('animation-item')) {
      document.querySelectorAll('.animation-item').forEach(item => item.classList.remove('selected'));
      e.target.classList.add('selected');
    }
  });
});
