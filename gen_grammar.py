#!/usr/bin/env python3
"""Generate /src/data/grammar/index.ts."""
import json
import os

OUTPUT = '/mnt/e/opencode-test/src/data/grammar/index.ts'

def J(obj):
    return json.dumps(obj, ensure_ascii=False)

def BT(en, km):
    return f'{{ en: {J(en)}, km: {J(km)} }}'

def EX(en, km):
    return f'{{ en: {J(en)}, km: {J(km)} }}'

def makeForm(struct, examples):
    ex_lines = ',\n'.join(f'          {EX(e[0], e[1])}' for e in examples)
    return f'''        {{
          structure: {J(struct)},
          examples: [
{ex_lines}
          ],
        }}'''

def makeMistakes(ms):
    return ',\n'.join(
        f'        {{ mistake: {J(m[0])}, correction: {J(m[1])}, reason: {BT(m[2][0], m[2][1])} }}'
        for m in ms
    )

def makeExercises(exs):
    items = []
    for e in exs:
        opts = ',\n'.join(f'            {BT(o[0], o[1])}' for o in e['opts'])
        items.append(f'''        {{
          id: {J(e['id'])},
          question: {BT(e['q'][0], e['q'][1])},
          type: 'multiple-choice',
          options: [
{opts}
          ],
          correctAnswer: {J(e['ans'])},
          explanation: {BT(e['exp'][0], e['exp'][1])},
        }}''')
    return ',\n'.join(items)

def makeHomework(hw):
    return ',\n'.join(
        f'        {{ id: {J(h[0])}, instruction: {BT(h[1][0], h[1][1])} }}'
        for h in hw
    )

def Lesson(lid, title_en, title_km, level, unit_id, ch_id, order, est,
           def_en, def_km,
           aff_struct, aff_exs,
           neg_struct, neg_exs,
           q_struct, q_exs,
           mistakes, exercises, homework, quiz, vocab_ids):
    forms = f'''      forms: {{
        affirmative: {makeForm(aff_struct, aff_exs)},
        negative: {makeForm(neg_struct, neg_exs)},
        question: {makeForm(q_struct, q_exs)},
      }}'''
    return f'''    {{
      id: {J(lid)},
      title: {BT(title_en, title_km)},
      level: {J(level)},
      unitId: {J(unit_id)},
      chapterId: {J(ch_id)},
      order: {order},
      estimatedMinutes: {est},
      definition: {BT(def_en, def_km)},
      {forms},
      commonMistakes: [
{makeMistakes(mistakes)}
      ],
      exercises: [
{makeExercises(exercises)}
      ],
      homework: [
{makeHomework(homework)}
      ],
      quiz: [
{makeExercises(quiz)}
      ],
      vocabularyIds: {J(vocab_ids)},
    }}'''

def Chapter(cid, title_en, title_km, lessons):
    return f'''    {{
      id: {J(cid)},
      title: {BT(title_en, title_km)},
      lessons: [
{',\n'.join(lessons)}
      ],
    }}'''

