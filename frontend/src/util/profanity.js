import leoProfanity from 'leo-profanity';
import russianWords from '../../src/assets/russian-profanity-list.json';

leoProfanity.loadDictionary();
leoProfanity.add(russianWords);

export default leoProfanity;