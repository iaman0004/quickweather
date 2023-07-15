export default function ToggleComponent({ config = [], toggleHandler }) {
  const changeActive = toggle => {
    toggleHandler(toggle);
    config.forEach(t_item => {
      t_item.active = t_item._id === toggle._id ? true : false;
    })
  }

  return (
    <div className="toggle-component">
      <div className="toggle-wrapper">
        {config.map(item => (
          <div key={item._id} className={`toggle-item ${item.active ? 'active' : ''}`} onClick={() => changeActive(item)}>{ item.label }</div>
        ))}
      </div>
    </div>
  );
}