import css from './LayoutNotes.module.css';

interface FilterSidebarProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function FilterSidebar({
  children,
  sidebar,
}: FilterSidebarProps) {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
}
