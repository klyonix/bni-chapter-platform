import { CategoryIcon } from '@/components/team/CategoryIcon';
import { professionIcon, professionLabel, type ProfessionSlug } from '@/data/professions';
import { themeFor } from '@/components/premium-card/categoryThemes';
import { cn } from '@/utils/cn';

/**
 * The trade, as a themed pill.
 *
 * `accentSoft` fills it and `accent` carries the text: the accents are AA as
 * text on white but not as a background behind white text, so a filled pill in
 * the full accent would be unreadable. Tint behind, accent on top.
 *
 * Not a client component and no idle motion — this is the still version for
 * pages. The card's animated glyph is AnimatedIcon.
 */
export function CategoryBadge({
  profession,
  className,
}: {
  profession: ProfessionSlug;
  className?: string;
}) {
  const theme = themeFor(profession);
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-micro uppercase',
        className,
      )}
      style={{ backgroundColor: theme.accentSoft, color: theme.accent }}
    >
      <CategoryIcon name={professionIcon(profession)} className="h-3.5 w-3.5 shrink-0" />
      {professionLabel(profession)}
    </span>
  );
}