def write_file(L1, L2, L3, L4, L5, L6, L7, L8, L9, L10, L11, L12, L13, L14, L15, L16, L17):
    chapters = [
        Chapter('ch-1-job', 'Job', 'ការងារ', [L1]),
        Chapter('ch-2-svo', 'Grammar SVO', 'វេយ្យាករណ៍ SVO', [L2]),
        Chapter('ch-3-present-simple', 'Present Simple', 'បច្ចុប្បន្នកាលធម្មតា', [L3, L4]),
        Chapter('ch-4-parts-of-speech', 'Parts of Speech', 'ផ្នែកនៃការនិយាយ', [L5, L6, L7]),
        Chapter('ch-5-demonstratives', 'Demonstratives', 'សព្វនាមចង្អុល', [L8]),
        Chapter('ch-6-quantifiers', 'Quantifiers', 'បរិមាណន័យ', [L9, L10, L11, L12]),
        Chapter('ch-7-modals', 'Modals & Connectors', 'ពាក្យជំនួយ និង ឈ្នាប់', [L13, L14, L15]),
        Chapter('ch-8-adverbs', 'Adverbs', 'គុណកិរិយា', [L16]),
        Chapter('ch-9-past', 'Past Tense', 'អតីតកាល', [L17]),
    ]

    lines = []
    lines.append("import type { GrammarUnit } from '../../types';")
    lines.append("")
    lines.append("export const grammarUnits: GrammarUnit[] = [")
    lines.append("  {")
    lines.append("    id: 'unit-1',")
    lines.append("    title: { en: 'Job', km: 'ការងារ' },")
    lines.append("    level: 'beginner',")
    lines.append("    order: 1,")
    lines.append("    chapters: [")
    for i, ch in enumerate(chapters):
        lines.append(ch)
        if i < len(chapters) - 1:
            lines[-1] += ','
    lines.append("    ],")
    lines.append("  },")
    lines.append("];")
    lines.append("")

    with open(OUTPUT, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print(f"Written {len(lines)} lines to {OUTPUT}")

# ============================================================
# L1: Job Vocabulary
# ============================================================
L1 = Lesson(
    'job-vocabulary', 'Job Vocabulary', 'វាក្យសព្ទការងារ',
    'beginner', 'unit-1', 'ch-1-job', 1, 10,
    'A job is work that a person does to earn money. Here are 20 common jobs in English with their Khmer translations.',
    'ការងារគឺជាការងារដែលមនុស្សម្នាក់ធ្វើដើម្បីរកលុយ។ នេះគឺជាការងារទូទៅចំនួន ២០ ជាភាសាអង់គ្លេសជាមួយការបកប្រែជាភាសាខ្មែរ។',
    'Subject + am/is/are + a/an + job',
    [('I am a teacher.', 'ខ្ញុំជាគ្រូបង្រៀន។'), ('He is a doctor.', 'គាត់ជាវេជ្ជបណ្ឌិត។'), ('She is a nurse.', 'នាងជាគិលានុបដ្ឋាយិកា។'), ('They are police officers.', 'ពួកគេជាមន្ត្រីនគរបាល។'), ('We are firefighters.', 'ពួកយើងជាអ្នកពន្លត់អគ្គិភ័យ។')],
    'Subject + am/is/are + not + a/an + job',
    [('I am not a chef.', 'ខ្ញុំមិនមែនជាចុងភៅទេ។'), ('He is not a farmer.', 'គាត់មិនមែនជាកសិករទេ។'), ('She is not a driver.', 'នាងមិនមែនជាអ្នកបើកបរទេ។'), ('They are not pilots.', 'ពួកគេមិនមែនជាអ្នកបើកយន្តហោះទេ។'), ('I am not a mechanic.', 'ខ្ញុំមិនមែនជាជាងជួសជុលម៉ាស៊ីនទេ។')],
    'Am/Is/Are + subject + a/an + job?',
    [('Are you a teacher? Yes, I am.', 'តើអ្នកជាគ្រូបង្រៀនទេ? បាទ ខ្ញុំជា។'), ('Is he a doctor? No, he is not.', 'តើគាត់ជាវេជ្ជបណ្ឌិតទេ? ទេ គាត់មិនមែនទេ។'), ('Is she a nurse? Yes, she is.', 'តើនាងជាគិលានុបដ្ឋាយិកាទេ? បាទ នាងជា។'), ('Are they police officers? Yes, they are.', 'តើពួកគេជាមន្ត្រីនគរបាលទេ? បាទ ពួកគេជា។'), ('Are you farmers? No, we are not.', 'តើអ្នកជាកសិករទេ? ទេ ពួកយើងមិនមែនទេ។')],
    [
        ('"I am teacher."', '"I am a teacher."', ('Use "a" or "an" before a singular job noun.', 'ប្រើ "a" ឬ "an" មុខនាមការងារឯកវចនៈ។')),
        ('"He doctor."', '"He is a doctor."', ('Always include the verb "to be" (am/is/are).', 'តែងតែបញ្ចូលកិរិយាស័ព្ទ "to be" (am/is/are)។')),
    ],
    [
        {'id': 'jv-ex-1', 'q': ('Choose the correct job: "A person who teaches students is a ___.', 'ជ្រើសរើសការងារត្រឹមត្រូវ៖ "អ្នកដែលបង្រៀនសិស្សគឺជា ___"'), 'opts': [('Doctor', 'វេជ្ជបណ្ឌិត'), ('Teacher', 'គ្រូបង្រៀន'), ('Driver', 'អ្នកបើកបរ'), ('Chef', 'ចុងភៅ')], 'ans': 'Teacher', 'exp': ('A teacher teaches students in a school.', 'គ្រូបង្រៀនបង្រៀនសិស្សនៅក្នុងសាលា។')},
        {'id': 'jv-ex-2', 'q': ('A person who flies airplanes is a ___.', 'អ្នកដែលបើកយន្តហោះគឺជា ___'), 'opts': [('Driver', 'អ្នកបើកបរ'), ('Pilot', 'អ្នកបើកយន្តហោះ'), ('Mechanic', 'ជាងជួសជុល'), ('Postman', 'អ្នកដឹកសំបុត្រ')], 'ans': 'Pilot', 'exp': ('A pilot flies airplanes.', 'អ្នកបើកយន្តហោះបើកយន្តហោះ។')},
        {'id': 'jv-ex-3', 'q': ('Complete: "She ___ a nurse."', 'បំពេញ៖ "She ___ a nurse."'), 'opts': [('am', 'am'), ('is', 'is'), ('are', 'are'), ('be', 'be')], 'ans': 'is', 'exp': ('Use "is" with "she".', 'ប្រើ "is" ជាមួយ "she"។')},
        {'id': 'jv-ex-4', 'q': ('Complete: "They ___ firefighters."', 'បំពេញ៖ "They ___ firefighters."'), 'opts': [('am', 'am'), ('is', 'is'), ('are', 'are'), ('be', 'be')], 'ans': 'are', 'exp': ('Use "are" with "they".', 'ប្រើ "are" ជាមួយ "they"។')},
        {'id': 'jv-ex-5', 'q': ('Choose the correct sentence:', 'ជ្រើសរើសប្រយោគត្រឹមត្រូវ៖'), 'opts': [('He a doctor.', 'He a doctor.'), ('He is a doctor.', 'He is a doctor.'), ('He am a doctor.', 'He am a doctor.'), ('He are a doctor.', 'He are a doctor.')], 'ans': 'He is a doctor.', 'exp': ('Use "is" with "he".', 'ប្រើ "is" ជាមួយ "he"។')},
    ],
    [
        ('jv-hw-1', ('Find 20 jobs in your language and write them in English.', 'ស្វែងរកការងារចំនួន ២០ ជាភាសារបស់អ្នក ហើយសរសេរជាភាសាអង់គ្លេស។')),
        ('jv-hw-2', ('Make 5 sentences using "I am a ___".', 'បង្កើតប្រយោគ ៥ ដោយប្រើ "I am a ___"។')),
    ],
    [
        {'id': 'jv-q-1', 'q': ('A person who takes care of sick people in a hospital is a ___.', 'អ្នកដែលថែទាំអ្នកជំងឺនៅក្នុងមន្ទីរពេទ្យគឺជា ___'), 'opts': [('Teacher', 'គ្រូបង្រៀន'), ('Nurse', 'គិលានុបដ្ឋាយិកា'), ('Farmer', 'កសិករ'), ('Singer', 'អ្នកចម្រៀង')], 'ans': 'Nurse', 'exp': ('A nurse takes care of patients in a hospital.', 'គិលានុបដ្ឋាយិកាថែទាំអ្នកជំងឺនៅមន្ទីរពេទ្យ។')},
        {'id': 'jv-q-2', 'q': ('A person who cooks food in a restaurant is a ___.', 'អ្នកដែលចម្អិនអាហារនៅក្នុងភោជនីយដ្ឋានគឺជា ___'), 'opts': [('Chef', 'ចុងភៅ'), ('Driver', 'អ្នកបើកបរ'), ('Artist', 'វិចិត្រករ'), ('Dentist', 'ពេទ្យធ្មេញ')], 'ans': 'Chef', 'exp': ('A chef cooks food in a kitchen.', 'ចុងភៅចម្អិនអាហារនៅក្នុងផ្ទះបាយ។')},
        {'id': 'jv-q-3', 'q': ('Complete: "I ___ a student."', 'បំពេញ៖ "I ___ a student."'), 'opts': [('am', 'am'), ('is', 'is'), ('are', 'are'), ('be', 'be')], 'ans': 'am', 'exp': ('Always use "am" with "I".', 'តែងតែប្រើ "am" ជាមួយ "I"។')},
    ],
    ['teacher', 'doctor', 'nurse', 'police-officer', 'firefighter', 'chef', 'farmer', 'driver', 'pilot', 'construction-worker', 'mechanic', 'software-developer', 'hairdresser', 'shopkeeper', 'postman', 'dentist', 'vet', 'artist', 'programmer', 'photographer', 'singer']
)

# L2: SVO Structure
L2 = Lesson(
    'svo-structure', 'SVO Structure', 'រចនាសម្ព័ន្ធ SVO',
    'beginner', 'unit-1', 'ch-2-svo', 2, 15,
    'SVO stands for Subject + Verb + Object. This is the basic sentence structure in English. The subject is the person or thing doing the action. The verb is the action. The object receives the action.',
    'SVO គឺប្រធាន + កិរិយាស័ព្ទ + កម្មបំពេញ។ នេះគឺជារចនាសម្ព័ន្ធប្រយោគមូលដ្ឋានក្នុងភាសាអង់គ្លេស។ ប្រធានគឺជាមនុស្ស ឬវត្ថុដែលធ្វើសកម្មភាព។ កិរិយាស័ព្ទគឺជាសកម្មភាព។ កម្មបំពេញទទួលសកម្មភាព។',
    'Subject (S) + Verb (V) + Object (O)',
    [('I (S) am (V) a student (O).', 'ខ្ញុំជាសិស្ស។'), ('He (S) teaches (V) English (O).', 'គាត់បង្រៀនភាសាអង់គ្លេស។'), ('She (S) likes (V) flowers (O).', 'នាងចូលចិត្តផ្កា។'), ('They (S) play (V) football (O).', 'ពួកគេលេងបាល់ទាត់។'), ('We (S) eat (V) rice (O).', 'ពួកយើងញ៉ាំបាយ។')],
    'Subject + do/does + not + verb + object',
    [('I do not like coffee.', 'ខ្ញុំមិនចូលចិត្តកាហ្វេទេ។'), ('He does not play football.', 'គាត់មិនលេងបាល់ទាត់ទេ។'), ('She does not eat meat.', 'នាងមិនញ៉ាំសាច់ទេ។'), ('They do not watch TV.', 'ពួកគេមិនមើលទូរទស្សន៍ទេ។'), ('We do not drink soda.', 'ពួកយើងមិនផឹកសូដាទេ។')],
    'Do/Does + subject + verb + object?',
    [('Do you like rice? Yes, I do.', 'តើអ្នកចូលចិត្តបាយទេ? បាទ ខ្ញុំចូលចិត្ត។'), ('Does he play football? No, he does not.', 'តើគាត់លេងបាល់ទាត់ទេ? ទេ គាត់មិនលេងទេ។'), ('Does she teach English? Yes, she does.', 'តើនាងបង្រៀនភាសាអង់គ្លេសទេ? បាទ នាងបង្រៀន។'), ('Do they watch TV? Yes, they do.', 'តើពួកគេមើលទូរទស្សន៍ទេ? បាទ ពួកគេមើល។'), ('Do we drink coffee? No, we do not.', 'តើពួកយើងផឹកកាហ្វេទេ? ទេ ពួកយើងមិនផឹកទេ។')],
    [
        ('"I like." (missing object)', '"I like rice."', ('Many English sentences need an object after the verb.', 'ប្រយោគអង់គ្លេសជាច្រើនត្រូវការកម្មបំពេញបន្ទាប់ពីកិរិយាស័ព្ទ។')),
        ('"He like flowers."', '"He likes flowers."', ('Add "s" to the verb with he/she/it.', 'បន្ថែម "s" ទៅកិរិយាស័ព្ទជាមួយ he/she/it។')),
        ('"I am like rice."', '"I like rice."', ('Do not use "am" with action verbs like "like".', 'កុំប្រើ "am" ជាមួយកិរិយាស័ព្ទសកម្មភាពដូចជា "like"។')),
    ],
    [
        {'id': 'svo-ex-1', 'q': ('What does SVO stand for?', 'តើ SVO តំណាងឱ្យអ្វី?'), 'opts': [('Subject + Verb + Object', 'ប្រធាន + កិរិយាស័ព្ទ + កម្មបំពេញ'), ('Subject + Object + Verb', 'ប្រធាន + កម្មបំពេញ + កិរិយាស័ព្ទ'), ('Verb + Subject + Object', 'កិរិយាស័ព្ទ + ប្រធាន + កម្មបំពេញ'), ('Object + Subject + Verb', 'កម្មបំពេញ + ប្រធាន + កិរិយាស័ព្ទ')], 'ans': 'Subject + Verb + Object', 'exp': ('SVO means Subject + Verb + Object in English sentences.', 'SVO មានន័យថា ប្រធាន + កិរិយាស័ព្ទ + កម្មបំពេញ ក្នុងប្រយោគអង់គ្លេស។')},
        {'id': 'svo-ex-2', 'q': ('Identify the object: "She reads a book."', 'កំណត់កម្មបំពេញ៖ "She reads a book."'), 'opts': [('She', 'She'), ('reads', 'reads'), ('a book', 'a book'), ('read', 'read')], 'ans': 'a book', 'exp': ('"A book" is the object that receives the action of reading.', '"A book" ជាកម្មបំពេញដែលទទួលសកម្មភាពអាន។')},
        {'id': 'svo-ex-3', 'q': ('Identify the verb: "He plays football."', 'កំណត់កិរិយាស័ព្ទ៖ "He plays football."'), 'opts': [('He', 'He'), ('plays', 'plays'), ('football', 'football'), ('ball', 'ball')], 'ans': 'plays', 'exp': ('"Plays" is the action verb in this sentence.', '"Plays" ជាកិរិយាស័ព្ទសកម្មភាពក្នុងប្រយោគនេះ។')},
        {'id': 'svo-ex-4', 'q': ('Choose the correct SVO sentence:', 'ជ្រើសរើសប្រយោគ SVO ត្រឹមត្រូវ៖'), 'opts': [('Like I rice.', 'Like I rice.'), ('I rice like.', 'I rice like.'), ('I like rice.', 'I like rice.'), ('Rice I like.', 'Rice I like.')], 'ans': 'I like rice.', 'exp': ('The correct order is Subject (I) + Verb (like) + Object (rice).', 'លំដាប់ត្រឹមត្រូវគឺ ប្រធាន (I) + កិរិយាស័ព្ទ (like) + កម្មបំពេញ (rice)។')},
        {'id': 'svo-ex-5', 'q': ('Complete: "They ___ (play) guitar."', 'បំពេញ៖ "They ___ (play) guitar."'), 'opts': [('play', 'play'), ('plays', 'plays'), ('playing', 'playing'), ('played', 'played')], 'ans': 'play', 'exp': ('With "they", use the base verb without "s".', 'ជាមួយ "they" ប្រើកិរិយាស័ព្ទដើមដោយគ្មាន "s"។')},
    ],
    [
        ('svo-hw-1', ('Make 10 sentences using the SVO structure.', 'បង្កើតប្រយោគ ១០ ដោយប្រើរចនាសម្ព័ន្ធ SVO។')),
        ('svo-hw-2', ('Find 5 sentences in a book and identify S, V, and O.', 'រកប្រយោគ ៥ ក្នុងសៀវភៅ ហើយកំណត់ S, V, និង O។')),
    ],
    [
        {'id': 'svo-q-1', 'q': ('What is the subject in "The cat drinks milk."?', 'តើអ្វីជាប្រធានក្នុង "The cat drinks milk."?'), 'opts': [('drinks', 'drinks'), ('milk', 'milk'), ('The cat', 'The cat'), ('cat', 'cat')], 'ans': 'The cat', 'exp': ('"The cat" is the subject doing the action.', '"The cat" ជាប្រធានដែលធ្វើសកម្មភាព។')},
        {'id': 'svo-q-2', 'q': ('Which sentence has SVO order?', 'តើប្រយោគមួយណាមានលំដាប់ SVO?'), 'opts': [('Plays he guitar.', 'Plays he guitar.'), ('Guitar he plays.', 'Guitar he plays.'), ('He plays guitar.', 'He plays guitar.'), ('He guitar plays.', 'He guitar plays.')], 'ans': 'He plays guitar.', 'exp': ('He (S) + plays (V) + guitar (O) is the correct SVO order.', 'He (S) + plays (V) + guitar (O) ជាលំដាប់ SVO ត្រឹមត្រូវ។')},
        {'id': 'svo-q-3', 'q': ('What is the verb in "My mother cooks food."?', 'តើអ្វីជាកិរិយាស័ព្ទក្នុង "My mother cooks food."?'), 'opts': [('My mother', 'My mother'), ('cooks', 'cooks'), ('food', 'food'), ('mother', 'mother')], 'ans': 'cooks', 'exp': ('"Cooks" is the action verb.', '"Cooks" ជាកិរិយាស័ព្ទសកម្មភាព។')},
        {'id': 'svo-q-4', 'q': ('Complete: "___ (Do/Does) she like flowers?"', 'បំពេញ៖ "___ she like flowers?"'), 'opts': [('Do', 'Do'), ('Does', 'Does'), ('Is', 'Is'), ('Are', 'Are')], 'ans': 'Does', 'exp': ('Use "Does" with "she" for questions in present simple.', 'ប្រើ "Does" ជាមួយ "she" សម្រាប់សំណួរក្នុងបច្ចុប្បន្នកាលធម្មតា។')},
    ],
    ['teacher', 'doctor', 'student', 'football', 'rice']
)

# L3: Present Simple Tense
L3 = Lesson(
    'present-simple', 'Present Simple Tense', 'បច្ចុប្បន្នកាលធម្មតា',
    'beginner', 'unit-1', 'ch-3-present-simple', 3, 20,
    'Present Simple is used to talk about habits, routines, general truths, and facts. For he/she/it, add "s" or "es" to the verb. For I/you/we/they, use the base verb.',
    'បច្ចុប្បន្នកាលធម្មតាត្រូវបានប្រើដើម្បីនិយាយអំពីទម្លាប់ ទម្លាប់ប្រចាំថ្ងៃ ការពិតទូទៅ និងហេតុការណ៍ពិត។ សម្រាប់ he/she/it បន្ថែម "s" ឬ "es" ទៅកិរិយាស័ព្ទ។ សម្រាប់ I/you/we/they ប្រើកិរិយាស័ព្ទដើម។',
    'I/You/We/They + base verb | He/She/It + verb-s/es',
    [('I wake up at 6 AM every day.', 'ខ្ញុំភ្ញាក់ពីគេងនៅម៉ោង ៦ ព្រឹករាល់ថ្ងៃ។'), ('She drinks coffee every morning.', 'នាងផឹកកាហ្វេរាល់ព្រឹក។'), ('They go to school by bus.', 'ពួកគេទៅសាលារៀនដោយឡានក្រុង។'), ('He works in an office.', 'គាត់ធ្វើការនៅក្នុងការិយាល័យ។'), ('The sun rises in the east.', 'ព្រះអាទិត្យរះនៅទិសខាងកើត។')],
    'Subject + do/does + not + base verb',
    [('I do not eat fast food.', 'ខ្ញុំមិនញ៉ាំអាហាររហ័សទេ។'), ('He does not smoke cigarettes.', 'គាត់មិនជក់បារីទេ។'), ('She does not watch TV at night.', 'នាងមិនមើលទូរទស្សន៍នៅពេលយប់ទេ។'), ('They do not live in Phnom Penh.', 'ពួកគេមិនរស់នៅភ្នំពេញទេ។'), ('We do not speak French.', 'ពួកយើងមិននិយាយភាសាបារាំងទេ។')],
    'Do/Does + subject + base verb?',
    [('Do you like spicy food? Yes, I do.', 'តើអ្នកចូលចិត្តអាហារហឹរទេ? បាទ ខ្ញុំចូលចិត្ត។'), ('Does he play soccer? No, he does not.', 'តើគាត់លេងបាល់ទាត់ទេ? ទេ គាត់មិនលេងទេ។'), ('Does she work on Sunday? Yes, she does.', 'តើនាងធ្វើការនៅថ្ងៃអាទិត្យទេ? បាទ នាងធ្វើ។'), ('Do they study English? Yes, they do.', 'តើពួកគេរៀនភាសាអង់គ្លេសទេ? បាទ ពួកគេរៀន។'), ('Do you go to the market every day? No, I do not.', 'តើអ្នកទៅផ្សាររាល់ថ្ងៃទេ? ទេ ខ្ញុំមិនទៅទេ។')],
    [
        ('"He go to school."', '"He goes to school."', ('Add "es" to verbs ending in o, s, sh, ch, x with he/she/it.', 'បន្ថែម "es" ទៅកិរិយាស័ព្ទដែលបញ្ចប់ដោយ o, s, sh, ch, x ជាមួយ he/she/it។')),
        ('"She not like coffee."', '"She does not like coffee."', ('Use "does not" with he/she/it in negative sentences.', 'ប្រើ "does not" ជាមួយ he/she/it ក្នុងប្រយោគអវិជ្ជមាន។')),
        ('"He doesn\'t likes fish."', '"He doesn\'t like fish."', ('After "does not", use the base verb without "s".', 'បន្ទាប់ពី "does not" ប្រើកិរិយាស័ព្ទដើមដោយគ្មាន "s"។')),
    ],
    [
        {'id': 'ps-ex-1', 'q': ('Complete: "She ___ (go) to school every day."', 'បំពេញ៖ "She ___ (go) to school every day."'), 'opts': [('go', 'go'), ('goes', 'goes'), ('going', 'going'), ('went', 'went')], 'ans': 'goes', 'exp': ('With "she", add "es" to "go" -> "goes".', 'ជាមួយ "she" បន្ថែម "es" ទៅ "go" -> "goes"។')},
        {'id': 'ps-ex-2', 'q': ('Complete: "They ___ (play) football on weekends."', 'បំពេញ៖ "They ___ (play) football on weekends."'), 'opts': [('play', 'play'), ('plays', 'plays'), ('playing', 'playing'), ('played', 'played')], 'ans': 'play', 'exp': ('With "they", use the base verb "play".', 'ជាមួយ "they" ប្រើកិរិយាស័ព្ទដើម "play"។')},
        {'id': 'ps-ex-3', 'q': ('Choose the correct negative: "He ___ eat meat."', 'ជ្រើសរើសប្រយោគអវិជ្ជមានត្រឹមត្រូវ៖ "He ___ eat meat."'), 'opts': [('do not', 'do not'), ('does not', 'does not'), ('is not', 'is not'), ('are not', 'are not')], 'ans': 'does not', 'exp': ('Use "does not" with "he" in negative present simple.', 'ប្រើ "does not" ជាមួយ "he" ក្នុងបច្ចុប្បន្នកាលធម្មតាអវិជ្ជមាន។')},
        {'id': 'ps-ex-4', 'q': ('Which is a correct question?', 'តើមួយណាជាសំណួរត្រឹមត្រូវ?'), 'opts': [('Like you coffee?', 'Like you coffee?'), ('Do you like coffee?', 'Do you like coffee?'), ('You like coffee?', 'You like coffee?'), ('Does you like coffee?', 'Does you like coffee?')], 'ans': 'Do you like coffee?', 'exp': ('Use "Do" + subject + base verb for questions with I/you/we/they.', 'ប្រើ "Do" + ប្រធាន + កិរិយាស័ព្ទដើម សម្រាប់សំណួរជាមួយ I/you/we/they។')},
        {'id': 'ps-ex-5', 'q': ('Complete: "The sun ___ (rise) in the east."', 'បំពេញ៖ "The sun ___ (rise) in the east."'), 'opts': [('rise', 'rise'), ('rises', 'rises'), ('rising', 'rising'), ('rose', 'rose')], 'ans': 'rises', 'exp': ('With "the sun" (it), add "s" to "rise" -> "rises".', 'ជាមួយ "the sun" (it) បន្ថែម "s" ទៅ "rise" -> "rises"។')},
    ],
    [
        ('ps-hw-1', ('Write 10 sentences about your daily routine using present simple.', 'សរសេរប្រយោគ ១០ អំពីទម្លាប់ប្រចាំថ្ងៃរបស់អ្នកដោយប្រើបច្ចុប្បន្នកាលធម្មតា។')),
        ('ps-hw-2', ('Write 5 things your friend does and 5 things your friend does not do.', 'សរសេររឿង ៥ ដែលមិត្តរបស់អ្នកធ្វើ និង ៥ ដែលមិត្តរបស់អ្នកមិនធ្វើ។')),
        ('ps-hw-3', ('Ask 5 people questions using "Do you..." and write their answers.', 'សួរមនុស្ស ៥ នាក់នូវសំណួរដោយប្រើ "Do you..." ហើយសរសេរចម្លើយរបស់ពួកគេ។')),
    ],
    [
        {'id': 'ps-q-1', 'q': ('Complete: "She ___ (watch) TV every night."', 'បំពេញ៖ "She ___ (watch) TV every night."'), 'opts': [('watch', 'watch'), ('watches', 'watches'), ('watching', 'watching'), ('watched', 'watched')], 'ans': 'watches', 'exp': ('With "she", add "es" to "watch" -> "watches".', 'ជាមួយ "she" បន្ថែម "es" ទៅ "watch" -> "watches"។')},
        {'id': 'ps-q-2', 'q': ('Which is correct? "I ___ coffee every morning."', 'តើមួយណាត្រឹមត្រូវ? "I ___ coffee every morning."'), 'opts': [('drink', 'drink'), ('drinks', 'drinks'), ('drinking', 'drinking'), ('am drink', 'am drink')], 'ans': 'drink', 'exp': ('With "I", use the base verb "drink".', 'ជាមួយ "I" ប្រើកិរិយាស័ព្ទដើម "drink"។')},
        {'id': 'ps-q-3', 'q': ('Make negative: "He likes fish." -> "He ___ like fish."', 'បង្កើតប្រយោគអវិជ្ជមាន៖ "He likes fish." -> "He ___ like fish."'), 'opts': [('do not', 'do not'), ('does not', 'does not'), ('is not', 'is not'), ('are not', 'are not')], 'ans': 'does not', 'exp': ('Use "does not" + base verb for negative with he/she/it.', 'ប្រើ "does not" + កិរិយាស័ព្ទដើម សម្រាប់ប្រយោគអវិជ្ជមានជាមួយ he/she/it។')},
    ],
    ['wake-up', 'drink', 'coffee', 'school', 'bus', 'work', 'office', 'sun', 'rise', 'east', 'eat', 'food', 'live', 'speak']
)

# L4: WH-Questions
L4 = Lesson(
    'wh-questions', 'WH-Questions', 'សំណួរ WH',
    'beginner', 'unit-1', 'ch-3-present-simple', 4, 15,
    'WH-questions use question words: What, Where, When, Why, Who, How. They ask for specific information. Structure: WH-word + do/does + subject + verb?',
    'សំណួរ WH ប្រើពាក្យសំណួរ៖ What, Where, When, Why, Who, How។ ពួកវាសួររកព័ត៌មានជាក់លាក់។ រចនាសម្ព័ន្ធ៖ ពាក្យ WH + do/does + ប្រធាន + កិរិយាស័ព្ទ?',
    'WH-word + do/does + subject + base verb?',
    [('What do you do? I am a teacher.', 'តើអ្នកធ្វើការអ្វី? ខ្ញុំជាគ្រូបង្រៀន។'), ('Where does she live? She lives in Phnom Penh.', 'តើនាងរស់នៅឯណា? នាងរស់នៅភ្នំពេញ។'), ('When do you wake up? I wake up at 6 AM.', 'តើអ្នកភ្ញាក់ពីគេងនៅពេលណា? ខ្ញុំភ្ញាក់នៅម៉ោង ៦ ព្រឹក។'), ('Why does he study English? He wants to travel.', 'តើហេតុអ្វីគាត់រៀនភាសាអង់គ្លេស? គាត់ចង់ធ្វើដំណើរ។'), ('How do you go to work? I go by motorcycle.', 'តើអ្នកទៅធ្វើការដោយរបៀបណា? ខ្ញុំទៅដោយម៉ូតូ។')],
    '(Negative WH-questions: WH-word + do/does + not + subject + verb?)',
    [('Why do you not study harder? Because I am tired.', 'តើហេតុអ្វីអ្នកមិនរៀនឱ្យខ្លាំង? ព្រោះខ្ញុំនឿយហត់។'), ('Why does she not eat meat? She is a vegetarian.', 'តើហេតុអ្វីនាងមិនញ៉ាំសាច់? នាងជាអ្នកបួស។'), ('Where does he not go? He does not go to the gym.', 'តើគាត់មិនទៅណា? គាត់មិនទៅកន្លែងហាត់ប្រាណទេ។'), ('What do they not like? They do not like spiders.', 'តើពួកគេមិនចូលចិត្តអ្វី? ពួកគេមិនចូលចិត្តសត្វពីងពាងទេ។'), ('When do you not work? I do not work on Sunday.', 'តើអ្នកមិនធ្វើការនៅពេលណា? ខ្ញុំមិនធ្វើការនៅថ្ងៃអាទិត្យទេ។')],
    'WH-word + do/does + subject + base verb?',
    [('What do you want to eat?', 'តើអ្នកចង់ញ៉ាំអ្វី?'), ('Where does your mother work?', 'តើម្តាយអ្នកធ្វើការនៅឯណា?'), ('When does the movie start?', 'តើរឿងចាប់ផ្តើមនៅពេលណា?'), ('Why do you like cats?', 'តើហេតុអ្វីអ្នកចូលចិត្តឆ្មា?'), ('How does she go to school? She walks.', 'តើនាងទៅសាលាដោយរបៀបណា? នាងដើរ។')],
    [
        ('"What you do?"', '"What do you do?"', ('WH-questions need "do/does" between the WH-word and the subject.', 'សំណួរ WH ត្រូវការ "do/does" នៅចន្លោះពាក្យ WH និងប្រធាន។')),
        ('"Where does he lives?"', '"Where does he live?"', ('After "does", use the base verb without "s".', 'បន្ទាប់ពី "does" ប្រើកិរិយាស័ព្ទដើមដោយគ្មាន "s"។')),
        ('"Why you don\'t like rice?"', '"Why don\'t you like rice?"', ('In WH-questions, "do/does" comes before the subject, even in negative form.', 'ក្នុងសំណួរ WH "do/does" មកមុខប្រធាន សូម្បីតែក្នុងទម្រង់អវិជ្ជមាន។')),
    ],
    [
        {'id': 'wh-ex-1', 'q': ('___ do you live? "I live in Siem Reap."', '___ do you live? "I live in Siem Reap."'), 'opts': [('What', 'What'), ('Where', 'Where'), ('When', 'When'), ('Who', 'Who')], 'ans': 'Where', 'exp': ('"Where" is used to ask about a place or location.', '"Where" ត្រូវបានប្រើដើម្បីសួរអំពីទីកន្លែង។')},
        {'id': 'wh-ex-2', 'q': ('___ does she go to bed? "At 10 PM."', '___ does she go to bed? "At 10 PM."'), 'opts': [('What', 'What'), ('Where', 'Where'), ('When', 'When'), ('Why', 'Why')], 'ans': 'When', 'exp': ('"When" is used to ask about time.', '"When" ត្រូវបានប្រើដើម្បីសួរអំពីពេលវេលា។')},
        {'id': 'wh-ex-3', 'q': ('Choose the correct question for "I like pizza."', 'ជ្រើសរើសសំណួរត្រឹមត្រូវសម្រាប់ "I like pizza."'), 'opts': [('What do you like?', 'What do you like?'), ('Where do you like?', 'Where do you like?'), ('When do you like?', 'When do you like?'), ('Who do you like?', 'Who do you like?')], 'ans': 'What do you like?', 'exp': ('"What" asks about a thing (pizza).', '"What" សួរអំពីរឿង (pizza)។')},
        {'id': 'wh-ex-4', 'q': ('___ do you study English? "Because I want to travel."', '___ do you study English? "Because I want to travel."'), 'opts': [('What', 'What'), ('Where', 'Where'), ('When', 'When'), ('Why', 'Why')], 'ans': 'Why', 'exp': ('"Why" asks for a reason, and the answer often starts with "Because".', '"Why" សួររកមូលហេតុ ហើយចម្លើយច្រើនតែចាប់ផ្តើមដោយ "Because"។')},
        {'id': 'wh-ex-5', 'q': ('Choose the correct sentence:', 'ជ្រើសរើសប្រយោគត្រឹមត្រូវ៖'), 'opts': [('Where does he works?', 'Where does he works?'), ('Where do he works?', 'Where do he works?'), ('Where does he work?', 'Where does he work?'), ('Where do he work?', 'Where do he work?')], 'ans': 'Where does he work?', 'exp': ('Use "does" with "he" and the base verb "work" without "s".', 'ប្រើ "does" ជាមួយ "he" និងកិរិយាស័ព្ទដើម "work" ដោយគ្មាន "s"។')},
    ],
    [
        ('wh-hw-1', ('Write 5 WH-questions and answer them about your daily life.', 'សរសេរសំណួរ WH ៥ ហើយឆ្លើយពួកវាអំពីជីវិតប្រចាំថ្ងៃរបស់អ្នក។')),
        ('wh-hw-2', ('Ask a friend 5 WH-questions and write their answers.', 'សួរមិត្តភក្តិនូវសំណួរ WH ៥ ហើយសរសេរចម្លើយរបស់ពួកគេ។')),
    ],
    [
        {'id': 'wh-q-1', 'q': ('Which WH-word asks about a person?', 'តើពាក្យ WH មួយណាសួរអំពីមនុស្ស?'), 'opts': [('What', 'What'), ('Where', 'Where'), ('Who', 'Who'), ('Why', 'Why')], 'ans': 'Who', 'exp': ('"Who" is used to ask about a person.', '"Who" ត្រូវបានប្រើដើម្បីសួរអំពីមនុស្ស។')},
        {'id': 'wh-q-2', 'q': ('___ do you go to the gym? "Three times a week."', '___ do you go to the gym? "Three times a week."'), 'opts': [('How often', 'How often'), ('What', 'What'), ('Where', 'Where'), ('Who', 'Who')], 'ans': 'How often', 'exp': ('"How often" asks about frequency.', '"How often" សួរអំពីភាពញឹកញាប់។')},
        {'id': 'wh-q-3', 'q': ('Correct the question: "Why he is sad?"', 'កែសំណួរ៖ "Why he is sad?"'), 'opts': [('Why is he sad?', 'Why is he sad?'), ('Why he sad?', 'Why he sad?'), ('He why is sad?', 'He why is sad?'), ('Why does he sad?', 'Why does he sad?')], 'ans': 'Why is he sad?', 'exp': ('With the verb "to be", the verb comes before the subject in questions.', 'ជាមួយកិរិយាស័ព្ទ "to be" កិរិយាស័ព្ទមកមុខប្រធានក្នុងសំណួរ។')},
    ],
    ['what', 'where', 'when', 'why', 'who', 'how', 'live', 'work', 'study', 'travel', 'eat', 'like', 'go', 'want']
)

L5 = Lesson(
    'noun-verb-adjective', 'Nouns, Verbs & Adjectives', 'នាម កិរិយាស័ព្ទ និង គុណនាម',
    'beginner', 'unit-1', 'ch-4-parts-of-speech', 5, 15,
    'Nouns name people, places, things, or ideas. Verbs describe actions or states. Adjectives describe nouns. Learning these parts of speech helps you build correct sentences.',
    'នាមដាក់ឈ្មោះមនុស្ស ទីកន្លែង វត្ថុ ឬគំនិត។ កិរិយាស័ព្ទពិពណ៌នាអំពីសកម្មភាព ឬស្ថានភាព។ គុណនាមពិពណ៌នាអំពីនាម។ ការរៀនផ្នែកនៃការនិយាយទាំងនេះជួយអ្នកបង្កើតប្រយោគត្រឹមត្រូវ។',
    'Subject + verb + (adjective) + noun',
    [('I have a red car.', 'ខ្ញុំមានឡានក្រហមមួយ។'), ('She is a happy girl.', 'នាងជាក្មេងស្រីរីករាយម្នាក់។'), ('He reads an interesting book.', 'គាត់អានសៀវភៅគួរឱ្យចាប់អារម្មណ៍មួយ។'), ('They live in a big house.', 'ពួកគេរស់នៅក្នុងផ្ទះធំមួយ។'), ('We eat delicious food.', 'ពួកយើងញ៉ាំអាហារឆ្ងាញ់។')],
    'Subject + do/does not + verb + (adjective) + noun',
    [('I do not have a blue pen.', 'ខ្ញុំមិនមានប៊ិចពណ៌ខៀវទេ។'), ('She does not like spicy food.', 'នាងមិនចូលចិត្តអាហារហឹរទេ។'), ('He does not read long books.', 'គាត់មិនអានសៀវភៅវែងទេ។'), ('They do not have a small cat.', 'ពួកគេមិនមានឆ្មាតូចទេ។'), ('We do not eat sweet fruit.', 'ពួកយើងមិនញ៉ាំផ្លែឈើផ្អែមទេ។')],
    'Do/Does + subject + verb + (adjective) + noun?',
    [('Do you have a red car?', 'តើអ្នកមានឡានក្រហមទេ?'), ('Does she like spicy food?', 'តើនាងចូលចិត្តអាហារហឹរទេ?'), ('Does he read long books?', 'តើគាត់អានសៀវភៅវែងទេ?'), ('Do they have a small dog?', 'តើពួកគេមានឆ្កែតូចទេ?'), ('Do you eat sweet fruit?', 'តើអ្នកញ៉ាំផ្លែឈើផ្អែមទេ?')],
    [
        ('"She is beautiful." (missing article)', '"She is a beautiful girl."', ('An adjective alone is not a noun; add a noun after the adjective.', 'គុណនាមតែម្នាក់ឯងមិនមែនជានាមទេ បន្ថែមនាមបន្ទាប់ពីគុណនាម។')),
        ('"I run fast." "He run fast."', '"He runs fast."', ('Add "s" to the verb with he/she/it in present simple.', 'បន្ថែម "s" ទៅកិរិយាស័ព្ទជាមួយ he/she/it ក្នុងបច្ចុប្បន្នកាលធម្មតា។')),
        ('"I have car red."', '"I have a red car."', ('In English, adjectives come before the noun, not after.', 'ក្នុងភាសាអង់គ្លេស គុណនាមមកមុខនាម មិនមែនក្រោយទេ។')),
    ],
    [
        {'id': 'nva-ex-1', 'q': ('Identify the noun: "The cat sleeps on the bed."', 'កំណត់នាម៖ "The cat sleeps on the bed."'), 'opts': [('sleeps', 'sleeps'), ('cat', 'cat'), ('on', 'on'), ('the', 'the')], 'ans': 'cat', 'exp': ('"Cat" is a noun — it names an animal.', '"Cat" ជានាម — វាដាក់ឈ្មោះសត្វ។')},
        {'id': 'nva-ex-2', 'q': ('Identify the verb: "The dog runs fast."', 'កំណត់កិរិយាស័ព្ទ៖ "The dog runs fast."'), 'opts': [('dog', 'dog'), ('runs', 'runs'), ('fast', 'fast'), ('the', 'the')], 'ans': 'runs', 'exp': ('"Runs" is a verb — it describes the action.', '"Runs" ជាកិរិយាស័ព្ទ — វាពិណនាអំពីសកម្មភាព។')},
        {'id': 'nva-ex-3', 'q': ('Identify the adjective: "She wears a blue dress."', 'កំណត់គុណនាម៖ "She wears a blue dress."'), 'opts': [('She', 'She'), ('wears', 'wears'), ('blue', 'blue'), ('dress', 'dress')], 'ans': 'blue', 'exp': ('"Blue" is an adjective — it describes the dress.', '"Blue" ជាគុណនាម — វាពិណនាអំពីសម្លៀកបំពាក់។')},
        {'id': 'nva-ex-4', 'q': ('Complete: "She ___ (have) a pretty cat."', 'បំពេញ៖ "She ___ (have) a pretty cat."'), 'opts': [('have', 'have'), ('has', 'has'), ('having', 'having'), ('had', 'had')], 'ans': 'has', 'exp': ('With "she", use "has" not "have".', 'ជាមួយ "she" ប្រើ "has" មិនមែន "have"។')},
        {'id': 'nva-ex-5', 'q': ('Choose the correct sentence:', 'ជ្រើសរើសប្រយោគត្រឹមត្រូវ៖'), 'opts': [('She is a girl happy.', 'She is a girl happy.'), ('She is happy a girl.', 'She is happy a girl.'), ('She is a happy girl.', 'She is a happy girl.'), ('She happy is a girl.', 'She happy is a girl.')], 'ans': 'She is a happy girl.', 'exp': ('Adjectives come between the article and the noun: a + adjective + noun.', 'គុណនាមនៅចន្លោះអត្ថបទ និងនាម៖ a + គុណនាម + នាម។')},
    ],
    [
        ('nva-hw-1', ('Find 10 nouns, 5 verbs, and 5 adjectives in an English book or article.', 'រកនាម ១០ កិរិយាស័ព្ទ ៥ និងគុណនាម ៥ ក្នុងសៀវភៅ ឬអត្ថបទអង់គ្លេស។')),
        ('nva-hw-2', ('Write 5 sentences. Each sentence must have at least one noun, one verb, and one adjective.', 'សរសេរប្រយោគ ៥។ ប្រយោគនីមួយៗត្រូវតែមាននាមយ៉ាងតិចមួយ កិរិយាស័ព្ទមួយ និងគុណនាមមួយ។')),
    ],
    [
        {'id': 'nva-q-1', 'q': ('Which word is a noun?', 'តើពាក្យមួយណាជានាម?'), 'opts': [('run', 'run'), ('beautiful', 'beautiful'), ('dog', 'dog'), ('quickly', 'quickly')], 'ans': 'dog', 'exp': ('"Dog" is a noun — it names an animal.', '"Dog" ជានាម — វាដាក់ឈ្មោះសត្វ។')},
        {'id': 'nva-q-2', 'q': ('Which word is a verb?', 'តើពាក្យមួយណាជាកិរិយាស័ព្ទ?'), 'opts': [('car', 'car'), ('eat', 'eat'), ('green', 'green'), ('slowly', 'slowly')], 'ans': 'eat', 'exp': ('"Eat" is a verb — it describes an action.', '"Eat" ជាកិរិយាស័ព្ទ — វាពិណនាអំពីសកម្មភាព។')},
        {'id': 'nva-q-3', 'q': ('Which word is an adjective?', 'តើពាក្យមួយណាជាគុណនាម?'), 'opts': [('book', 'book'), ('write', 'write'), ('tall', 'tall'), ('quickly', 'quickly')], 'ans': 'tall', 'exp': ('"Tall" is an adjective — it describes a noun.', '"Tall" ជាគុណនាម — វាពិណនាអំពីនាម។')},
    ],
    ['noun', 'verb', 'adjective', 'cat', 'dog', 'car', 'book', 'house', 'rice', 'food', 'girl', 'dress', 'blue', 'red', 'big', 'small', 'happy', 'tall']
)
L6 = Lesson(
    'pronouns', 'Pronouns', 'សព្វនាម',
    'beginner', 'unit-1', 'ch-4-parts-of-speech', 6, 15,
    'Pronouns replace nouns in sentences. Subject pronouns (I, you, he, she, it, we, they) act as the subject. Object pronouns (me, you, him, her, it, us, them) receive the action.',
    'សព្វនាមជំនួសនាមក្នុងប្រយោគ។ សព្វនាមប្រធាន (I, you, he, she, it, we, they) ធ្វើជាប្រធាន។ សព្វនាមកម្មបំពេញ (me, you, him, her, it, us, them) ទទួលសកម្មភាព។',
    'Subject pronoun + verb + object pronoun',
    [('I like her.', 'ខ្ញុំចូលចិត្តនាង។'), ('She helps me.', 'នាងជួយខ្ញុំ។'), ('They see us.', 'ពួកគេឃើញពួកយើង។'), ('He calls him.', 'គាត់ទូរស័ព្ទទៅគាត់។'), ('We invite them.', 'ពួកយើងអញ្ជើញពួកគេ។')],
    'Subject pronoun + do/does not + verb + object pronoun',
    [('I do not like her.', 'ខ្ញុំមិនចូលចិត្តនាងទេ។'), ('She does not help me.', 'នាងមិនជួយខ្ញុំទេ។'), ('They do not see us.', 'ពួកគេមិនឃើញពួកយើងទេ។'), ('He does not call him.', 'គាត់មិនទូរស័ព្ទទៅគាត់ទេ។'), ('We do not invite them.', 'ពួកយើងមិនអញ្ជើញពួកគេទេ។')],
    'Do/Does + subject pronoun + verb + object pronoun?',
    [('Do you like her?', 'តើអ្នកចូលចិត្តនាងទេ?'), ('Does she help me?', 'តើនាងជួយខ្ញុំទេ?'), ('Do they see us?', 'តើពួកគេឃើញពួកយើងទេ?'), ('Does he call him?', 'តើគាត់ទូរស័ព្ទទៅគាត់ទេ?'), ('Do you invite them?', 'តើអ្នកអញ្ជើញពួកគេទេ?')],
    [
        ('"Me like him."', '"I like him."', ('Use subject pronouns (I, he, she, they) as the subject of a sentence.', 'ប្រើសព្វនាមប្រធាន (I, he, she, they) ជាប្រធានប្រយោគ។')),
        ('"I like he."', '"I like him."', ('Use object pronouns (me, him, her, them) after a verb.', 'ប្រើសព្វនាមកម្មបំពេញ (me, him, her, them) បន្ទាប់ពីកិរិយាស័ព្ទ។')),
        ('"Her likes me."', '"She likes me."', ('"Her" is an object pronoun. Use "she" as a subject pronoun.', '"Her" ជាសព្វនាមកម្មបំពេញ។ ប្រើ "she" ជាសព្វនាមប្រធាន។')),
    ],
    [
        {'id': 'pro-ex-1', 'q': ('Choose: "___ (I/Me) am a student."', 'ជ្រើសរើស៖ "___ (I/Me) am a student."'), 'opts': [('I', 'I'), ('Me', 'Me'), ('My', 'My'), ('Mine', 'Mine')], 'ans': 'I', 'exp': ('Use "I" as the subject pronoun before the verb.', 'ប្រើ "I" ជាសព្វនាមប្រធានមុនកិរិយាស័ព្ទ។')},
        {'id': 'pro-ex-2', 'q': ('Choose: "She likes ___ (he/him)."', 'ជ្រើសរើស៖ "She likes ___ (he/him)."'), 'opts': [('he', 'he'), ('him', 'him'), ('his', 'his'), ('her', 'her')], 'ans': 'him', 'exp': ('Use object pronoun "him" after the verb "likes".', 'ប្រើសព្វនាមកម្មបំពេញ "him" បន្ទាប់ពីកិរិយាស័ព្ទ "likes"។')},
        {'id': 'pro-ex-3', 'q': ('Choose: "___ (They/Them) play football."', 'ជ្រើសរើស៖ "___ (They/Them) play football."'), 'opts': [('They', 'They'), ('Them', 'Them'), ('Their', 'Their'), ('Theirs', 'Theirs')], 'ans': 'They', 'exp': ('"They" is a subject pronoun. Use it as the subject of the sentence.', '"They" ជាសព្វនាមប្រធាន។ ប្រើវាជាប្រធានប្រយោគ។')},
        {'id': 'pro-ex-4', 'q': ('Choose: "Give this to ___ (she/her)."', 'ជ្រើសរើស៖ "Give this to ___ (she/her)."'), 'opts': [('she', 'she'), ('her', 'her'), ('hers', 'hers'), ('she is', 'she is')], 'ans': 'her', 'exp': ('Use object pronoun "her" after the preposition "to".', 'ប្រើសព្វនាមកម្មបំពេញ "her" បន្ទាប់ពីធ្នាក់ "to"។')},
        {'id': 'pro-ex-5', 'q': ('Choose: "___ (We/Us) are friends."', 'ជ្រើសរើស៖ "___ (We/Us) are friends."'), 'opts': [('We', 'We'), ('Us', 'Us'), ('Our', 'Our'), ('Ours', 'Ours')], 'ans': 'We', 'exp': ('"We" is a subject pronoun. Use it before the verb "are".', '"We" ជាសព្វនាមប្រធាន។ ប្រើវាមុនកិរិយាស័ព្ទ "are"។')},
    ],
    [
        ('pro-hw-1', ('Rewrite 5 sentences replacing the nouns with pronouns.', 'សរសេរប្រយោគ ៥ ឡើងវិញដោយជំនួសនាមជាមួយសព្វនាម។')),
        ('pro-hw-2', ('Write 5 sentences using subject pronouns and object pronouns.', 'សរសេរប្រយោគ ៥ ដោយប្រើសព្វនាមប្រធាន និងសព្វនាមកម្មបំពេញ។')),
        ('pro-hw-3', ('Fill in: "___ (I/Me) gave ___ (she/her) a gift."', 'បំពេញ៖ "___ (I/Me) gave ___ (she/her) a gift."')),
    ],
    [
        {'id': 'pro-q-1', 'q': ('"___ is my friend." Choose the correct pronoun.', '"___ is my friend." ជ្រើសរើសសព្វនាមត្រឹមត្រូវ។'), 'opts': [('He', 'He'), ('Him', 'Him'), ('His', 'His'), ('Her', 'Her')], 'ans': 'He', 'exp': ('"He" is a subject pronoun used as the subject of the sentence.', '"He" ជាសព្វនាមប្រធានប្រើជាប្រធានប្រយោគ។')},
        {'id': 'pro-q-2', 'q': ('"I call ___ every day." Choose the correct pronoun.', '"I call ___ every day." ជ្រើសរើសសព្វនាមត្រឹមត្រូវ។'), 'opts': [('she', 'she'), ('her', 'her'), ('hers', 'hers'), ('she is', 'she is')], 'ans': 'her', 'exp': ('Use object pronoun "her" after the verb "call".', 'ប្រើសព្វនាមកម្មបំពេញ "her" បន្ទាប់ពីកិរិយាស័ព្ទ "call"។')},
        {'id': 'pro-q-3', 'q': ('"___ am a teacher." Choose the correct pronoun.', '"___ am a teacher." ជ្រើសរើសសព្វនាមត្រឹមត្រូវ។'), 'opts': [('I', 'I'), ('Me', 'Me'), ('My', 'My'), ('Mine', 'Mine')], 'ans': 'I', 'exp': ('"I" is the subject pronoun used with "am".', '"I" ជាសព្វនាមប្រធានប្រើជាមួយ "am"។')},
    ],
    ['i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'friend', 'call', 'help', 'invite', 'gift', 'give']
)
L7 = Lesson(
    'a-an', 'A / An', 'A / An',
    'beginner', 'unit-1', 'ch-4-parts-of-speech', 7, 10,
    'Use "a" before words that begin with a consonant sound. Use "an" before words that begin with a vowel sound (a, e, i, o, u). These are called indefinite articles.',
    'ប្រើ "a" មុខពាក្យដែលចាប់ផ្តើមដោយសំឡេងព្យញ្ជនៈ។ ប្រើ "an" មុខពាក្យដែលចាប់ផ្តើមដោយសំឡេងស្រៈ (a, e, i, o, u)។ ទាំងនេះត្រូវបានគេហៅថាអត្ថបទមិនកំណត់។',
    'Subject + be + a/an + noun',
    [('It is a book.', 'វាជាសៀវភៅមួយ។'), ('She is an artist.', 'នាងជាវិចិត្រករម្នាក់។'), ('He is a teacher.', 'គាត់ជាគ្រូបង្រៀនម្នាក់។'), ('It is an apple.', 'វាជាផ្លែប៉ោមមួយ។'), ('I am a student.', 'ខ្ញុំជាសិស្សម្នាក់។')],
    'Subject + be + not + a/an + noun',
    [('It is not a book.', 'វាមិនមែនជាសៀវភៅទេ។'), ('She is not an artist.', 'នាងមិនមែនជាវិចិត្រករទេ។'), ('He is not a teacher.', 'គាត់មិនមែនជាគ្រូបង្រៀនទេ។'), ('It is not an apple.', 'វាមិនមែនជាផ្លែប៉ោមទេ។'), ('I am not a student.', 'ខ្ញុំមិនមែនជាសិស្សទេ។')],
    'Be + subject + a/an + noun?',
    [('Is it a book?', 'តើវាជាសៀវភៅមែនទេ?'), ('Is she an artist?', 'តើនាងជាវិចិត្រករមែនទេ?'), ('Is he a teacher?', 'តើគាត់ជាគ្រូបង្រៀនមែនទេ?'), ('Is it an apple?', 'តើវាជាផ្លែប៉ោមមែនទេ?'), ('Are you a student?', 'តើអ្នកជាសិស្សមែនទេ?')],
    [
        ('"She is a artist."', '"She is an artist."', ('Use "an" before words starting with a vowel sound. "Artist" starts with "a".', 'ប្រើ "an" មុខពាក្យដែលចាប់ផ្តើមដោយសំឡេងស្រៈ។ "Artist" ចាប់ផ្តើមដោយ "a"។')),
        ('"It is an book."', '"It is a book."', ('Use "a" before words starting with a consonant sound. "Book" starts with "b".', 'ប្រើ "a" មុខពាក្យដែលចាប់ផ្តើមដោយសំឡេងព្យញ្ជនៈ។ "Book" ចាប់ផ្តើមដោយ "b"។')),
        ('"He is teacher."', '"He is a teacher."', ('Always use "a" or "an" before singular countable nouns.', 'តែងតែប្រើ "a" ឬ "an" មុខនាមរាប់បានឯកវចនៈ។')),
    ],
    [
        {'id': 'aa-ex-1', 'q': ('Choose: "___ (A/An) elephant is big."', 'ជ្រើសរើស៖ "___ (A/An) elephant is big."'), 'opts': [('A', 'A'), ('An', 'An'), ('The', 'The'), ('None', 'None')], 'ans': 'An', 'exp': ('"Elephant" starts with a vowel sound "e", so use "an".', '"Elephant" ចាប់ផ្តើមដោយសំឡេងស្រៈ "e" ដូច្នេះប្រើ "an"។')},
        {'id': 'aa-ex-2', 'q': ('Choose: "She has ___ (a/an) cat."', 'ជ្រើសរើស៖ "She has ___ (a/an) cat."'), 'opts': [('a', 'a'), ('an', 'an'), ('the', 'the'), ('no', 'no')], 'ans': 'a', 'exp': ('"Cat" starts with a consonant sound "c", so use "a".', '"Cat" ចាប់ផ្តើមដោយសំឡេងព្យញ្ជនៈ "c" ដូច្នេះប្រើ "a"។')},
        {'id': 'aa-ex-3', 'q': ('Fill in: "I am ___ student."', 'បំពេញ៖ "I am ___ student."'), 'opts': [('a', 'a'), ('an', 'an'), ('the', 'the'), ('none', 'none')], 'ans': 'a', 'exp': ('"Student" starts with a consonant sound "s", so use "a".', '"Student" ចាប់ផ្តើមដោយសំឡេងព្យញ្ជនៈ "s" ដូច្នេះប្រើ "a"។')},
        {'id': 'aa-ex-4', 'q': ('Fill in: "It is ___ orange."', 'បំពេញ៖ "It is ___ orange."'), 'opts': [('a', 'a'), ('an', 'an'), ('the', 'the'), ('none', 'none')], 'ans': 'an', 'exp': ('"Orange" starts with a vowel sound "o", so use "an".', '"Orange" ចាប់ផ្តើមដោយសំឡេងស្រៈ "o" ដូច្នេះប្រើ "an"។')},
        {'id': 'aa-ex-5', 'q': ('Which is correct?', 'តើមួយណាត្រឹមត្រូវ?'), 'opts': [('He is a engineer.', 'He is a engineer.'), ('He is an engineer.', 'He is an engineer.'), ('He is engineer.', 'He is engineer.'), ('Engineer he is.', 'Engineer he is.')], 'ans': 'He is an engineer.', 'exp': ('"Engineer" starts with a vowel sound "e", so use "an".', '"Engineer" ចាប់ផ្តើមដោយសំឡេងស្រៈ "e" ដូច្នេះប្រើ "an"។')},
    ],
    [
        ('aa-hw-1', ('Find 10 things in your room and write "a" or "an" before each one.', 'រកវត្ថុ ១០ ក្នុងបន្ទប់របស់អ្នក ហើយសរសេរ "a" ឬ "an" មុខវត្ថុនីមួយៗ។')),
        ('aa-hw-2', ('Write 5 sentences using "a" and 5 sentences using "an".', 'សរសេរប្រយោគ ៥ ដោយប្រើ "a" និង ៥ ដោយប្រើ "an"។')),
    ],
    [
        {'id': 'aa-q-1', 'q': ('Choose: "___ (A/An) university." (Note: "university" starts with /ju:/ sound)', 'ជ្រើសរើស៖ "___ (A/An) university."'), 'opts': [('A', 'A'), ('An', 'An'), ('The', 'The'), ('None', 'None')], 'ans': 'A', 'exp': ('"University" starts with a consonant sound /j/, so use "a".', '"University" ចាប់ផ្តើមដោយសំឡេងព្យញ្ជនៈ /j/ ដូច្នេះប្រើ "a"។')},
        {'id': 'aa-q-2', 'q': ('Choose: "___ (A/An) hour." (Note: "hour" starts with a silent "h")', 'ជ្រើសរើស៖ "___ (A/An) hour."'), 'opts': [('A', 'A'), ('An', 'An'), ('The', 'The'), ('None', 'None')], 'ans': 'An', 'exp': ('"Hour" starts with a vowel sound (silent "h"), so use "an".', '"Hour" ចាប់ផ្តើមដោយសំឡេងស្រៈ (h ស្ងាត់) ដូច្នេះប្រើ "an"។')},
        {'id': 'aa-q-3', 'q': ('Fill in: "It is ___ umbrella."', 'បំពេញ៖ "It is ___ umbrella."'), 'opts': [('a', 'a'), ('an', 'an'), ('the', 'the'), ('none', 'none')], 'ans': 'an', 'exp': ('"Umbrella" starts with a vowel sound "u", so use "an".', '"Umbrella" ចាប់ផ្តើមដោយសំឡេងស្រៈ "u" ដូច្នេះប្រើ "an"។')},
    ],
    ['a', 'an', 'book', 'artist', 'teacher', 'apple', 'student', 'elephant', 'cat', 'orange', 'engineer', 'umbrella', 'university', 'hour']
)
L8 = Lesson(
    'this-that-these-those', 'This / That / These / Those', 'This / That / These / Those',
    'beginner', 'unit-1', 'ch-5-demonstratives', 8, 10,
    'Use "this" for something near (singular). Use "that" for something far (singular). Use "these" for things near (plural). Use "those" for things far (plural).',
    'ប្រើ "this" សម្រាប់អ្វីដែលនៅជិត (ឯកវចនៈ)។ ប្រើ "that" សម្រាប់អ្វីដែលនៅឆ្ងាយ (ឯកវចនៈ)។ ប្រើ "these" សម្រាប់អ្វីដែលនៅជិត (ពហុវចនៈ)។ ប្រើ "those" សម្រាប់អ្វីដែលនៅឆ្ងាយ (ពហុវចនៈ)។',
    'This/That + is + noun | These/Those + are + noun',
    [('This is a pen.', 'នេះគឺជាប៊ិចមួយ។'), ('That is a car.', 'នោះគឺជាឡានមួយ។'), ('These are books.', 'ទាំងនេះគឺជាសៀវភៅ។'), ('Those are chairs.', 'ទាំងនោះគឺជាកៅអី។'), ('This is my phone.', 'នេះគឺជាទូរស័ព្ទរបស់ខ្ញុំ។')],
    'This/That + is + not + noun | These/Those + are + not + noun',
    [('This is not a pen.', 'នេះមិនមែនជាប៊ិចទេ។'), ('That is not a car.', 'នោះមិនមែនជាឡានទេ។'), ('These are not books.', 'ទាំងនេះមិនមែនជាសៀវភៅទេ។'), ('Those are not chairs.', 'ទាំងនោះមិនមែនជាកៅអីទេ។'), ('That is not my bag.', 'នោះមិនមែនជាកាបូបរបស់ខ្ញុំទេ។')],
    'Is + this/that + noun? | Are + these/those + noun?',
    [('Is this a pen? Yes, it is.', 'តើនេះជាប៊ិចមែនទេ? បាទ វាជា។'), ('Is that a car? No, it is not.', 'តើនោះជាឡានមែនទេ? ទេ វាមិនមែនទេ។'), ('Are these books? Yes, they are.', 'តើទាំងនេះជាសៀវភៅមែនទេ? បាទ ពួកវាជា។'), ('Are those chairs? No, they are not.', 'តើទាំងនោះជាកៅអីមែនទេ? ទេ ពួកវាមិនមែនទេ។'), ('Is this your phone? Yes, it is.', 'តើនេះជាទូរស័ព្ទរបស់អ្នកមែនទេ? បាទ វាជា។')],
    [
        ('"This are a book."', '"This is a book."', ('Use "is" with "this" and "that" (singular).', 'ប្រើ "is" ជាមួយ "this" និង "that" (ឯកវចនៈ)។')),
        ('"These is books."', '"These are books."', ('Use "are" with "these" and "those" (plural).', 'ប្រើ "are" ជាមួយ "these" និង "those" (ពហុវចនៈ)។')),
        ('"That pens are blue."', '"Those pens are blue."', ('Use "those" for plural things that are far.', 'ប្រើ "those" សម្រាប់វត្ថុពហុវចនៈដែលនៅឆ្ងាយ។')),
    ],
    [
        {'id': 'ttt-ex-1', 'q': ('Choose: "___ (This/These) is a book." (near, singular)', 'ជ្រើសរើស៖ "___ (This/These) is a book."'), 'opts': [('This', 'This'), ('These', 'These'), ('That', 'That'), ('Those', 'Those')], 'ans': 'This', 'exp': ('"This" is used for a singular noun that is near.', '"This" ត្រូវបានប្រើសម្រាប់នាមឯកវចនៈដែលនៅជិត។')},
        {'id': 'ttt-ex-2', 'q': ('Choose: "___ (That/Those) are chairs." (far, plural)', 'ជ្រើសរើស៖ "___ (That/Those) are chairs."'), 'opts': [('That', 'That'), ('Those', 'Those'), ('This', 'This'), ('These', 'These')], 'ans': 'Those', 'exp': ('"Those" is used for plural nouns that are far.', '"Those" ត្រូវបានប្រើសម្រាប់នាមពហុវចនៈដែលនៅឆ្ងាយ។')},
        {'id': 'ttt-ex-3', 'q': ('Fill in: "___ is my bag." (near, singular)', 'បំពេញ៖ "___ is my bag." (នៅជិត, ឯកវចនៈ)'), 'opts': [('This', 'This'), ('These', 'These'), ('Those', 'Those'), ('They', 'They')], 'ans': 'This', 'exp': ('"This" is correct for a singular noun near the speaker.', '"This" ត្រឹមត្រូវសម្រាប់នាមឯកវចនៈនៅជិតអ្នកនិយាយ។')},
        {'id': 'ttt-ex-4', 'q': ('Fill in: "___ are my shoes." (far, plural)', 'បំពេញ៖ "___ are my shoes." (នៅឆ្ងាយ, ពហុវចនៈ)'), 'opts': [('This', 'This'), ('That', 'That'), ('These', 'These'), ('Those', 'Those')], 'ans': 'Those', 'exp': ('"Those" is correct for plural nouns far from the speaker.', '"Those" ត្រឹមត្រូវសម្រាប់នាមពហុវចនៈឆ្ងាយពីអ្នកនិយាយ។')},
        {'id': 'ttt-ex-5', 'q': ('Choose the correct sentence:', 'ជ្រើសរើសប្រយោគត្រឹមត្រូវ៖'), 'opts': [('This are my keys.', 'This are my keys.'), ('These is my keys.', 'These is my keys.'), ('These are my keys.', 'These are my keys.'), ('This my keys.', 'This my keys.')], 'ans': 'These are my keys.', 'exp': ('"Keys" is plural, so use "These are".', '"Keys" ជាពហុវចនៈ ដូច្នេះប្រើ "These are"។')},
    ],
    [
        ('ttt-hw-1', ('Walk around your room. Point to 5 objects near you and 5 objects far from you and say the correct demonstrative.', 'ដើរជុំវិញបន្ទប់របស់អ្នក។ ចង្អុលទៅវត្ថុ ៥ នៅជិតអ្នក និង ៥ នៅឆ្ងាយពីអ្នក ហើយនិយាយពាក្យចង្អុលត្រឹមត្រូវ។')),
        ('ttt-hw-2', ('Write 4 sentences: one with this, one with that, one with these, one with those.', 'សរសេរប្រយោគ ៤៖ មួយជាមួយ this, មួយជាមួយ that, មួយជាមួយ these, មួយជាមួយ those។')),
    ],
    [
        {'id': 'ttt-q-1', 'q': ('Which word do you use for a book in your hand?', 'តើអ្នកប្រើពាក្យអ្វីសម្រាប់សៀវភៅនៅក្នុងដៃរបស់អ្នក?'), 'opts': [('This', 'This'), ('That', 'That'), ('These', 'These'), ('Those', 'Those')], 'ans': 'This', 'exp': ('A book in your hand is near, singular — use "this".', 'សៀវភៅនៅក្នុងដៃរបស់អ្នកគឺនៅជិត ឯកវចនៈ — ប្រើ "this"។')},
        {'id': 'ttt-q-2', 'q': ('Which word do you use for chairs across the room?', 'តើអ្នកប្រើពាក្យអ្វីសម្រាប់កៅអីនៅត្រើយម្ខាងបន្ទប់?'), 'opts': [('This', 'This'), ('That', 'That'), ('These', 'These'), ('Those', 'Those')], 'ans': 'Those', 'exp': ('Chairs across the room are far and plural — use "those".', 'កៅអីនៅត្រើយម្ខាងបន្ទប់គឺឆ្ងាយ និងពហុវចនៈ — ប្រើ "those"។')},
        {'id': 'ttt-q-3', 'q': ('Complete: "___ are my friends standing next to me."', 'បំពេញ៖ "___ are my friends standing next to me."'), 'opts': [('This', 'This'), ('That', 'That'), ('These', 'These'), ('Those', 'Those')], 'ans': 'These', 'exp': ('Friends next to you are near and plural — use "these".', 'មិត្តភក្តិនៅក្បែរអ្នកគឺនៅជិត និងពហុវចនៈ — ប្រើ "these"។')},
    ],
    ['this', 'that', 'these', 'those', 'pen', 'book', 'car', 'chair', 'phone', 'bag', 'key', 'shoe']
)
L9 = Lesson(
    'some-any', 'Some / Any', 'Some / Any',
    'beginner', 'unit-1', 'ch-6-quantifiers', 9, 10,
    'Use "some" in positive sentences and offers/requests. Use "any" in negative sentences and questions. Both are used with uncountable nouns and plural countable nouns.',
    'ប្រើ "some" ក្នុងប្រយោគបញ្ជាក់ និងការផ្តល់ជូន/សំណើ។ ប្រើ "any" ក្នុងប្រយោគអវិជ្ជមាន និងសំណួរ។ ទាំងពីរត្រូវបានប្រើជាមួយនាមរាប់មិនបាន និងនាមរាប់បានពហុវចនៈ។',
    'Subject + verb + some + noun',
    [('I have some water.', 'ខ្ញុំមានទឹកខ្លះ។'), ('She has some books.', 'នាងមានសៀវភៅខ្លះ។'), ('They need some help.', 'ពួកគេត្រូវការជំនួយខ្លះ។'), ('We want some rice.', 'ពួកយើងចង់បានបាយខ្លះ។'), ('I bought some apples.', 'ខ្ញុំបានទិញផ្លែប៉ោមខ្លះ។')],
    'Subject + do/does not + verb + any + noun',
    [('I do not have any water.', 'ខ្ញុំមិនមានទឹកទេ។'), ('She does not have any books.', 'នាងមិនមានសៀវភៅទេ។'), ('They do not need any help.', 'ពួកគេមិនត្រូវការជំនួយទេ។'), ('We do not want any rice.', 'ពួកយើងមិនចង់បានបាយទេ។'), ('I did not buy any apples.', 'ខ្ញុំមិនបានទិញផ្លែប៉ោមទេ។')],
    'Do/Does + subject + verb + any + noun?',
    [('Do you have any water?', 'តើអ្នកមានទឹកទេ?'), ('Does she have any books?', 'តើនាងមានសៀវភៅទេ?'), ('Do they need any help?', 'តើពួកគេត្រូវការជំនួយទេ?'), ('Do you want any rice?', 'តើអ្នកចង់បានបាយទេ?'), ('Did you buy any apples?', 'តើអ្នកបានទិញផ្លែប៉ោមទេ?')],
    [
        ('"I have any water."', '"I have some water."', ('Use "some" in positive sentences.', 'ប្រើ "some" ក្នុងប្រយោគបញ្ជាក់។')),
        ('"I do not have some water."', '"I do not have any water."', ('Use "any" in negative sentences.', 'ប្រើ "any" ក្នុងប្រយោគអវិជ្ជមាន។')),
        ('"Do you have some water?" (general question)', '"Do you have any water?"', ('Use "any" in most questions. Use "some" for offers/requests.', 'ប្រើ "any" ក្នុងសំណួរភាគច្រើន។ ប្រើ "some" សម្រាប់ការផ្តល់ជូន/សំណើ។')),
    ],
    [
        {'id': 'sa-ex-1', 'q': ('Choose: "I have ___ (some/any) money."', 'ជ្រើសរើស៖ "I have ___ (some/any) money."'), 'opts': [('some', 'some'), ('any', 'any'), ('a', 'a'), ('an', 'an')], 'ans': 'some', 'exp': ('Use "some" in positive sentences.', 'ប្រើ "some" ក្នុងប្រយោគបញ្ជាក់។')},
        {'id': 'sa-ex-2', 'q': ('Choose: "I do not have ___ (some/any) money."', 'ជ្រើសរើស៖ "I do not have ___ (some/any) money."'), 'opts': [('some', 'some'), ('any', 'any'), ('a', 'a'), ('an', 'an')], 'ans': 'any', 'exp': ('Use "any" in negative sentences with "not".', 'ប្រើ "any" ក្នុងប្រយោគអវិជ្ជមានជាមួយ "not"។')},
        {'id': 'sa-ex-3', 'q': ('Choose: "Do you have ___ (some/any) children?"', 'ជ្រើសរើស៖ "Do you have ___ (some/any) children?"'), 'opts': [('some', 'some'), ('any', 'any'), ('a', 'a'), ('an', 'an')], 'ans': 'any', 'exp': ('Use "any" in questions.', 'ប្រើ "any" ក្នុងសំណួរ។')},
        {'id': 'sa-ex-4', 'q': ('Complete: "Would you like ___ (some/any) tea?" (offer)', 'បំពេញ៖ "Would you like ___ (some/any) tea?" (ការផ្តល់ជូន)'), 'opts': [('some', 'some'), ('any', 'any'), ('a', 'a'), ('the', 'the')], 'ans': 'some', 'exp': ('Use "some" in offers and requests even in question form.', 'ប្រើ "some" ក្នុងការផ្តល់ជូន និងសំណើ សូម្បីតែក្នុងទម្រង់សំណួរ។')},
        {'id': 'sa-ex-5', 'q': ('Choose the correct sentence:', 'ជ្រើសរើសប្រយោគត្រឹមត្រូវ៖'), 'opts': [('She has any cats.', 'She has any cats.'), ('She does not have some cats.', 'She does not have some cats.'), ('She does not have any cats.', 'She does not have any cats.'), ('She not have any cats.', 'She not have any cats.')], 'ans': 'She does not have any cats.', 'exp': ('Negative sentence needs "does not" + "any".', 'ប្រយោគអវិជ្ជមានត្រូវការ "does not" + "any"។')},
    ],
    [
        ('sa-hw-1', ('Write 5 positive sentences using "some" and 5 negative sentences using "any".', 'សរសេរប្រយោគបញ្ជាក់ ៥ ដោយប្រើ "some" និងប្រយោគអវិជ្ជមាន ៥ ដោយប្រើ "any"។')),
        ('sa-hw-2', ('Ask 5 questions using "any".', 'សួរសំណួរ ៥ ដោយប្រើ "any"។')),
    ],
    [
        {'id': 'sa-q-1', 'q': ('"I have ___ friends in the city."', '"I have ___ friends in the city."'), 'opts': [('some', 'some'), ('any', 'any'), ('a', 'a'), ('an', 'an')], 'ans': 'some', 'exp': ('Use "some" in positive statements.', 'ប្រើ "some" ក្នុងប្រយោគបញ្ជាក់។')},
        {'id': 'sa-q-2', 'q': ('"There is not ___ milk in the fridge."', '"There is not ___ milk in the fridge."'), 'opts': [('some', 'some'), ('any', 'any'), ('a', 'a'), ('many', 'many')], 'ans': 'any', 'exp': ('Use "any" after "not" in negative sentences.', 'ប្រើ "any" បន្ទាប់ពី "not" ក្នុងប្រយោគអវិជ្ជមាន។')},
        {'id': 'sa-q-3', 'q': ('"Can I have ___ water, please?" (request)', '"Can I have ___ water, please?" (សំណើ)'), 'opts': [('some', 'some'), ('any', 'any'), ('a', 'a'), ('an', 'an')], 'ans': 'some', 'exp': ('Use "some" in polite requests.', 'ប្រើ "some" ក្នុងសំណើគួរសម។')},
    ],
    ['some', 'any', 'water', 'rice', 'help', 'money', 'book', 'tea', 'milk', 'friend', 'apple', 'child']
)
L10 = Lesson(
    'countable-uncountable', 'Countable & Uncountable Nouns', 'នាមរាប់បាន និង រាប់មិនបាន',
    'beginner', 'unit-1', 'ch-6-quantifiers', 10, 15,
    'Countable nouns can be counted (one apple, two apples). Uncountable nouns cannot be counted (water, rice, milk). Use "a/an" with singular countable nouns. Use "some/any" with uncountable and plural countable nouns.',
    'នាមរាប់បានអាចរាប់បាន (ផ្លែប៉ោមមួយ ផ្លែប៉ោមពីរ)។ នាមរាប់មិនបានមិនអាចរាប់បានទេ (ទឹក បាយ ទឹកដោះគោ)។ ប្រើ "a/an" ជាមួយនាមរាប់បានឯកវចនៈ។ ប្រើ "some/any" ជាមួយនាមរាប់មិនបាន និងនាមរាប់បានពហុវចនៈ។',
    'Countable: a/an + singular | number + plural. Uncountable: some + uncountable',
    [('I have a banana.', 'ខ្ញុំមានចេកមួយ។'), ('She has two bananas.', 'នាងមានចេកពីរ។'), ('We have some rice.', 'ពួកយើងមានបាយខ្លះ។'), ('He drinks milk every day.', 'គាត់ផឹកទឹកដោះគោរាល់ថ្ងៃ។'), ('They have three cars.', 'ពួកគេមានឡានបី។')],
    'Countable: do/does not have + a/an/any + noun. Uncountable: do/does not have + any + noun',
    [('I do not have a banana.', 'ខ្ញុំមិនមានចេកទេ។'), ('She does not have any bananas.', 'នាងមិនមានចេកទេ។'), ('We do not have any rice.', 'ពួកយើងមិនមានបាយទេ។'), ('He does not drink milk.', 'គាត់មិនផឹកទឹកដោះគោទេ។'), ('They do not have a car.', 'ពួកគេមិនមានឡានទេ។')],
    'Do/Does + subject + have + any + noun? | How many/much?',
    [('Do you have a banana?', 'តើអ្នកមានចេកទេ?'), ('Does she have any bananas?', 'តើនាងមានចេកទេ?'), ('Do you have any rice?', 'តើអ្នកមានបាយទេ?'), ('How many apples do you have?', 'តើអ្នកមានផ្លែប៉ោមប៉ុន្មាន?'), ('How much water do you need?', 'តើអ្នកត្រូវការទឹកប៉ុន្មាន?')],
    [
        ('"I have many rice."', '"I have a lot of rice." / "I have some rice."', ('"Rice" is uncountable. Use "much" or "a lot of", not "many".', '"Rice" ជានាមរាប់មិនបាន។ ប្រើ "much" ឬ "a lot of" មិនមែន "many"។')),
        ('"I need a milk."', '"I need some milk."', ('Do not use "a/an" with uncountable nouns.', 'កុំប្រើ "a/an" ជាមួយនាមរាប់មិនបាន។')),
        ('"I have two rices."', '"I have two bowls of rice."', ('Uncountable nouns do not have a plural form.', 'នាមរាប់មិនបានគ្មានទម្រង់ពហុវចនៈទេ។')),
    ],
    [
        {'id': 'cu-ex-1', 'q': ('Which is countable?', 'តើមួយណារាប់បាន?'), 'opts': [('water', 'water'), ('rice', 'rice'), ('apple', 'apple'), ('milk', 'milk')], 'ans': 'apple', 'exp': ('"Apple" is countable — you can say one apple, two apples.', '"Apple" រាប់បាន — អ្នកអាចនិយាយបានថា ផ្លែប៉ោមមួយ ផ្លែប៉ោមពីរ។')},
        {'id': 'cu-ex-2', 'q': ('Which is uncountable?', 'តើមួយណារាប់មិនបាន?'), 'opts': [('banana', 'banana'), ('car', 'car'), ('water', 'water'), ('book', 'book')], 'ans': 'water', 'exp': ('"Water" is uncountable — you cannot say "one water".', '"Water" រាប់មិនបាន — អ្នកមិនអាចនិយាយ "one water" បានទេ។')},
        {'id': 'cu-ex-3', 'q': ('Complete: "I need ___ (a/some) milk."', 'បំពេញ៖ "I need ___ (a/some) milk."'), 'opts': [('a', 'a'), ('an', 'an'), ('some', 'some'), ('many', 'many')], 'ans': 'some', 'exp': ('"Milk" is uncountable, so use "some" not "a".', '"Milk" រាប់មិនបាន ដូច្នេះប្រើ "some" មិនមែន "a"។')},
        {'id': 'cu-ex-4', 'q': ('Complete: "I have three ___ (book/books)."', 'បំពេញ៖ "I have three ___ (book/books)."'), 'opts': [('book', 'book'), ('books', 'books'), ('a book', 'a book'), ('some book', 'some book')], 'ans': 'books', 'exp': ('Use plural form "books" after the number three.', 'ប្រើទម្រង់ពហុវចនៈ "books" បន្ទាប់ពីលេខបី។')},
        {'id': 'cu-ex-5', 'q': ('Choose the correct sentence:', 'ជ្រើសរើសប្រយោគត្រឹមត្រូវ៖'), 'opts': [('I have a rice.', 'I have a rice.'), ('I have some rices.', 'I have some rices.'), ('I have some rice.', 'I have some rice.'), ('I have many rice.', 'I have many rice.')], 'ans': 'I have some rice.', 'exp': ('"Rice" is uncountable. Use "some" + uncountable noun (no plural).', '"Rice" រាប់មិនបាន។ ប្រើ "some" + នាមរាប់មិនបាន (គ្មានពហុវចនៈ)។')},
    ],
    [
        ('cu-hw-1', ('List 10 countable and 10 uncountable nouns in your kitchen.', 'រាយនាមរាប់បាន ១០ និងនាមរាប់មិនបាន ១០ នៅក្នុងផ្ទះបាយរបស់អ្នក។')),
        ('cu-hw-2', ('Write 5 sentences using countable nouns and 5 using uncountable nouns.', 'សរសេរប្រយោគ ៥ ដោយប្រើនាមរាប់បាន និង ៥ ដោយប្រើនាមរាប់មិនបាន។')),
    ],
    [
        {'id': 'cu-q-1', 'q': ('Which sentence is correct?', 'តើប្រយោគមួយណាត្រឹមត្រូវ?'), 'opts': [('I need a water.', 'I need a water.'), ('I need some water.', 'I need some water.'), ('I need waters.', 'I need waters.'), ('I need a waters.', 'I need a waters.')], 'ans': 'I need some water.', 'exp': ('"Water" is uncountable. Use "some" with uncountable nouns.', '"Water" រាប់មិនបាន។ ប្រើ "some" ជាមួយនាមរាប់មិនបាន។')},
        {'id': 'cu-q-2', 'q': ('"I have two ___." Choose the correct noun.', '"I have two ___." ជ្រើសរើសនាមត្រឹមត្រូវ។'), 'opts': [('children', 'children'), ('childs', 'childs'), ('child', 'child'), ('childes', 'childes')], 'ans': 'children', 'exp': ('"Children" is the irregular plural of "child".', '"Children" ជាពហុវចនៈមិនទៀងទាត់របស់ "child"។')},
        {'id': 'cu-q-3', 'q': ('"How ___ (many/much) sugar do you want?"', '"How ___ (many/much) sugar do you want?"'), 'opts': [('many', 'many'), ('much', 'much'), ('a lot', 'a lot'), ('some', 'some')], 'ans': 'much', 'exp': ('"Sugar" is uncountable, so use "how much".', '"Sugar" រាប់មិនបាន ដូច្នេះប្រើ "how much"។')},
    ],
    ['countable', 'uncountable', 'apple', 'banana', 'rice', 'water', 'milk', 'sugar', 'car', 'book', 'child', 'rice', 'milk', 'water', 'car', 'book', 'banana']
)
L11 = Lesson(
    'there-is-there-are', 'There Is / There Are', 'There Is / There Are',
    'beginner', 'unit-1', 'ch-6-quantifiers', 11, 10,
    'Use "there is" with singular and uncountable nouns. Use "there are" with plural nouns. "There is/are" talks about the existence of something.',
    'ប្រើ "there is" ជាមួយនាមឯកវចនៈ និងនាមរាប់មិនបាន។ ប្រើ "there are" ជាមួយនាមពហុវចនៈ។ "There is/are" និយាយអំពីអត្ថិភាពនៃអ្វីមួយ។',
    'There is + a/an/some + singular/uncountable noun | There are + plural noun',
    [('There is a book on the table.', 'មានសៀវភៅមួយនៅលើតុ។'), ('There is some milk in the fridge.', 'មានទឹកដោះគោខ្លះនៅក្នុងទូទឹកកក។'), ('There are three chairs in the room.', 'មានកៅអីបីនៅក្នុងបន្ទប់។'), ('There are many students in class.', 'មានសិស្សច្រើននាក់ក្នុងថ្នាក់។'), ('There is a cat under the bed.', 'មានឆ្មាមួយនៅក្រោមគ្រែ។')],
    'There is/are + not + any + noun',
    [('There is not a book on the table.', 'គ្មានសៀវភៅនៅលើតុទេ។'), ('There is not any milk in the fridge.', 'គ្មានទឹកដោះគោនៅក្នុងទូទឹកកកទេ។'), ('There are not any chairs in the room.', 'គ្មានកៅអីនៅក្នុងបន្ទប់ទេ។'), ('There are not many students in class.', 'គ្មានសិស្សច្រើននាក់ក្នុងថ្នាក់ទេ។'), ('There is not a cat under the bed.', 'គ្មានឆ្មានៅក្រោមគ្រែទេ។')],
    'Is/Are there + any + noun?',
    [('Is there a book on the table?', 'តើមានសៀវភៅនៅលើតុទេ?'), ('Is there any milk in the fridge?', 'តើមានទឹកដោះគោនៅក្នុងទូទឹកកកទេ?'), ('Are there any chairs in the room?', 'តើមានកៅអីនៅក្នុងបន្ទប់ទេ?'), ('Are there many students in class?', 'តើមានសិស្សច្រើននាក់ក្នុងថ្នាក់ទេ?'), ('Is there a cat under the bed?', 'តើមានឆ្មានៅក្រោមគ្រែទេ?')],
    [
        ('"There is three books."', '"There are three books."', ('Use "there are" before plural nouns.', 'ប្រើ "there are" មុខនាមពហុវចនៈ។')),
        ('"There are a book."', '"There is a book."', ('Use "there is" before singular nouns.', 'ប្រើ "there is" មុខនាមឯកវចនៈ។')),
        ('"There is not some milk."', '"There is not any milk."', ('Use "any" in negative sentences with "there is/are".', 'ប្រើ "any" ក្នុងប្រយោគអវិជ្ជមានជាមួយ "there is/are"។')),
    ],
    [
        {'id': 'tia-ex-1', 'q': ('Choose: "___ (There is/There are) a pen on the desk."', 'ជ្រើសរើស៖ "___ (There is/There are) a pen on the desk."'), 'opts': [('There is', 'There is'), ('There are', 'There are'), ('Is there', 'Is there'), ('Are there', 'Are there')], 'ans': 'There is', 'exp': ('"Pen" is singular, so use "there is".', '"Pen" ជាឯកវចនៈ ដូច្នេះប្រើ "there is"។')},
        {'id': 'tia-ex-2', 'q': ('Choose: "___ (There is/There are) two cats in the garden."', 'ជ្រើសរើស៖ "___ (There is/There are) two cats in the garden."'), 'opts': [('There is', 'There is'), ('There are', 'There are'), ('Is there', 'Is there'), ('Are there', 'Are there')], 'ans': 'There are', 'exp': ('"Two cats" is plural, so use "there are".', '"Two cats" ជាពហុវចនៈ ដូច្នេះប្រើ "there are"។')},
        {'id': 'tia-ex-3', 'q': ('Complete: "___ (Is/Are) there any milk?"', 'បំពេញ៖ "___ (Is/Are) there any milk?"'), 'opts': [('Is', 'Is'), ('Are', 'Are'), ('Do', 'Do'), ('Does', 'Does')], 'ans': 'Is', 'exp': ('"Milk" is uncountable, so use "Is there".', '"Milk" រាប់មិនបាន ដូច្នេះប្រើ "Is there"។')},
        {'id': 'tia-ex-4', 'q': ('Choose the correct negative: "There ___ (is not/are not) any chairs."', 'ជ្រើសរើសប្រយោគអវិជ្ជមានត្រឹមត្រូវ៖ "There ___ (is not/are not) any chairs."'), 'opts': [('is not', 'is not'), ('are not', 'are not'), ('do not', 'do not'), ('does not', 'does not')], 'ans': 'are not', 'exp': ('"Chairs" is plural, so use "there are not".', '"Chairs" ជាពហុវចនៈ ដូច្នេះប្រើ "there are not"។')},
        {'id': 'tia-ex-5', 'q': ('Choose the correct sentence:', 'ជ្រើសរើសប្រយោគត្រឹមត្រូវ៖'), 'opts': [('There is a book on table.', 'There is a book on table.'), ('There is a book on the table.', 'There is a book on the table.'), ('There are a book on the table.', 'There are a book on the table.'), ('There is book on the table.', 'There is book on the table.')], 'ans': 'There is a book on the table.', 'exp': ('Singular noun "book" needs "there is" + "a" + "the table".', 'នាមឯកវចនៈ "book" ត្រូវការ "there is" + "a" + "the table"។')},
    ],
    [
        ('tia-hw-1', ('Look around your room and write 5 sentences with "There is" and 5 with "There are".', 'មើលជុំវិញបន្ទប់របស់អ្នក ហើយសរសេរប្រយោគ ៥ ជាមួយ "There is" និង ៥ ជាមួយ "There are"។')),
        ('tia-hw-2', ('Describe your kitchen using "There is" and "There are".', 'ពិពណ៌នាអំពីផ្ទះបាយរបស់អ្នកដោយប្រើ "There is" និង "There are"។')),
    ],
    [
        {'id': 'tia-q-1', 'q': ('"There ___ a restaurant near my house."', '"There ___ a restaurant near my house."'), 'opts': [('is', 'is'), ('are', 'are'), ('am', 'am'), ('be', 'be')], 'ans': 'is', 'exp': ('"Restaurant" is singular, so use "there is".', '"Restaurant" ជាឯកវចនៈ ដូច្នេះប្រើ "there is"។')},
        {'id': 'tia-q-2', 'q': ('"___ there any students in the library?"', '"___ there any students in the library?"'), 'opts': [('Is', 'Is'), ('Are', 'Are'), ('Do', 'Do'), ('Does', 'Does')], 'ans': 'Are', 'exp': ('"Students" is plural, so use "are there".', '"Students" ជាពហុវចនៈ ដូច្នេះប្រើ "are there"។')},
        {'id': 'tia-q-3', 'q': ('"There is not ___ water in the bottle."', '"There is not ___ water in the bottle."'), 'opts': [('some', 'some'), ('any', 'any'), ('a', 'a'), ('many', 'many')], 'ans': 'any', 'exp': ('Use "any" in negative sentences with "there is".', 'ប្រើ "any" ក្នុងប្រយោគអវិជ្ជមានជាមួយ "there is"។')},
        {'id': 'tia-q-4', 'q': ('"There are many ___ (child/children) in the park."', '"There are many ___ (child/children) in the park."'), 'opts': [('child', 'child'), ('children', 'children'), ('childs', 'childs'), ('childes', 'childes')], 'ans': 'children', 'exp': ('"Children" is the plural of "child".', '"Children" ជាពហុវចនៈរបស់ "child"។')},
    ],
    ['there-is', 'there-are', 'book', 'table', 'milk', 'fridge', 'chair', 'room', 'student', 'class', 'cat', 'bed', 'pen', 'desk', 'garden', 'restaurant', 'library', 'park', 'water', 'bottle']
)
L12 = Lesson(
    'much-many', 'Much / Many', 'Much / Many',
    'beginner', 'unit-1', 'ch-6-quantifiers', 12, 10,
    'Use "many" with countable plural nouns (many books). Use "much" with uncountable nouns (much water). Both ask about quantity. Use "a lot of" with both types in positive sentences.',
    'ប្រើ "many" ជាមួយនាមរាប់បានពហុវចនៈ (សៀវភៅច្រើន)។ ប្រើ "much" ជាមួយនាមរាប់មិនបាន (ទឹកច្រើន)។ ទាំងពីរសួរអំពីបរិមាណ។ ប្រើ "a lot of" ជាមួយទាំងពីរក្នុងប្រយោគបញ្ជាក់។',
    'Subject + have/verb + many + plural countable noun | much + uncountable noun',
    [('I have many books.', 'ខ្ញុំមានសៀវភៅច្រើន។'), ('She has much homework.', 'នាងមានកិច្ចការផ្ទះច្រើន។'), ('They have many friends.', 'ពួកគេមានមិត្តភក្តិច្រើន។'), ('We have much work to do.', 'ពួកយើងមានការងារច្រើនត្រូវធ្វើ។'), ('He drinks much water every day.', 'គាត់ផឹកទឹកច្រើនរាល់ថ្ងៃ។')],
    'Subject + do/does not + have + many/much + noun',
    [('I do not have many books.', 'ខ្ញុំមិនមានសៀវភៅច្រើនទេ។'), ('She does not have much homework.', 'នាងមិនមានកិច្ចការផ្ទះច្រើនទេ។'), ('They do not have many friends.', 'ពួកគេមិនមានមិត្តភក្តិច្រើនទេ។'), ('We do not have much time.', 'ពួកយើងមិនមានពេលច្រើនទេ។'), ('He does not drink much coffee.', 'គាត់មិនផឹកកាហ្វេច្រើនទេ។')],
    'How many + plural countable noun? | How much + uncountable noun?',
    [('How many books do you have?', 'តើអ្នកមានសៀវភៅប៉ុន្មាន?'), ('How much homework do you have?', 'តើអ្នកមានកិច្ចការផ្ទះប៉ុន្មាន?'), ('How many friends does she have?', 'តើនាងមានមិត្តភក្តិប៉ុន្មាននាក់?'), ('How much water do you drink?', 'តើអ្នកផឹកទឹកប៉ុន្មាន?'), ('How many students are in your class?', 'តើមានសិស្សប៉ុន្មាននាក់ក្នុងថ្នាក់របស់អ្នក?')],
    [
        ('"I have many water."', '"I have a lot of water." / "I have much water."', ('"Water" is uncountable. Use "much" or "a lot of", not "many".', '"Water" រាប់មិនបាន។ ប្រើ "much" ឬ "a lot of" មិនមែន "many"។')),
        ('"How much books do you have?"', '"How many books do you have?"', ('"Books" is countable. Use "how many" with countable nouns.', '"Books" រាប់បាន។ ប្រើ "how many" ជាមួយនាមរាប់បាន។')),
        ('"I do not have much friends."', '"I do not have many friends."', ('"Friends" is countable. Use "many" with plural countable nouns in negatives.', '"Friends" រាប់បាន។ ប្រើ "many" ជាមួយនាមរាប់បានពហុវចនៈក្នុងប្រយោគអវិជ្ជមាន។')),
    ],
    [
        {'id': 'mm-ex-1', 'q': ('Choose: "How ___ (many/much) apples do you want?"', 'ជ្រើសរើស៖ "How ___ (many/much) apples do you want?"'), 'opts': [('many', 'many'), ('much', 'much'), ('a lot', 'a lot'), ('some', 'some')], 'ans': 'many', 'exp': ('"Apples" is countable, so use "how many".', '"Apples" រាប់បាន ដូច្នេះប្រើ "how many"។')},
        {'id': 'mm-ex-2', 'q': ('Choose: "How ___ (many/much) sugar do you need?"', 'ជ្រើសរើស៖ "How ___ (many/much) sugar do you need?"'), 'opts': [('many', 'many'), ('much', 'much'), ('a lot', 'a lot'), ('some', 'some')], 'ans': 'much', 'exp': ('"Sugar" is uncountable, so use "how much".', '"Sugar" រាប់មិនបាន ដូច្នេះប្រើ "how much"។')},
        {'id': 'mm-ex-3', 'q': ('Complete: "I do not have ___ (many/much) money."', 'បំពេញ៖ "I do not have ___ (many/much) money."'), 'opts': [('many', 'many'), ('much', 'much'), ('a lot', 'a lot'), ('some', 'some')], 'ans': 'much', 'exp': ('"Money" is uncountable, so use "much".', '"Money" រាប់មិនបាន ដូច្នេះប្រើ "much"។')},
        {'id': 'mm-ex-4', 'q': ('Complete: "She has ___ (many/much) books."', 'បំពេញ៖ "She has ___ (many/much) books."'), 'opts': [('many', 'many'), ('much', 'much'), ('a lot of', 'a lot of'), ('some', 'some')], 'ans': 'many', 'exp': ('"Books" is countable, so use "many" in positive statements.', '"Books" រាប់បាន ដូច្នេះប្រើ "many" ក្នុងប្រយោគបញ្ជាក់។')},
        {'id': 'mm-ex-5', 'q': ('Choose the correct sentence:', 'ជ្រើសរើសប្រយោគត្រឹមត្រូវ៖'), 'opts': [('How many rice do you eat?', 'How many rice do you eat?'), ('How much rice do you eat?', 'How much rice do you eat?'), ('How much rices do you eat?', 'How much rices do you eat?'), ('How many rices do you eat?', 'How many rices do you eat?')], 'ans': 'How much rice do you eat?', 'exp': ('"Rice" is uncountable, so use "how much".', '"Rice" រាប់មិនបាន ដូច្នេះប្រើ "how much"។')},
    ],
    [
        ('mm-hw-1', ('Write 5 questions with "How many" and 5 with "How much".', 'សរសេរសំណួរ ៥ ជាមួយ "How many" និង ៥ ជាមួយ "How much"។')),
        ('mm-hw-2', ('Count 10 things in your room and ask "How many" questions about them.', 'រាប់វត្ថុ ១០ នៅក្នុងបន្ទប់របស់អ្នក ហើយសួរសំណួរ "How many" អំពីពួកវា។')),
    ],
    [
        {'id': 'mm-q-1', 'q': ('"How ___ people are in your family?"', '"How ___ people are in your family?"'), 'opts': [('many', 'many'), ('much', 'much'), ('a lot', 'a lot'), ('some', 'some')], 'ans': 'many', 'exp': ('"People" is countable, so use "how many".', '"People" រាប់បាន ដូច្នេះប្រើ "how many"។')},
        {'id': 'mm-q-2', 'q': ('"I do not have ___ time."', '"I do not have ___ time."'), 'opts': [('many', 'many'), ('much', 'much'), ('a lot', 'a lot'), ('some', 'some')], 'ans': 'much', 'exp': ('"Time" is uncountable, so use "much".', '"Time" រាប់មិនបាន ដូច្នេះប្រើ "much"។')},
        {'id': 'mm-q-3', 'q': ('"How ___ is this bag? It is $50."', '"How ___ is this bag? It is $50."'), 'opts': [('many', 'many'), ('much', 'much'), ('a lot', 'a lot'), ('some', 'some')], 'ans': 'much', 'exp': ('"How much" asks about price.', '"How much" សួរអំពីតម្លៃ។')},
    ],
    ['many', 'much', 'book', 'homework', 'friend', 'work', 'water', 'time', 'coffee', 'money', 'sugar', 'rice', 'people', 'family', 'apple', 'student']
)
L13 = Lesson(
    'can', 'Can (Ability & Permission)', 'Can (សមត្ថភាព និង ការអនុញ្ញាត)',
    'beginner', 'unit-1', 'ch-7-modals', 13, 10,
    'Use "can" to talk about ability (what you are able to do) and permission (what is allowed). "Can" is followed by the base verb. It does not change with he/she/it.',
    'ប្រើ "can" ដើម្បីនិយាយអំពីសមត្ថភាព (អ្វីដែលអ្នកអាចធ្វើបាន) និងការអនុញ្ញាត (អ្វីដែលត្រូវបានអនុញ្ញាត)។ "Can" ត្រូវបានបន្តដោយកិរិយាស័ព្ទដើម។ វាមិនផ្លាស់ប្តូរជាមួយ he/she/it ទេ។',
    'Subject + can + base verb',
    [('I can swim.', 'ខ្ញុំអាចហែលទឹកបាន។'), ('She can speak English.', 'នាងអាចនិយាយភាសាអង់គ្លេសបាន។'), ('He can play guitar.', 'គាត់អាចលេងហ្គីតាបាន។'), ('They can come to the party.', 'ពួកគេអាចមកជប់លៀងបាន។'), ('You can sit here.', 'អ្នកអាចអង្គុយនៅទីនេះបាន។')],
    'Subject + cannot (can\'t) + base verb',
    [('I cannot swim.', 'ខ្ញុំមិនអាចហែលទឹកបានទេ។'), ('She cannot speak French.', 'នាងមិនអាចនិយាយភាសាបារាំងបានទេ។'), ('He cannot play piano.', 'គាត់មិនអាចលេងព្យាណូបានទេ។'), ('They cannot come to the party.', 'ពួកគេមិនអាចមកជប់លៀងបានទេ។'), ('You cannot park here.', 'អ្នកមិនអាចចតនៅទីនេះបានទេ។')],
    'Can + subject + base verb?',
    [('Can you swim? Yes, I can.', 'តើអ្នកអាចហែលទឹកបានទេ? បាទ ខ្ញុំអាច។'), ('Can she speak English? No, she cannot.', 'តើនាងអាចនិយាយភាសាអង់គ្លេសបានទេ? ទេ នាងមិនអាចទេ។'), ('Can he play guitar? Yes, he can.', 'តើគាត់អាចលេងហ្គីតាបានទេ? បាទ គាត់អាច។'), ('Can they come? Yes, they can.', 'តើពួកគេអាចមកបានទេ? បាទ ពួកគេអាច។'), ('Can I sit here? Yes, you can.', 'តើខ្ញុំអាចអង្គុយនៅទីនេះបានទេ? បាទ អ្នកអាច។')],
    [
        ('"He can swims."', '"He can swim."', ('After "can", use the base verb without "s".', 'បន្ទាប់ពី "can" ប្រើកិរិយាស័ព្ទដើមដោយគ្មាន "s"។')),
        ('"She cans swim."', '"She can swim."', ('"Can" does not change with he/she/it. Do not add "s" to "can".', '"Can" មិនផ្លាស់ប្តូរជាមួយ he/she/it ទេ។ កុំបន្ថែម "s" ទៅ "can"។')),
        ('"I no can swim."', '"I cannot swim." / "I can\'t swim."', ('The negative of "can" is "cannot" or "can\'t", not "no can".', 'ទម្រង់អវិជ្ជមានរបស់ "can" គឺ "cannot" ឬ "can\'t" មិនមែន "no can"។')),
    ],
    [
        {'id': 'can-ex-1', 'q': ('Complete: "She ___ (can/cans) dance."', 'បំពេញ៖ "She ___ (can/cans) dance."'), 'opts': [('can', 'can'), ('cans', 'cans'), ('can to', 'can to'), ('canning', 'canning')], 'ans': 'can', 'exp': ('"Can" does not change. Use "can" with all subjects.', '"Can" មិនផ្លាស់ប្តូរទេ។ ប្រើ "can" ជាមួយប្រធានទាំងអស់។')},
        {'id': 'can-ex-2', 'q': ('Choose the negative: "He ___ (cannot/cans not) drive."', 'ជ្រើសរើសទម្រង់អវិជ្ជមាន៖ "He ___ (cannot/cans not) drive."'), 'opts': [('cannot', 'cannot'), ('cans not', 'cans not'), ('can not to', 'can not to'), ('no can', 'no can')], 'ans': 'cannot', 'exp': ('The negative is "cannot" (one word) or "can\'t".', 'ទម្រង់អវិជ្ជមានគឺ "cannot" (មួយពាក្យ) ឬ "can\'t"។')},
        {'id': 'can-ex-3', 'q': ('Complete: "___ (Can/Does) you play chess?"', 'បំពេញ៖ "___ (Can/Does) you play chess?"'), 'opts': [('Can', 'Can'), ('Does', 'Does'), ('Do', 'Do'), ('Is', 'Is')], 'ans': 'Can', 'exp': ('Use "can" to ask about ability or permission.', 'ប្រើ "can" ដើម្បីសួរអំពីសមត្ថភាព ឬការអនុញ្ញាត។')},
        {'id': 'can-ex-4', 'q': ('Fill in: "She ___ (can/can\'t) fly because she is not a bird."', 'បំពេញ៖ "She ___ (can/can\'t) fly because she is not a bird."'), 'opts': [('can', 'can'), ('can\'t', 'can\'t'), ('cannot to', 'cannot to'), ('no can', 'no can')], 'ans': 'can\'t', 'exp': ('Use "can\'t" to show inability.', 'ប្រើ "can\'t" ដើម្បីបង្ហាញភាពមិនអាច។')},
        {'id': 'can-ex-5', 'q': ('Choose the correct sentence:', 'ជ្រើសរើសប្រយោគត្រឹមត្រូវ៖'), 'opts': [('I can to swim.', 'I can to swim.'), ('I can swim.', 'I can swim.'), ('I can swimming.', 'I can swimming.'), ('I can swam.', 'I can swam.')], 'ans': 'I can swim.', 'exp': ('After "can", use the base verb without "to".', 'បន្ទាប់ពី "can" ប្រើកិរិយាស័ព្ទដើមដោយគ្មាន "to"។')},
    ],
    [
        ('can-hw-1', ('Write 5 things you can do and 5 things you cannot do.', 'សរសេរអ្វី ៥ ដែលអ្នកអាចធ្វើបាន និង ៥ ដែលអ្នកមិនអាចធ្វើបាន។')),
        ('can-hw-2', ('Ask 3 friends "Can you..." questions and write their answers.', 'សួរមិត្តភក្តិ ៣ នាក់នូវសំណួរ "Can you..." ហើយសរសេរចម្លើយរបស់ពួកគេ។')),
    ],
    [
        {'id': 'can-q-1', 'q': ('"___ you help me, please?"', '"___ you help me, please?"'), 'opts': [('Can', 'Can'), ('Do', 'Do'), ('Are', 'Are'), ('Have', 'Have')], 'ans': 'Can', 'exp': ('Use "can" to ask for help politely.', 'ប្រើ "can" ដើម្បីសុំជំនួយដោយគួរសម។')},
        {'id': 'can-q-2', 'q': ('"She ___ (can/can\'t) speak three languages." (She is talented.)', '"She ___ (can/can\'t) speak three languages."'), 'opts': [('can', 'can'), ('can\'t', 'can\'t'), ('cannot to', 'cannot to'), ('no can', 'no can')], 'ans': 'can', 'exp': ('"Can" shows ability. She has the ability to speak three languages.', '"Can" បង្ហាញសមត្ថភាព។ នាងមានសមត្ថភាពនិយាយបីភាសា។')},
        {'id': 'can-q-3', 'q': ('"I ___ (can/can\'t) come to the party. I am busy."', '"I ___ (can/can\'t) come to the party. I am busy."'), 'opts': [('can', 'can'), ('can\'t', 'can\'t'), ('cannot to', 'cannot to'), ('no can', 'no can')], 'ans': 'can\'t', 'exp': ('Use "can\'t" because being busy means you are not able to come.', 'ប្រើ "can\'t" ព្រោះការរវល់មានន័យថាអ្នកមិនអាចមកបានទេ។')},
    ],
    ['can', 'cannot', 'ability', 'permission', 'swim', 'speak', 'play', 'guitar', 'piano', 'dance', 'drive', 'fly', 'swim', 'chess', 'help', 'come', 'sit', 'park']
)
L14 = Lesson(
    'conjunctions', 'Conjunctions', 'ឈ្នាប់',
    'beginner', 'unit-1', 'ch-7-modals', 14, 10,
    'Conjunctions connect words, phrases, or sentences. Common conjunctions: "and" (add information), "but" (show contrast), "or" (show a choice), "because" (show a reason), "so" (show a result).',
    'ឈ្នាប់ភ្ជាប់ពាក្យ ឃ្លា ឬប្រយោគ។ ឈ្នាប់ទូទៅ៖ "and" (បន្ថែមព័ត៌មាន), "but" (បង្ហាញភាពផ្ទុយគ្នា), "or" (បង្ហាញជម្រើស), "because" (បង្ហាញមូលហេតុ), "so" (បង្ហាញលទ្ធផល)។',
    'Clause + conjunction + clause',
    [('I like cats and dogs.', 'ខ្ញុំចូលចិត្តឆ្មា និង ឆ្កែ។'), ('She is tired but happy.', 'នាងនឿយហត់ ប៉ុន្តែ រីករាយ។'), ('Do you want tea or coffee?', 'តើអ្នកចង់បានតែ ឬ កាហ្វេ?'), ('He is staying home because it is raining.', 'គាត់នៅផ្ទះ ព្រោះ ភ្លៀង។'), ('I was hungry so I ate rice.', 'ខ្ញុំឃ្លាន ដូច្នេះ ខ្ញុំញ៉ាំបាយ។')],
    'Subject + do/does not + verb + conjunction + clause',
    [('I do not like cats or dogs.', 'ខ្ញុំមិនចូលចិត្តឆ្មា ឬ ឆ្កែទេ។'), ('She is not tired but she is bored.', 'នាងមិននឿយហត់ទេ ប៉ុន្តែ នាងធុញទ្រាន់។'), ('He does not want tea or coffee.', 'គាត់មិនចង់បានតែ ឬ កាហ្វេទេ។'), ('I am not going because I am sick.', 'ខ្ញុំមិនទៅទេ ព្រោះ ខ្ញុំឈឺ។'), ('She did not study so she failed.', 'នាងមិនបានរៀនទេ ដូច្នេះ នាងធ្លាក់។')],
    'Question word + clause + conjunction + clause?',
    [('Do you like cats or dogs?', 'តើអ្នកចូលចិត្តឆ្មា ឬ ឆ្កែ?'), ('Is she tired or happy?', 'តើនាងនឿយហត់ ឬ រីករាយ?'), ('Do you want tea or coffee?', 'តើអ្នកចង់បានតែ ឬ កាហ្វេ?'), ('Why is he staying home? Because it is raining.', 'តើហេតុអ្វីគាត់នៅផ្ទះ? ព្រោះភ្លៀង។'), ('Were you hungry so you ate?', 'តើអ្នកឃ្លាន ដូច្នេះអ្នកញ៉ាំមែនទេ?')],
    [
        ('"I like cats and I like dogs." (redundant)', '"I like cats and dogs."', ('You can join two nouns with "and" without repeating the verb.', 'អ្នកអាចភ្ជាប់នាមពីរជាមួយ "and" ដោយមិនចាំបាច់និយាយកិរិយាស័ព្ទម្តងទៀត។')),
        ('"I like cats but not dogs."', '"I like cats but I do not like dogs."', ('"But" usually connects two complete clauses.', '"But" ជាធម្មតាភ្ជាប់ប្រយោគពេញលេញពីរ។')),
        ('"Because I was tired, so I slept."', '"Because I was tired, I slept." or "I was tired, so I slept."', ('Use "because" or "so", not both in the same sentence.', 'ប្រើ "because" ឬ "so" មិនត្រូវប្រើទាំងពីរក្នុងប្រយោគតែមួយទេ។')),
    ],
    [
        {'id': 'conj-ex-1', 'q': ('Choose: "I like apples ___ (and/but) oranges."', 'ជ្រើសរើស៖ "I like apples ___ (and/but) oranges."'), 'opts': [('and', 'and'), ('but', 'but'), ('or', 'or'), ('because', 'because')], 'ans': 'and', 'exp': ('"And" adds similar information.', '"And" បន្ថែមព័ត៌មានដូចគ្នា។')},
        {'id': 'conj-ex-2', 'q': ('Choose: "She is small ___ (and/but) strong."', 'ជ្រើសរើស៖ "She is small ___ (and/but) strong."'), 'opts': [('and', 'and'), ('but', 'but'), ('or', 'or'), ('so', 'so')], 'ans': 'but', 'exp': ('"But" shows contrast between small and strong.', '"But" បង្ហាញភាពផ្ទុយគ្នារវាងតូច និងខ្លាំង។')},
        {'id': 'conj-ex-3', 'q': ('Choose: "Is it hot ___ (or/and) cold?"', 'ជ្រើសរើស៖ "Is it hot ___ (or/and) cold?"'), 'opts': [('and', 'and'), ('but', 'but'), ('or', 'or'), ('so', 'so')], 'ans': 'or', 'exp': ('"Or" presents a choice between hot and cold.', '"Or" បង្ហាញជម្រើសរវាងក្តៅ និងត្រជាក់។')},
        {'id': 'conj-ex-4', 'q': ('Complete: "He is sad ___ (because/so) he lost his phone."', 'បំពេញ៖ "He is sad ___ (because/so) he lost his phone."'), 'opts': [('because', 'because'), ('so', 'so'), ('and', 'and'), ('but', 'but')], 'ans': 'because', 'exp': ('"Because" introduces the reason for his sadness.', '"Because" បង្ហាញពីមូលហេតុនៃភាពក្រៀមក្រំរបស់គាត់។')},
        {'id': 'conj-ex-5', 'q': ('Choose the correct sentence:', 'ជ្រើសរើសប្រយោគត្រឹមត្រូវ៖'), 'opts': [('Because I was tired so I slept.', 'Because I was tired so I slept.'), ('I was tired so I slept.', 'I was tired so I slept.'), ('Because so I slept.', 'Because so I slept.'), ('Tired so I slept.', 'Tired so I slept.')], 'ans': 'I was tired so I slept.', 'exp': ('Use "so" to show result. Do not use "because" and "so" together.', 'ប្រើ "so" ដើម្បីបង្ហាញលទ្ធផល។ កុំប្រើ "because" និង "so" ជាមួយគ្នា។')},
    ],
    [
        ('conj-hw-1', ('Write 2 sentences with "and", 2 with "but", 2 with "or", 2 with "because", and 2 with "so".', 'សរសេរប្រយោគ ២ ជាមួយ "and", ២ ជាមួយ "but", ២ ជាមួយ "or", ២ ជាមួយ "because", និង ២ ជាមួយ "so"។')),
        ('conj-hw-2', ('Join 5 pairs of short sentences using conjunctions.', 'ភ្ជាប់ប្រយោគខ្លី ៥ គូដោយប្រើឈ្នាប់។')),
    ],
    [
        {'id': 'conj-q-1', 'q': ('"I want to go ___ (but/and) I am too tired."', '"I want to go ___ (but/and) I am too tired."'), 'opts': [('and', 'and'), ('but', 'but'), ('or', 'or'), ('so', 'so')], 'ans': 'but', 'exp': ('"But" shows contrast between wanting to go and being tired.', '"But" បង្ហាញភាពផ្ទុយគ្នារវាងការចង់ទៅ និងការនឿយហត់។')},
        {'id': 'conj-q-2', 'q': ('"Do you want milk ___ (or/and) juice?"', '"Do you want milk ___ (or/and) juice?"'), 'opts': [('and', 'and'), ('but', 'but'), ('or', 'or'), ('so', 'so')], 'ans': 'or', 'exp': ('"Or" offers a choice between milk and juice.', '"Or" ផ្តល់ជម្រើសរវាងទឹកដោះគោ និងទឹកផ្លែឈើ។')},
        {'id': 'conj-q-3', 'q': ('"He studied hard ___ (because/so) he passed the test."', '"He studied hard ___ (because/so) he passed the test."'), 'opts': [('because', 'because'), ('so', 'so'), ('and', 'and'), ('but', 'but')], 'ans': 'so', 'exp': ('"So" shows the result: passing was the result of studying hard.', '"So" បង្ហាញលទ្ធផល៖ ការប្រឡងជាប់គឺជាលទ្ធផលនៃការរៀនខ្លាំង។')},
    ],
    ['and', 'but', 'or', 'because', 'so', 'cat', 'dog', 'tea', 'coffee', 'milk', 'juice', 'hot', 'cold', 'tired', 'happy', 'sad', 'hungry', 'rain', 'study', 'pass']
)
L15 = Lesson(
    'preposition', 'Prepositions', 'ធ្នាក់',
    'beginner', 'unit-1', 'ch-7-modals', 15, 15,
    'Prepositions show relationships between words. Common prepositions of place: in, on, under, next to, between, behind, in front of. Prepositions of time: at, on, in.',
    'ធ្នាក់បង្ហាញទំនាក់ទំនងរវាងពាក្យ។ ធ្នាក់នៃទីកន្លែងទូទៅ៖ in, on, under, next to, between, behind, in front of។ ធ្នាក់នៃពេលវេលា៖ at, on, in។',
    'Subject + be/verb + preposition + noun',
    [('The book is on the table.', 'សៀវភៅនៅលើតុ។'), ('The cat is under the bed.', 'ឆ្មានៅក្រោមគ្រែ។'), ('She sits next to me.', 'នាងអង្គុយក្បែរខ្ញុំ។'), ('I wake up at 6 AM.', 'ខ្ញុំភ្ញាក់ពីគេងនៅម៉ោង ៦ ព្រឹក។'), ('He was born in May.', 'គាត់កើតនៅខែឧសភា។')],
    'Subject + be/verb + not + preposition + noun',
    [('The book is not on the table.', 'សៀវភៅមិននៅលើតុទេ។'), ('The cat is not under the bed.', 'ឆ្មាមិននៅក្រោមគ្រែទេ។'), ('She does not sit next to me.', 'នាងមិនអង្គុយក្បែរខ្ញុំទេ។'), ('I do not wake up at 5 AM.', 'ខ្ញុំមិនភ្ញាក់ពីគេងនៅម៉ោង ៥ ព្រឹកទេ។'), ('He was not born in June.', 'គាត់មិនបានកើតនៅខែមិថុនាទេ។')],
    'Be/Do/Does + subject + preposition + noun?',
    [('Is the book on the table?', 'តើសៀវភៅនៅលើតុទេ?'), ('Is the cat under the bed?', 'តើឆ្មានៅក្រោមគ្រែទេ?'), ('Does she sit next to you?', 'តើនាងអង្គុយក្បែរអ្នកទេ?'), ('Do you wake up at 6 AM?', 'តើអ្នកភ្ញាក់ពីគេងនៅម៉ោង ៦ ព្រឹកទេ?'), ('Was he born in May?', 'តើគាត់កើតនៅខែឧសភាទេ?')],
    [
        ('"The book is the table on."', '"The book is on the table."', ('In English, the preposition comes before the noun.', 'ក្នុងភាសាអង់គ្លេស ធ្នាក់មកមុខនាម។')),
        ('"I will meet you in Monday."', '"I will meet you on Monday."', ('Use "on" with days of the week.', 'ប្រើ "on" ជាមួយថ្ងៃនៃសប្តាហ៍។')),
        ('"I go to school on the morning."', '"I go to school in the morning."', ('Use "in" with parts of the day (morning, afternoon, evening).', 'ប្រើ "in" ជាមួយផ្នែកនៃថ្ងៃ (ព្រឹក រសៀល ល្ងាច)។')),
    ],
    [
        {'id': 'prep-ex-1', 'q': ('Choose: "The pen is ___ (in/on) the desk."', 'ជ្រើសរើស៖ "The pen is ___ (in/on) the desk."'), 'opts': [('in', 'in'), ('on', 'on'), ('under', 'under'), ('at', 'at')], 'ans': 'on', 'exp': ('"On" is used when something is on top of a surface.', '"On" ត្រូវបានប្រើនៅពេលអ្វីមួយនៅលើផ្ទៃ។')},
        {'id': 'prep-ex-2', 'q': ('Choose: "The cat is ___ (in/under) the box." (inside)', 'ជ្រើសរើស៖ "The cat is ___ (in/under) the box."'), 'opts': [('in', 'in'), ('on', 'on'), ('under', 'under'), ('next to', 'next to')], 'ans': 'in', 'exp': ('"In" means inside something.', '"In" មានន័យថានៅក្នុងអ្វីមួយ។')},
        {'id': 'prep-ex-3', 'q': ('Complete: "I have a class ___ (in/at) 2 PM."', 'បំពេញ៖ "I have a class ___ (in/at) 2 PM."'), 'opts': [('in', 'in'), ('on', 'on'), ('at', 'at'), ('for', 'for')], 'ans': 'at', 'exp': ('Use "at" with specific times.', 'ប្រើ "at" ជាមួយពេលវេលាជាក់លាក់។')},
        {'id': 'prep-ex-4', 'q': ('Complete: "My birthday is ___ (in/on) July."', 'បំពេញ៖ "My birthday is ___ (in/on) July."'), 'opts': [('in', 'in'), ('on', 'on'), ('at', 'at'), ('by', 'by')], 'ans': 'in', 'exp': ('Use "in" with months and years.', 'ប្រើ "in" ជាមួយខែ និងឆ្នាំ។')},
        {'id': 'prep-ex-5', 'q': ('Choose the correct sentence:', 'ជ្រើសរើសប្រយោគត្រឹមត្រូវ៖'), 'opts': [('The cat is the bed under.', 'The cat is the bed under.'), ('The cat under is the bed.', 'The cat under is the bed.'), ('The cat is under the bed.', 'The cat is under the bed.'), ('Under the bed the cat is.', 'Under the bed the cat is.')], 'ans': 'The cat is under the bed.', 'exp': ('Correct word order: Subject + verb + preposition + noun.', 'លំដាប់ពាក្យត្រឹមត្រូវ៖ ប្រធាន + កិរិយាស័ព្ទ + ធ្នាក់ + នាម។')},
    ],
    [
        ('prep-hw-1', ('Describe where 10 objects are in your room using prepositions of place.', 'ពិពណ៌នាថាវត្ថុ ១០ នៅឯណាក្នុងបន្ទប់របស់អ្នកដោយប្រើធ្នាក់នៃទីកន្លែង។')),
        ('prep-hw-2', ('Write 5 sentences about your daily schedule using prepositions of time.', 'សរសេរប្រយោគ ៥ អំពីកាលវិភាគប្រចាំថ្ងៃរបស់អ្នកដោយប្រើធ្នាក់នៃពេលវេលា។')),
        ('prep-hw-3', ('Write 3 sentences using "in", 3 using "on", and 3 using "at" for time.', 'សរសេរប្រយោគ ៣ ដោយប្រើ "in", ៣ ដោយប្រើ "on", និង ៣ ដោយប្រើ "at" សម្រាប់ពេលវេលា។')),
    ],
    [
        {'id': 'prep-q-1', 'q': ('"She is sitting ___ (on/in) the chair."', '"She is sitting ___ (on/in) the chair."'), 'opts': [('in', 'in'), ('on', 'on'), ('at', 'at'), ('under', 'under')], 'ans': 'on', 'exp': ('"On" is used for sitting on a chair.', '"On" ត្រូវបានប្រើសម្រាប់អង្គុយលើកៅអី។')},
        {'id': 'prep-q-2', 'q': ('"The restaurant is ___ (in/on) the corner of the street."', '"The restaurant is ___ (in/on) the corner of the street."'), 'opts': [('in', 'in'), ('on', 'on'), ('at', 'at'), ('by', 'by')], 'ans': 'on', 'exp': ('"On the corner" is the standard phrase for street corners.', '"On the corner" គឺជាឃ្លាស្តង់ដារសម្រាប់ជ្រុងផ្លូវ។')},
        {'id': 'prep-q-3', 'q': ('"I usually wake up ___ (in/at) 7:00."', '"I usually wake up ___ (in/at) 7:00."'), 'opts': [('in', 'in'), ('on', 'on'), ('at', 'at'), ('for', 'for')], 'ans': 'at', 'exp': ('Use "at" with specific clock times.', 'ប្រើ "at" ជាមួយពេលវេលានាឡិកាជាក់លាក់។')},
        {'id': 'prep-q-4', 'q': ('"He was born ___ (in/on) January 1st."', '"He was born ___ (in/on) January 1st."'), 'opts': [('in', 'in'), ('on', 'on'), ('at', 'at'), ('by', 'by')], 'ans': 'on', 'exp': ('Use "on" with specific dates.', 'ប្រើ "on" ជាមួយកាលបរិច្ឆេទជាក់លាក់។')},
    ],
    ['in', 'on', 'at', 'under', 'next-to', 'between', 'behind', 'in-front-of', 'table', 'bed', 'book', 'cat', 'pen', 'desk', 'box', 'chair', 'morning', 'afternoon', 'evening', 'monday', 'july', 'year']
)
L16 = Lesson(
    'adverbs-frequency', 'Adverbs of Frequency', 'គុណកិរិយានៃភាពញឹកញាប់',
    'beginner', 'unit-1', 'ch-8-adverbs', 16, 15,
    'Adverbs of frequency tell how often something happens: always (100%), usually (90%), often (70%), sometimes (50%), rarely (10%), never (0%). They come before the main verb but after the verb "be".',
    'គុណកិរិយានៃភាពញឹកញាប់ប្រាប់ថាអ្វីមួយកើតឡើងញឹកញាប់ប៉ុណ្ណា៖ always (១០០%), usually (៩០%), often (៧០%), sometimes (៥០%), rarely (១០%), never (០%)។ ពួកវាមកមុនកិរិយាស័ព្ទចម្បង ប៉ុន្តែបន្ទាប់ពីកិរិយាស័ព្ទ "be"។',
    'Subject + adverb of frequency + main verb | Subject + be + adverb of frequency',
    [('I always wake up at 6 AM.', 'ខ្ញុំតែងតែភ្ញាក់ពីគេងនៅម៉ោង ៦ ព្រឹក។'), ('She usually drinks coffee.', 'នាងជាធម្មតាផឹកកាហ្វេ។'), ('They often play football.', 'ពួកគេច្រើនតែលេងបាល់ទាត់។'), ('He is sometimes late.', 'គាត់ពេលខ្លះមកយឺត។'), ('I am never bored in class.', 'ខ្ញុំមិនដែលធុញក្នុងថ្នាក់ទេ។')],
    'Subject + do/does not + often/usually + verb | Subject + be + not + adverb',
    [('I do not always wake up at 6 AM.', 'ខ្ញុំមិនតែងតែភ្ញាក់ពីគេងនៅម៉ោង ៦ ព្រឹកទេ។'), ('She does not usually drink tea.', 'នាងមិនជាធម្មតាផឹកតែទេ។'), ('They do not often play tennis.', 'ពួកគេមិនច្រើនតែលេងកីឡាវាយកូនបាល់ទេ។'), ('He is not often late.', 'គាត់មិនច្រើនតែមកយឺតទេ។'), ('I am never tired in the morning.', 'ខ្ញុំមិនដែលនឿយហត់នៅពេលព្រឹកទេ។')],
    'Do/Does + subject + adverb of frequency + verb?',
    [('Do you always wake up at 6 AM?', 'តើអ្នកតែងតែភ្ញាក់ពីគេងនៅម៉ោង ៦ ព្រឹកទេ?'), ('Does she usually drink coffee?', 'តើនាងជាធម្មតាផឹកកាហ្វេទេ?'), ('Do they often play football?', 'តើពួកគេច្រើនតែលេងបាល់ទាត់ទេ?'), ('Is he sometimes late?', 'តើគាត់ពេលខ្លះមកយឺតទេ?'), ('Are you never bored?', 'តើអ្នកមិនដែលធុញទេ?')],
    [
        ('"I wake up always at 6 AM."', '"I always wake up at 6 AM."', ('Adverbs of frequency come before the main verb.', 'គុណកិរិយានៃភាពញឹកញាប់មកមុនកិរិយាស័ព្ទចម្បង។')),
        ('"She is usually drink coffee."', '"She usually drinks coffee."', ('Do not use "be" with main verbs when using adverbs.', 'កុំប្រើ "be" ជាមួយកិរិយាស័ព្ទចម្បងនៅពេលប្រើគុណកិរិយា។')),
        ('"I never am late."', '"I am never late."', ('With the verb "be", the adverb comes after "be".', 'ជាមួយកិរិយាស័ព្ទ "be" គុណកិរិយាមកបន្ទាប់ពី "be"។')),
    ],
    [
        {'id': 'af-ex-1', 'q': ('Choose: "I ___ (always/am always) happy."', 'ជ្រើសរើស៖ "I ___ (always/am always) happy."'), 'opts': [('always', 'always'), ('am always', 'am always'), ('always am', 'always am'), ('always be', 'always be')], 'ans': 'am always', 'exp': ('With the verb "be", the adverb comes after "be".', 'ជាមួយកិរិយាស័ព្ទ "be" គុណកិរិយាមកបន្ទាប់ពី "be"។')},
        {'id': 'af-ex-2', 'q': ('Choose: "She ___ (usually eats/eats usually) breakfast."', 'ជ្រើសរើស៖ "She ___ (usually eats/eats usually) breakfast."'), 'opts': [('usually eats', 'usually eats'), ('eats usually', 'eats usually'), ('is usually eats', 'is usually eats'), ('usually eat', 'usually eat')], 'ans': 'usually eats', 'exp': ('Adverbs of frequency come before the main verb.', 'គុណកិរិយានៃភាពញឹកញាប់មកមុនកិរិយាស័ព្ទចម្បង។')},
        {'id': 'af-ex-3', 'q': ('Complete: "He ___ (always/never) smokes. He hates smoking."', 'បំពេញ៖ "He ___ (always/never) smokes. He hates smoking."'), 'opts': [('always', 'always'), ('never', 'never'), ('usually', 'usually'), ('often', 'often')], 'ans': 'never', 'exp': ('"Never" means 0% — he does not smoke at all.', '"Never" មានន័យថា ០% — គាត់មិនជក់បារីទាល់តែសោះ។')},
        {'id': 'af-ex-4', 'q': ('Complete: "They ___ (sometimes/always) go to the beach. About twice a month."', 'បំពេញ៖ "They ___ (sometimes/always) go to the beach. About twice a month."'), 'opts': [('always', 'always'), ('never', 'never'), ('sometimes', 'sometimes'), ('rarely', 'rarely')], 'ans': 'sometimes', 'exp': ('"Sometimes" means about 50% of the time — twice a month is sometimes.', '"Sometimes" មានន័យថាប្រហែល ៥០% — ពីរដងក្នុងមួយខែគឺពេលខ្លះ។')},
        {'id': 'af-ex-5', 'q': ('Choose the correct sentence:', 'ជ្រើសរើសប្រយោគត្រឹមត្រូវ៖'), 'opts': [('I always am on time.', 'I always am on time.'), ('I am always on time.', 'I am always on time.'), ('Always I am on time.', 'Always I am on time.'), ('I am on time always.', 'I am on time always.')], 'ans': 'I am always on time.', 'exp': ('With "be", the adverb comes after the verb: am + always.', 'ជាមួយ "be" គុណកិរិយាមកបន្ទាប់ពីកិរិយាស័ព្ទ៖ am + always។')},
    ],
    [
        ('af-hw-1', ('Write 1 sentence for each adverb of frequency: always, usually, often, sometimes, rarely, never.', 'សរសេរប្រយោគ ១ សម្រាប់គុណកិរិយានីមួយៗ៖ always, usually, often, sometimes, rarely, never។')),
        ('af-hw-2', ('Write 5 sentences about your daily routine using adverbs of frequency.', 'សរសេរប្រយោគ ៥ អំពីទម្លាប់ប្រចាំថ្ងៃរបស់អ្នកដោយប្រើគុណកិរិយានៃភាពញឹកញាប់។')),
    ],
    [
        {'id': 'af-q-1', 'q': ('"I ___ (always/never) brush my teeth before bed. Every single night."', '"I ___ (always/never) brush my teeth before bed. Every single night."'), 'opts': [('always', 'always'), ('never', 'never'), ('sometimes', 'sometimes'), ('rarely', 'rarely')], 'ans': 'always', 'exp': ('"Every single night" means 100% — always.', '"Every single night" មានន័យថា ១០០% — always។')},
        {'id': 'af-q-2', 'q': ('"She ___ (usually/is usually) kind to everyone."', '"She ___ (usually/is usually) kind to everyone."'), 'opts': [('usually', 'usually'), ('is usually', 'is usually'), ('usually is', 'usually is'), ('usually be', 'usually be')], 'ans': 'is usually', 'exp': ('With "kind" (adjective) we use "be" + adverb.', 'ជាមួយ "kind" (គុណនាម) យើងប្រើ "be" + គុណកិរិយា។')},
        {'id': 'af-q-3', 'q': ('"Where do you ___ (usually/usually do) go on weekends?"', '"Where do you ___ (usually/usually do) go on weekends?"'), 'opts': [('usually', 'usually'), ('usually do', 'usually do'), ('do usually', 'do usually'), ('are usually', 'are usually')], 'ans': 'usually', 'exp': ('In questions, the adverb comes after the subject and before the main verb.', 'ក្នុងសំណួរ គុណកិរិយាមកក្រោយប្រធាន និងមុនកិរិយាស័ព្ទចម្បង។')},
    ],
    ['always', 'usually', 'often', 'sometimes', 'rarely', 'never', 'wake-up', 'coffee', 'football', 'late', 'bored', 'tired', 'breakfast', 'beach', 'smoke', 'time', 'morning', 'weekend']
)
L17 = Lesson(
    'past-simple', 'Past Simple Tense', 'អតីតកាលធម្មតា',
    'beginner', 'unit-1', 'ch-9-past', 17, 20,
    'Past Simple is used for completed actions in the past. Regular verbs add "-ed" (walk -> walked). Irregular verbs change form (go -> went). Use "did not" + base verb for negatives. Use "Did" + subject + base verb for questions.',
    'អតីតកាលធម្មតាត្រូវបានប្រើសម្រាប់សកម្មភាពដែលបានបញ្ចប់ក្នុងអតីតកាល។ កិរិយាស័ព្ទទៀងទាត់បន្ថែម "-ed" (walk -> walked)។ កិរិយាស័ព្ទមិនទៀងទាត់ប្តូរទម្រង់ (go -> went)។ ប្រើ "did not" + កិរិយាស័ព្ទដើមសម្រាប់អវិជ្ជមាន។ ប្រើ "Did" + ប្រធាន + កិរិយាស័ព្ទដើមសម្រាប់សំណួរ។',
    'Subject + past tense verb (V2)',
    [('I walked to school yesterday.', 'ខ្ញុំបានដើរទៅសាលារៀនកាលពីម្សិលមិញ។'), ('She went to the market.', 'នាងបានទៅផ្សារ។'), ('He ate rice for lunch.', 'គាត់បានញ៉ាំបាយសម្រាប់អាហារថ្ងៃត្រង់។'), ('They played football last Sunday.', 'ពួកគេបានលេងបាល់ទាត់កាលពីថ្ងៃអាទិត្យមុន។'), ('We visited Angkor Wat last year.', 'ពួកយើងបានទៅទស្សនាអង្គរវត្តកាលពីឆ្នាំមុន។')],
    'Subject + did not (didn\'t) + base verb',
    [('I did not walk to school.', 'ខ្ញុំមិនបានដើរទៅសាលារៀនទេ។'), ('She did not go to the market.', 'នាងមិនបានទៅផ្សារទេ។'), ('He did not eat rice.', 'គាត់មិនបានញ៉ាំបាយទេ។'), ('They did not play football.', 'ពួកគេមិនបានលេងបាល់ទាត់ទេ។'), ('We did not visit Angkor Wat.', 'ពួកយើងមិនបានទៅទស្សនាអង្គរវត្តទេ។')],
    'Did + subject + base verb?',
    [('Did you walk to school? Yes, I did.', 'តើអ្នកបានដើរទៅសាលារៀនទេ? បាទ ខ្ញុំបានដើរ។'), ('Did she go to the market? No, she did not.', 'តើនាងបានទៅផ្សារទេ? ទេ នាងមិនបានទៅទេ។'), ('Did he eat rice? Yes, he did.', 'តើគាត់បានញ៉ាំបាយទេ? បាទ គាត់បានញ៉ាំ។'), ('Did they play football? No, they did not.', 'តើពួកគេបានលេងបាល់ទាត់ទេ? ទេ ពួកគេមិនបានលេងទេ។'), ('Did you visit Angkor Wat? Yes, we did.', 'តើអ្នកបានទៅទស្សនាអង្គរវត្តទេ? បាទ ពួកយើងបានទៅ។')],
    [
        ('"I go to school yesterday."', '"I went to school yesterday."', ('Use past tense form of the verb for past actions.', 'ប្រើទម្រង់អតីតកាលនៃកិរិយាស័ព្ទសម្រាប់សកម្មភាពកន្លងមក។')),
        ('"I did not went to school."', '"I did not go to school."', ('After "did not", use the base verb without past tense.', 'បន្ទាប់ពី "did not" ប្រើកិរិយាស័ព្ទដើមដោយគ្មានទម្រង់អតីតកាល។')),
        ('"Did you went to school?"', '"Did you go to school?"', ('After "Did", use the base verb without past tense.', 'បន្ទាប់ពី "Did" ប្រើកិរិយាស័ព្ទដើមដោយគ្មានទម្រង់អតីតកាល។')),
    ],
    [
        {'id': 'ps-ex-1', 'q': ('Complete: "I ___ (walk/walked) to the park yesterday."', 'បំពេញ៖ "I ___ (walk/walked) to the park yesterday."'), 'opts': [('walk', 'walk'), ('walked', 'walked'), ('walking', 'walking'), ('walks', 'walks')], 'ans': 'walked', 'exp': ('For past actions, add "-ed" to regular verbs like "walk".', 'សម្រាប់សកម្មភាពកន្លងមក បន្ថែម "-ed" ទៅកិរិយាស័ព្ទទៀងទាត់ដូចជា "walk"។')},
        {'id': 'ps-ex-2', 'q': ('Complete: "She ___ (go/went) to Siem Reap last week."', 'បំពេញ៖ "She ___ (go/went) to Siem Reap last week."'), 'opts': [('go', 'go'), ('went', 'went'), ('going', 'going'), ('goes', 'goes')], 'ans': 'went', 'exp': ('"Went" is the irregular past form of "go".', '"Went" ជាទម្រង់អតីតកាលមិនទៀងទាត់របស់ "go"។')},
        {'id': 'ps-ex-3', 'q': ('Choose the negative: "He ___ (did not eat/did not ate) dinner."', 'ជ្រើសរើសទម្រង់អវិជ្ជមាន៖ "He ___ (did not eat/did not ate) dinner."'), 'opts': [('did not eat', 'did not eat'), ('did not ate', 'did not ate'), ('did not eating', 'did not eating'), ('not ate', 'not ate')], 'ans': 'did not eat', 'exp': ('After "did not" use the base verb "eat", not "ate".', 'បន្ទាប់ពី "did not" ប្រើកិរិយាស័ព្ទដើម "eat" មិនមែន "ate"។')},
        {'id': 'ps-ex-4', 'q': ('Choose the correct question: "___ (Did/Does) she call you yesterday?"', 'ជ្រើសរើសសំណួរត្រឹមត្រូវ៖ "___ (Did/Does) she call you yesterday?"'), 'opts': [('Did', 'Did'), ('Does', 'Does'), ('Do', 'Do'), ('Was', 'Was')], 'ans': 'Did', 'exp': ('Use "Did" for past simple questions.', 'ប្រើ "Did" សម្រាប់សំណួរអតីតកាលធម្មតា។')},
        {'id': 'ps-ex-5', 'q': ('Choose the correct sentence:', 'ជ្រើសរើសប្រយោគត្រឹមត្រូវ៖'), 'opts': [('I didn\'t went to the party.', 'I didn\'t went to the party.'), ('I didn\'t go to the party.', 'I didn\'t go to the party.'), ('I not went to the party.', 'I not went to the party.'), ('I didn\'t going to the party.', 'I didn\'t going to the party.')], 'ans': 'I didn\'t go to the party.', 'exp': ('After "didn\'t", always use the base verb form.', 'បន្ទាប់ពី "didn\'t" តែងតែប្រើទម្រង់កិរិយាស័ព្ទដើម។')},
    ],
    [
        ('ps-hw-1', ('Write 10 sentences about what you did yesterday using past simple.', 'សរសេរប្រយោគ ១០ អំពីអ្វីដែលអ្នកបានធ្វើកាលពីម្សិលមិញដោយប្រើអតីតកាលធម្មតា។')),
        ('ps-hw-2', ('Write 5 questions in past simple and answer them.', 'សរសេរសំណួរ ៥ ក្នុងអតីតកាលធម្មតា ហើយឆ្លើយពួកវា។')),
        ('ps-hw-3', ('Make a list of 10 irregular verbs and their past forms.', 'ធ្វើបញ្ជីកិរិយាស័ព្ទមិនទៀងទាត់ ១០ និងទម្រង់អតីតកាលរបស់វា។')),
    ],
    [
        {'id': 'ps-q-1', 'q': ('"I ___ (see/saw) a movie last night."', '"I ___ (see/saw) a movie last night."'), 'opts': [('see', 'see'), ('saw', 'saw'), ('seeing', 'seeing'), ('seen', 'seen')], 'ans': 'saw', 'exp': ('"Saw" is the irregular past form of "see".', '"Saw" ជាទម្រង់អតីតកាលមិនទៀងទាត់របស់ "see"។')},
        {'id': 'ps-q-2', 'q': ('"___ (Did/Does) you eat breakfast this morning?"', '"___ (Did/Does) you eat breakfast this morning?"'), 'opts': [('Did', 'Did'), ('Does', 'Does'), ('Do', 'Do'), ('Are', 'Are')], 'ans': 'Did', 'exp': ('Use "Did" for past simple questions. "This morning" is already past.', 'ប្រើ "Did" សម្រាប់សំណួរអតីតកាលធម្មតា។ "This morning" គឺជាអតីតកាលរួចហើយ។')},
        {'id': 'ps-q-3', 'q': ('"She ___ (buy/bought) a new phone yesterday."', '"She ___ (buy/bought) a new phone yesterday."'), 'opts': [('buy', 'buy'), ('bought', 'bought'), ('buying', 'buying'), ('buys', 'buys')], 'ans': 'bought', 'exp': ('"Bought" is the irregular past form of "buy".', '"Bought" ជាទម្រង់អតីតកាលមិនទៀងទាត់របស់ "buy"។')},
        {'id': 'ps-q-4', 'q': ('"They ___ (did not/didn\'t) come to the meeting."', '"They ___ (did not/didn\'t) come to the meeting."'), 'opts': [('did not', 'did not'), ('didn\'t', 'didn\'t'), ('not', 'not'), ('did not came', 'did not came')], 'ans': 'didn\'t', 'exp': ('Both "did not" and "didn\'t" are correct. Base verb "come" after "didn\'t".', 'ទាំង "did not" និង "didn\'t" គឺត្រឹមត្រូវ។ កិរិយាស័ព្ទដើម "come" បន្ទាប់ពី "didn\'t"។')},
    ],
    ['past-simple', 'yesterday', 'last-week', 'last-year', 'walk', 'went', 'ate', 'played', 'visited', 'saw', 'bought', 'did', 'ate', 'went', 'saw', 'bought', 'came', 'call', 'eat', 'drink', 'sleep', 'study', 'play', 'visit']
)

write_file(L1, L2, L3, L4, L5, L6, L7, L8, L9, L10, L11, L12, L13, L14, L15, L16, L17)
