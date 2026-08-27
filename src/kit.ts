export type Minutes = 20 | 30 | 40;
export type ThemeId = 'robot-rescue' | 'backpack-check' | 'shape-machine';

export interface KitSettings {
  minutes: Minutes;
  teams: number;
  theme: ThemeId;
  inkSaver: boolean;
}

export interface Role {
  icon: string;
  title: string;
  action: string;
  cue: string;
}

export interface Challenge {
  title: string;
  goal: string;
  rules: string[];
  nudge: string;
}

export interface Theme {
  id: ThemeId;
  eyebrow: string;
  title: string;
  summary: string;
  prop: string;
  safety: string;
  commands: string[];
  challenges: Challenge[];
}

export const roles: Role[] = [
  { icon: '◎', title: 'Robot', action: 'Follow only the cards you are given.', cue: 'Say: “I need one exact step.”' },
  { icon: '↗', title: 'Sequencer', action: 'Choose and arrange the instruction cards.', cue: 'Point to the current card.' },
  { icon: '⊘', title: 'Debugger', action: 'Spot the first surprise and suggest one change.', cue: 'Say what you expected first.' },
  { icon: '□', title: 'Card keeper', action: 'Keep unused cards visible and return used cards.', cue: 'Do not hide possible choices.' },
  { icon: '✦', title: 'Reporter', action: 'Share the team’s route and one useful mistake.', cue: 'Different working routes count.' },
];

export const themes: Record<ThemeId, Theme> = {
  'robot-rescue': {
    id: 'robot-rescue',
    eyebrow: 'Move & map',
    title: 'Robot rescue',
    summary: 'Guide a careful classroom robot to a stranded battery tile.',
    prop: 'Place four scrap-paper squares as obstacles and one yellow square as the battery.',
    safety: 'Walking only. Clear bags and chairs from the route; the robot freezes if space feels unsafe.',
    commands: ['START', 'STEP FORWARD', 'STEP FORWARD', 'STEP FORWARD', 'TURN LEFT', 'TURN LEFT', 'TURN RIGHT', 'TURN RIGHT', 'PICK UP', 'END'],
    challenges: [
      { title: 'Straight shot', goal: 'Reach a battery three steps away.', rules: ['Use START and END.', 'Robot faces the battery.', 'Fewest cards wins only after every route works.'], nudge: 'Ask: Which card tells the robot when to stop?' },
      { title: 'Around the chair', goal: 'Reach the battery without touching one obstacle.', rules: ['Include at least one turn.', 'Do not move the obstacle.', 'Two different working routes may both be right.'], nudge: 'Run one card at a time. Where did the result first differ from the plan?' },
      { title: 'Mystery bug', goal: 'Repair a route after the teacher swaps one card.', rules: ['Debugger may change one card first.', 'Test from START after each change.', 'Name the first unexpected result.'], nudge: 'A bug is a clue, not a person’s fault.' },
    ],
  },
  'backpack-check': {
    id: 'backpack-check',
    eyebrow: 'Everyday logic',
    title: 'Backpack check',
    summary: 'Turn a familiar pack-up routine into instructions another person can test.',
    prop: 'Use a backpack or paper bag plus three safe classroom objects. No personal belongings required.',
    safety: 'Use only light, unbreakable classroom items. Keep food, medicine, and student property out of the activity.',
    commands: ['START', 'OPEN BAG', 'CHECK ITEM', 'PICK UP', 'PUT INSIDE', 'PUT INSIDE', 'REMOVE ITEM', 'CLOSE BAG', 'CHECK AGAIN', 'END'],
    challenges: [
      { title: 'Pack three', goal: 'Put three named classroom objects in the bag.', rules: ['Use START and END.', 'The bag begins closed.', 'Another student must be able to follow it silently.'], nudge: 'What must happen before PUT INSIDE can work?' },
      { title: 'Wrong object', goal: 'Prevent an unneeded object from staying in the bag.', rules: ['Include a check.', 'Do not name a classmate’s belongings.', 'More than one safe order may work.'], nudge: 'Could checking earlier reduce the number of steps?' },
      { title: 'Missing step', goal: 'Repair a sequence after the teacher removes one card.', rules: ['Predict the result before testing.', 'Change one place at a time.', 'Explain why the repaired version works.'], nudge: 'Find the first card the robot cannot complete.' },
    ],
  },
  'shape-machine': {
    id: 'shape-machine',
    eyebrow: 'Tabletop puzzle',
    title: 'Shape machine',
    summary: 'Transform paper shapes by following a precise card sequence.',
    prop: 'Cut or draw one paper circle, square, and triangle per team; add two pencils.',
    safety: 'Prepare shapes before class if scissors are not already part of your classroom routine.',
    commands: ['START', 'CHOOSE SHAPE', 'MOVE LEFT', 'MOVE RIGHT', 'TURN OVER', 'STACK', 'SEPARATE', 'DRAW A DOT', 'CHECK', 'END'],
    challenges: [
      { title: 'Dot on top', goal: 'Finish with the dotted circle on top of the square.', rules: ['Use START and END.', 'Shapes begin side by side.', 'Do not touch shapes without a matching card.'], nudge: 'Which instruction changes a shape, and which changes its place?' },
      { title: 'Hidden triangle', goal: 'Finish with the triangle hidden under exactly one shape.', rules: ['Include STACK.', 'Every shape must be used.', 'Compare two working sequences.'], nudge: 'Ask teams to read the finished stack from top to bottom.' },
      { title: 'Broken machine', goal: 'Find and fix two cards that cannot both be followed.', rules: ['Circle the first impossible step.', 'Move or replace one card.', 'Retest the whole sequence.'], nudge: 'An impossible instruction may need an earlier setup step.' },
    ],
  },
};

export const timingByMinutes: Record<Minutes, Array<[string, string]>> = {
  20: [['2 min', 'Frame'], ['3 min', 'Model'], ['9 min', 'Build + test'], ['4 min', 'Debug'], ['2 min', 'Share']],
  30: [['3 min', 'Frame'], ['4 min', 'Model'], ['13 min', 'Build + test'], ['6 min', 'Debug'], ['4 min', 'Share']],
  40: [['4 min', 'Frame'], ['5 min', 'Model'], ['18 min', 'Build + test'], ['8 min', 'Debug'], ['5 min', 'Share']],
};

export function sanitizeSettings(input: Partial<KitSettings>): KitSettings {
  const minutes: Minutes = input.minutes === 20 || input.minutes === 40 ? input.minutes : 30;
  const teams = Number.isFinite(input.teams) ? Math.min(8, Math.max(1, Math.round(input.teams as number))) : 4;
  const theme = input.theme && input.theme in themes ? input.theme : 'robot-rescue';
  return { minutes, teams, theme, inkSaver: input.inkSaver ?? true };
}

export function challengeCount(minutes: Minutes): number {
  return minutes === 20 ? 1 : minutes === 30 ? 2 : 3;
}

export function sheetCount(settings: KitSettings): number {
  const roleCards = settings.teams * roles.length;
  const commandCards = settings.teams * themes[settings.theme].commands.length;
  return 2 + Math.ceil(roleCards / 6) + Math.ceil(commandCards / 8);
}

export function chunk<T>(items: T[], size: number): T[][] {
  return items.reduce<T[][]>((pages, item, index) => {
    if (index % size === 0) pages.push([]);
    pages.at(-1)?.push(item);
    return pages;
  }, []);
}
