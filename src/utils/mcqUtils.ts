import { McqQuestion } from '../types/question';

/**
 * Shuffles MCQ options randomly so the correct answer is uniformly distributed
 * among 'a', 'b', 'c', and 'd' (approx 25% chance for each option letter).
 * Fixes the issue where option A was predictably the answer.
 */
export function shuffleMcqOptions(q: McqQuestion): McqQuestion {
  if (!q.options || q.options.length < 2) return q;

  const correctOption = q.options.find(o => o.id === q.correctOptionId);
  if (!correctOption) return q;

  // Clone and shuffle options array
  const shuffled = [...q.options];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const letters = ['a', 'b', 'c', 'd', 'e', 'f'];
  let newCorrectId = 'a';

  const remappedOptions = shuffled.map((opt, idx) => {
    const newId = letters[idx] || String(idx);
    if (opt.id === q.correctOptionId || opt.text === correctOption.text) {
      newCorrectId = newId;
    }
    return {
      id: newId,
      text: opt.text
    };
  });

  return {
    ...q,
    options: remappedOptions,
    correctOptionId: newCorrectId
  };
}
