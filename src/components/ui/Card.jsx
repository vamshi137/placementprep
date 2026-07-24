export default function Card({ children, className = '', as: Tag = 'div', ...props }) {
  return (
    <Tag
      className={`bg-surface dark:bg-surface-dark rounded-xl2 shadow-card dark:shadow-card-dark ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
