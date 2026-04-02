import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb =({ items }: BreadcrumbProps)=> {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1.5 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <FiChevronRight className="h-3.5 w-3.5 text-text-secondary/50" />
              )}
              {isLast || !item.href ? (
                <span className="font-medium text-text-primary line-clamp-1">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-text-secondary transition-colors hover:text-brand"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
export default Breadcrumb
