import type { GrammarUnit } from '../../types';

export const grammarUnits: GrammarUnit[] = [
  {
    id: 'unit-1',
    title: { en: 'Job', km: 'ការងារ' },
    level: 'beginner',
    order: 1,
    chapters: [
    {
      id: "ch-1-job",
      title: { en: "Job", km: "ការងារ" },
      lessons: [
    {
      id: "job-vocabulary",
      title: { en: "Job Vocabulary", km: "វាក្យសព្ទការងារ" },
      level: "beginner",
      unitId: "unit-1",
      chapterId: "ch-1-job",
      order: 1,
      estimatedMinutes: 10,
      definition: { en: "A job is work that a person does to earn money. Here are 20 common jobs in English with their Khmer translations.", km: "ការងារគឺជាការងារដែលមនុស្សម្នាក់ធ្វើដើម្បីរកលុយ។ នេះគឺជាការងារទូទៅចំនួន ២០ ជាភាសាអង់គ្លេសជាមួយការបកប្រែជាភាសាខ្មែរ។" },
            forms: {
        affirmative:         {
          structure: "Subject + am/is/are + a/an + job",
          examples: [
          { en: "I am a teacher.", km: "ខ្ញុំជាគ្រូបង្រៀន។" },
          { en: "He is a doctor.", km: "គាត់ជាវេជ្ជបណ្ឌិត។" },
          { en: "She is a nurse.", km: "នាងជាគិលានុបដ្ឋាយិកា។" },
          { en: "They are police officers.", km: "ពួកគេជាមន្ត្រីនគរបាល។" },
          { en: "We are firefighters.", km: "ពួកយើងជាអ្នកពន្លត់អគ្គិភ័យ។" }
          ],
        },
        negative:         {
          structure: "Subject + am/is/are + not + a/an + job",
          examples: [
          { en: "I am not a chef.", km: "ខ្ញុំមិនមែនជាចុងភៅទេ។" },
          { en: "He is not a farmer.", km: "គាត់មិនមែនជាកសិករទេ។" },
          { en: "She is not a driver.", km: "នាងមិនមែនជាអ្នកបើកបរទេ។" },
          { en: "They are not pilots.", km: "ពួកគេមិនមែនជាអ្នកបើកយន្តហោះទេ។" },
          { en: "I am not a mechanic.", km: "ខ្ញុំមិនមែនជាជាងជួសជុលម៉ាស៊ីនទេ។" }
          ],
        },
        question:         {
          structure: "Am/Is/Are + subject + a/an + job?",
          examples: [
          { en: "Are you a teacher? Yes, I am.", km: "តើអ្នកជាគ្រូបង្រៀនទេ? បាទ ខ្ញុំជា។" },
          { en: "Is he a doctor? No, he is not.", km: "តើគាត់ជាវេជ្ជបណ្ឌិតទេ? ទេ គាត់មិនមែនទេ។" },
          { en: "Is she a nurse? Yes, she is.", km: "តើនាងជាគិលានុបដ្ឋាយិកាទេ? បាទ នាងជា។" },
          { en: "Are they police officers? Yes, they are.", km: "តើពួកគេជាមន្ត្រីនគរបាលទេ? បាទ ពួកគេជា។" },
          { en: "Are you farmers? No, we are not.", km: "តើអ្នកជាកសិករទេ? ទេ ពួកយើងមិនមែនទេ។" }
          ],
        },
      },
      commonMistakes: [
        { mistake: "\"I am teacher.\"", correction: "\"I am a teacher.\"", reason: { en: "Use \"a\" or \"an\" before a singular job noun.", km: "ប្រើ \"a\" ឬ \"an\" មុខនាមការងារឯកវចនៈ។" } },
        { mistake: "\"He doctor.\"", correction: "\"He is a doctor.\"", reason: { en: "Always include the verb \"to be\" (am/is/are).", km: "តែងតែបញ្ចូលកិរិយាស័ព្ទ \"to be\" (am/is/are)។" } }
      ],
      exercises: [
        {
          id: "jv-ex-1",
          question: { en: "Choose the correct job: \"A person who teaches students is a ___.", km: "ជ្រើសរើសការងារត្រឹមត្រូវ៖ \"អ្នកដែលបង្រៀនសិស្សគឺជា ___\"" },
          type: 'multiple-choice',
          options: [
            { en: "Doctor", km: "វេជ្ជបណ្ឌិត" },
            { en: "Teacher", km: "គ្រូបង្រៀន" },
            { en: "Driver", km: "អ្នកបើកបរ" },
            { en: "Chef", km: "ចុងភៅ" }
          ],
          correctAnswer: "Teacher",
          explanation: { en: "A teacher teaches students in a school.", km: "គ្រូបង្រៀនបង្រៀនសិស្សនៅក្នុងសាលា។" },
        },
        {
          id: "jv-ex-2",
          question: { en: "A person who flies airplanes is a ___.", km: "អ្នកដែលបើកយន្តហោះគឺជា ___" },
          type: 'multiple-choice',
          options: [
            { en: "Driver", km: "អ្នកបើកបរ" },
            { en: "Pilot", km: "អ្នកបើកយន្តហោះ" },
            { en: "Mechanic", km: "ជាងជួសជុល" },
            { en: "Postman", km: "អ្នកដឹកសំបុត្រ" }
          ],
          correctAnswer: "Pilot",
          explanation: { en: "A pilot flies airplanes.", km: "អ្នកបើកយន្តហោះបើកយន្តហោះ។" },
        },
        {
          id: "jv-ex-3",
          question: { en: "Complete: \"She ___ a nurse.\"", km: "បំពេញ៖ \"She ___ a nurse.\"" },
          type: 'multiple-choice',
          options: [
            { en: "am", km: "am" },
            { en: "is", km: "is" },
            { en: "are", km: "are" },
            { en: "be", km: "be" }
          ],
          correctAnswer: "is",
          explanation: { en: "Use \"is\" with \"she\".", km: "ប្រើ \"is\" ជាមួយ \"she\"។" },
        },
        {
          id: "jv-ex-4",
          question: { en: "Complete: \"They ___ firefighters.\"", km: "បំពេញ៖ \"They ___ firefighters.\"" },
          type: 'multiple-choice',
          options: [
            { en: "am", km: "am" },
            { en: "is", km: "is" },
            { en: "are", km: "are" },
            { en: "be", km: "be" }
          ],
          correctAnswer: "are",
          explanation: { en: "Use \"are\" with \"they\".", km: "ប្រើ \"are\" ជាមួយ \"they\"។" },
        },
        {
          id: "jv-ex-5",
          question: { en: "Choose the correct sentence:", km: "ជ្រើសរើសប្រយោគត្រឹមត្រូវ៖" },
          type: 'multiple-choice',
          options: [
            { en: "He a doctor.", km: "He a doctor." },
            { en: "He is a doctor.", km: "He is a doctor." },
            { en: "He am a doctor.", km: "He am a doctor." },
            { en: "He are a doctor.", km: "He are a doctor." }
          ],
          correctAnswer: "He is a doctor.",
          explanation: { en: "Use \"is\" with \"he\".", km: "ប្រើ \"is\" ជាមួយ \"he\"។" },
        }
      ],
      homework: [
        { id: "jv-hw-1", instruction: { en: "Find 20 jobs in your language and write them in English.", km: "ស្វែងរកការងារចំនួន ២០ ជាភាសារបស់អ្នក ហើយសរសេរជាភាសាអង់គ្លេស។" } },
        { id: "jv-hw-2", instruction: { en: "Make 5 sentences using \"I am a ___\".", km: "បង្កើតប្រយោគ ៥ ដោយប្រើ \"I am a ___\"។" } }
      ],
      quiz: [
        {
          id: "jv-q-1",
          question: { en: "A person who takes care of sick people in a hospital is a ___.", km: "អ្នកដែលថែទាំអ្នកជំងឺនៅក្នុងមន្ទីរពេទ្យគឺជា ___" },
          type: 'multiple-choice',
          options: [
            { en: "Teacher", km: "គ្រូបង្រៀន" },
            { en: "Nurse", km: "គិលានុបដ្ឋាយិកា" },
            { en: "Farmer", km: "កសិករ" },
            { en: "Singer", km: "អ្នកចម្រៀង" }
          ],
          correctAnswer: "Nurse",
          explanation: { en: "A nurse takes care of patients in a hospital.", km: "គិលានុបដ្ឋាយិកាថែទាំអ្នកជំងឺនៅមន្ទីរពេទ្យ។" },
        },
        {
          id: "jv-q-2",
          question: { en: "A person who cooks food in a restaurant is a ___.", km: "អ្នកដែលចម្អិនអាហារនៅក្នុងភោជនីយដ្ឋានគឺជា ___" },
          type: 'multiple-choice',
          options: [
            { en: "Chef", km: "ចុងភៅ" },
            { en: "Driver", km: "អ្នកបើកបរ" },
            { en: "Artist", km: "វិចិត្រករ" },
            { en: "Dentist", km: "ពេទ្យធ្មេញ" }
          ],
          correctAnswer: "Chef",
          explanation: { en: "A chef cooks food in a kitchen.", km: "ចុងភៅចម្អិនអាហារនៅក្នុងផ្ទះបាយ។" },
        },
        {
          id: "jv-q-3",
          question: { en: "Complete: \"I ___ a student.\"", km: "បំពេញ៖ \"I ___ a student.\"" },
          type: 'multiple-choice',
          options: [
            { en: "am", km: "am" },
            { en: "is", km: "is" },
            { en: "are", km: "are" },
            { en: "be", km: "be" }
          ],
          correctAnswer: "am",
          explanation: { en: "Always use \"am\" with \"I\".", km: "តែងតែប្រើ \"am\" ជាមួយ \"I\"។" },
        }
      ],
      vocabularyIds: ["teacher", "doctor", "nurse", "police-officer", "firefighter", "chef", "farmer", "driver", "pilot", "construction-worker", "mechanic", "software-developer", "hairdresser", "shopkeeper", "postman", "dentist", "vet", "artist", "programmer", "photographer", "singer"],
    }
      ],
    },
    {
      id: "ch-2-svo",
      title: { en: "Grammar SVO", km: "វេយ្យាករណ៍ SVO" },
      lessons: [
    {
      id: "svo-structure",
      title: { en: "SVO Structure", km: "រចនាសម្ព័ន្ធ SVO" },
      level: "beginner",
      unitId: "unit-1",
      chapterId: "ch-2-svo",
      order: 2,
      estimatedMinutes: 15,
      definition: { en: "SVO stands for Subject + Verb + Object. This is the basic sentence structure in English. The subject is the person or thing doing the action. The verb is the action. The object receives the action.", km: "SVO គឺប្រធាន + កិរិយាស័ព្ទ + កម្មបំពេញ។ នេះគឺជារចនាសម្ព័ន្ធប្រយោគមូលដ្ឋានក្នុងភាសាអង់គ្លេស។ ប្រធានគឺជាមនុស្ស ឬវត្ថុដែលធ្វើសកម្មភាព។ កិរិយាស័ព្ទគឺជាសកម្មភាព។ កម្មបំពេញទទួលសកម្មភាព។" },
            forms: {
        affirmative:         {
          structure: "Subject (S) + Verb (V) + Object (O)",
          examples: [
          { en: "I (S) am (V) a student (O).", km: "ខ្ញុំជាសិស្ស។" },
          { en: "He (S) teaches (V) English (O).", km: "គាត់បង្រៀនភាសាអង់គ្លេស។" },
          { en: "She (S) likes (V) flowers (O).", km: "នាងចូលចិត្តផ្កា។" },
          { en: "They (S) play (V) football (O).", km: "ពួកគេលេងបាល់ទាត់។" },
          { en: "We (S) eat (V) rice (O).", km: "ពួកយើងញ៉ាំបាយ។" }
          ],
        },
        negative:         {
          structure: "Subject + do/does + not + verb + object",
          examples: [
          { en: "I do not like coffee.", km: "ខ្ញុំមិនចូលចិត្តកាហ្វេទេ។" },
          { en: "He does not play football.", km: "គាត់មិនលេងបាល់ទាត់ទេ។" },
          { en: "She does not eat meat.", km: "នាងមិនញ៉ាំសាច់ទេ។" },
          { en: "They do not watch TV.", km: "ពួកគេមិនមើលទូរទស្សន៍ទេ។" },
          { en: "We do not drink soda.", km: "ពួកយើងមិនផឹកសូដាទេ។" }
          ],
        },
        question:         {
          structure: "Do/Does + subject + verb + object?",
          examples: [
          { en: "Do you like rice? Yes, I do.", km: "តើអ្នកចូលចិត្តបាយទេ? បាទ ខ្ញុំចូលចិត្ត។" },
          { en: "Does he play football? No, he does not.", km: "តើគាត់លេងបាល់ទាត់ទេ? ទេ គាត់មិនលេងទេ។" },
          { en: "Does she teach English? Yes, she does.", km: "តើនាងបង្រៀនភាសាអង់គ្លេសទេ? បាទ នាងបង្រៀន។" },
          { en: "Do they watch TV? Yes, they do.", km: "តើពួកគេមើលទូរទស្សន៍ទេ? បាទ ពួកគេមើល។" },
          { en: "Do we drink coffee? No, we do not.", km: "តើពួកយើងផឹកកាហ្វេទេ? ទេ ពួកយើងមិនផឹកទេ។" }
          ],
        },
      },
      commonMistakes: [
        { mistake: "\"I like.\" (missing object)", correction: "\"I like rice.\"", reason: { en: "Many English sentences need an object after the verb.", km: "ប្រយោគអង់គ្លេសជាច្រើនត្រូវការកម្មបំពេញបន្ទាប់ពីកិរិយាស័ព្ទ។" } },
        { mistake: "\"He like flowers.\"", correction: "\"He likes flowers.\"", reason: { en: "Add \"s\" to the verb with he/she/it.", km: "បន្ថែម \"s\" ទៅកិរិយាស័ព្ទជាមួយ he/she/it។" } },
        { mistake: "\"I am like rice.\"", correction: "\"I like rice.\"", reason: { en: "Do not use \"am\" with action verbs like \"like\".", km: "កុំប្រើ \"am\" ជាមួយកិរិយាស័ព្ទសកម្មភាពដូចជា \"like\"។" } }
      ],
      exercises: [
        {
          id: "svo-ex-1",
          question: { en: "What does SVO stand for?", km: "តើ SVO តំណាងឱ្យអ្វី?" },
          type: 'multiple-choice',
          options: [
            { en: "Subject + Verb + Object", km: "ប្រធាន + កិរិយាស័ព្ទ + កម្មបំពេញ" },
            { en: "Subject + Object + Verb", km: "ប្រធាន + កម្មបំពេញ + កិរិយាស័ព្ទ" },
            { en: "Verb + Subject + Object", km: "កិរិយាស័ព្ទ + ប្រធាន + កម្មបំពេញ" },
            { en: "Object + Subject + Verb", km: "កម្មបំពេញ + ប្រធាន + កិរិយាស័ព្ទ" }
          ],
          correctAnswer: "Subject + Verb + Object",
          explanation: { en: "SVO means Subject + Verb + Object in English sentences.", km: "SVO មានន័យថា ប្រធាន + កិរិយាស័ព្ទ + កម្មបំពេញ ក្នុងប្រយោគអង់គ្លេស។" },
        },
        {
          id: "svo-ex-2",
          question: { en: "Identify the object: \"She reads a book.\"", km: "កំណត់កម្មបំពេញ៖ \"She reads a book.\"" },
          type: 'multiple-choice',
          options: [
            { en: "She", km: "She" },
            { en: "reads", km: "reads" },
            { en: "a book", km: "a book" },
            { en: "read", km: "read" }
          ],
          correctAnswer: "a book",
          explanation: { en: "\"A book\" is the object that receives the action of reading.", km: "\"A book\" ជាកម្មបំពេញដែលទទួលសកម្មភាពអាន។" },
        },
        {
          id: "svo-ex-3",
          question: { en: "Identify the verb: \"He plays football.\"", km: "កំណត់កិរិយាស័ព្ទ៖ \"He plays football.\"" },
          type: 'multiple-choice',
          options: [
            { en: "He", km: "He" },
            { en: "plays", km: "plays" },
            { en: "football", km: "football" },
            { en: "ball", km: "ball" }
          ],
          correctAnswer: "plays",
          explanation: { en: "\"Plays\" is the action verb in this sentence.", km: "\"Plays\" ជាកិរិយាស័ព្ទសកម្មភាពក្នុងប្រយោគនេះ។" },
        },
        {
          id: "svo-ex-4",
          question: { en: "Choose the correct SVO sentence:", km: "ជ្រើសរើសប្រយោគ SVO ត្រឹមត្រូវ៖" },
          type: 'multiple-choice',
          options: [
            { en: "Like I rice.", km: "Like I rice." },
            { en: "I rice like.", km: "I rice like." },
            { en: "I like rice.", km: "I like rice." },
            { en: "Rice I like.", km: "Rice I like." }
          ],
          correctAnswer: "I like rice.",
          explanation: { en: "The correct order is Subject (I) + Verb (like) + Object (rice).", km: "លំដាប់ត្រឹមត្រូវគឺ ប្រធាន (I) + កិរិយាស័ព្ទ (like) + កម្មបំពេញ (rice)។" },
        },
        {
          id: "svo-ex-5",
          question: { en: "Complete: \"They ___ (play) guitar.\"", km: "បំពេញ៖ \"They ___ (play) guitar.\"" },
          type: 'multiple-choice',
          options: [
            { en: "play", km: "play" },
            { en: "plays", km: "plays" },
            { en: "playing", km: "playing" },
            { en: "played", km: "played" }
          ],
          correctAnswer: "play",
          explanation: { en: "With \"they\", use the base verb without \"s\".", km: "ជាមួយ \"they\" ប្រើកិរិយាស័ព្ទដើមដោយគ្មាន \"s\"។" },
        }
      ],
      homework: [
        { id: "svo-hw-1", instruction: { en: "Make 10 sentences using the SVO structure.", km: "បង្កើតប្រយោគ ១០ ដោយប្រើរចនាសម្ព័ន្ធ SVO។" } },
        { id: "svo-hw-2", instruction: { en: "Find 5 sentences in a book and identify S, V, and O.", km: "រកប្រយោគ ៥ ក្នុងសៀវភៅ ហើយកំណត់ S, V, និង O។" } }
      ],
      quiz: [
        {
          id: "svo-q-1",
          question: { en: "What is the subject in \"The cat drinks milk.\"?", km: "តើអ្វីជាប្រធានក្នុង \"The cat drinks milk.\"?" },
          type: 'multiple-choice',
          options: [
            { en: "drinks", km: "drinks" },
            { en: "milk", km: "milk" },
            { en: "The cat", km: "The cat" },
            { en: "cat", km: "cat" }
          ],
          correctAnswer: "The cat",
          explanation: { en: "\"The cat\" is the subject doing the action.", km: "\"The cat\" ជាប្រធានដែលធ្វើសកម្មភាព។" },
        },
        {
          id: "svo-q-2",
          question: { en: "Which sentence has SVO order?", km: "តើប្រយោគមួយណាមានលំដាប់ SVO?" },
          type: 'multiple-choice',
          options: [
            { en: "Plays he guitar.", km: "Plays he guitar." },
            { en: "Guitar he plays.", km: "Guitar he plays." },
            { en: "He plays guitar.", km: "He plays guitar." },
            { en: "He guitar plays.", km: "He guitar plays." }
          ],
          correctAnswer: "He plays guitar.",
          explanation: { en: "He (S) + plays (V) + guitar (O) is the correct SVO order.", km: "He (S) + plays (V) + guitar (O) ជាលំដាប់ SVO ត្រឹមត្រូវ។" },
        },
        {
          id: "svo-q-3",
          question: { en: "What is the verb in \"My mother cooks food.\"?", km: "តើអ្វីជាកិរិយាស័ព្ទក្នុង \"My mother cooks food.\"?" },
          type: 'multiple-choice',
          options: [
            { en: "My mother", km: "My mother" },
            { en: "cooks", km: "cooks" },
            { en: "food", km: "food" },
            { en: "mother", km: "mother" }
          ],
          correctAnswer: "cooks",
          explanation: { en: "\"Cooks\" is the action verb.", km: "\"Cooks\" ជាកិរិយាស័ព្ទសកម្មភាព។" },
        },
        {
          id: "svo-q-4",
          question: { en: "Complete: \"___ (Do/Does) she like flowers?\"", km: "បំពេញ៖ \"___ she like flowers?\"" },
          type: 'multiple-choice',
          options: [
            { en: "Do", km: "Do" },
            { en: "Does", km: "Does" },
            { en: "Is", km: "Is" },
            { en: "Are", km: "Are" }
          ],
          correctAnswer: "Does",
          explanation: { en: "Use \"Does\" with \"she\" for questions in present simple.", km: "ប្រើ \"Does\" ជាមួយ \"she\" សម្រាប់សំណួរក្នុងបច្ចុប្បន្នកាលធម្មតា។" },
        }
      ],
      vocabularyIds: ["teacher", "doctor", "student", "football", "rice"],
    }
      ],
    },
    {
      id: "ch-3-present-simple",
      title: { en: "Present Simple", km: "បច្ចុប្បន្នកាលធម្មតា" },
      lessons: [
    {
      id: "present-simple",
      title: { en: "Present Simple Tense", km: "បច្ចុប្បន្នកាលធម្មតា" },
      level: "beginner",
      unitId: "unit-1",
      chapterId: "ch-3-present-simple",
      order: 3,
      estimatedMinutes: 20,
      definition: { en: "Present Simple is used to talk about habits, routines, general truths, and facts. For he/she/it, add \"s\" or \"es\" to the verb. For I/you/we/they, use the base verb.", km: "បច្ចុប្បន្នកាលធម្មតាត្រូវបានប្រើដើម្បីនិយាយអំពីទម្លាប់ ទម្លាប់ប្រចាំថ្ងៃ ការពិតទូទៅ និងហេតុការណ៍ពិត។ សម្រាប់ he/she/it បន្ថែម \"s\" ឬ \"es\" ទៅកិរិយាស័ព្ទ។ សម្រាប់ I/you/we/they ប្រើកិរិយាស័ព្ទដើម។" },
            forms: {
        affirmative:         {
          structure: "I/You/We/They + base verb | He/She/It + verb-s/es",
          examples: [
          { en: "I wake up at 6 AM every day.", km: "ខ្ញុំភ្ញាក់ពីគេងនៅម៉ោង ៦ ព្រឹករាល់ថ្ងៃ។" },
          { en: "She drinks coffee every morning.", km: "នាងផឹកកាហ្វេរាល់ព្រឹក។" },
          { en: "They go to school by bus.", km: "ពួកគេទៅសាលារៀនដោយឡានក្រុង។" },
          { en: "He works in an office.", km: "គាត់ធ្វើការនៅក្នុងការិយាល័យ។" },
          { en: "The sun rises in the east.", km: "ព្រះអាទិត្យរះនៅទិសខាងកើត។" }
          ],
        },
        negative:         {
          structure: "Subject + do/does + not + base verb",
          examples: [
          { en: "I do not eat fast food.", km: "ខ្ញុំមិនញ៉ាំអាហាររហ័សទេ។" },
          { en: "He does not smoke cigarettes.", km: "គាត់មិនជក់បារីទេ។" },
          { en: "She does not watch TV at night.", km: "នាងមិនមើលទូរទស្សន៍នៅពេលយប់ទេ។" },
          { en: "They do not live in Phnom Penh.", km: "ពួកគេមិនរស់នៅភ្នំពេញទេ។" },
          { en: "We do not speak French.", km: "ពួកយើងមិននិយាយភាសាបារាំងទេ។" }
          ],
        },
        question:         {
          structure: "Do/Does + subject + base verb?",
          examples: [
          { en: "Do you like spicy food? Yes, I do.", km: "តើអ្នកចូលចិត្តអាហារហឹរទេ? បាទ ខ្ញុំចូលចិត្ត។" },
          { en: "Does he play soccer? No, he does not.", km: "តើគាត់លេងបាល់ទាត់ទេ? ទេ គាត់មិនលេងទេ។" },
          { en: "Does she work on Sunday? Yes, she does.", km: "តើនាងធ្វើការនៅថ្ងៃអាទិត្យទេ? បាទ នាងធ្វើ។" },
          { en: "Do they study English? Yes, they do.", km: "តើពួកគេរៀនភាសាអង់គ្លេសទេ? បាទ ពួកគេរៀន។" },
          { en: "Do you go to the market every day? No, I do not.", km: "តើអ្នកទៅផ្សាររាល់ថ្ងៃទេ? ទេ ខ្ញុំមិនទៅទេ។" }
          ],
        },
      },
      commonMistakes: [
        { mistake: "\"He go to school.\"", correction: "\"He goes to school.\"", reason: { en: "Add \"es\" to verbs ending in o, s, sh, ch, x with he/she/it.", km: "បន្ថែម \"es\" ទៅកិរិយាស័ព្ទដែលបញ្ចប់ដោយ o, s, sh, ch, x ជាមួយ he/she/it។" } },
        { mistake: "\"She not like coffee.\"", correction: "\"She does not like coffee.\"", reason: { en: "Use \"does not\" with he/she/it in negative sentences.", km: "ប្រើ \"does not\" ជាមួយ he/she/it ក្នុងប្រយោគអវិជ្ជមាន។" } },
        { mistake: "\"He doesn't likes fish.\"", correction: "\"He doesn't like fish.\"", reason: { en: "After \"does not\", use the base verb without \"s\".", km: "បន្ទាប់ពី \"does not\" ប្រើកិរិយាស័ព្ទដើមដោយគ្មាន \"s\"។" } }
      ],
      exercises: [
        {
          id: "ps-ex-1",
          question: { en: "Complete: \"She ___ (go) to school every day.\"", km: "បំពេញ៖ \"She ___ (go) to school every day.\"" },
          type: 'multiple-choice',
          options: [
            { en: "go", km: "go" },
            { en: "goes", km: "goes" },
            { en: "going", km: "going" },
            { en: "went", km: "went" }
          ],
          correctAnswer: "goes",
          explanation: { en: "With \"she\", add \"es\" to \"go\" -> \"goes\".", km: "ជាមួយ \"she\" បន្ថែម \"es\" ទៅ \"go\" -> \"goes\"។" },
        },
        {
          id: "ps-ex-2",
          question: { en: "Complete: \"They ___ (play) football on weekends.\"", km: "បំពេញ៖ \"They ___ (play) football on weekends.\"" },
          type: 'multiple-choice',
          options: [
            { en: "play", km: "play" },
            { en: "plays", km: "plays" },
            { en: "playing", km: "playing" },
            { en: "played", km: "played" }
          ],
          correctAnswer: "play",
          explanation: { en: "With \"they\", use the base verb \"play\".", km: "ជាមួយ \"they\" ប្រើកិរិយាស័ព្ទដើម \"play\"។" },
        },
        {
          id: "ps-ex-3",
          question: { en: "Choose the correct negative: \"He ___ eat meat.\"", km: "ជ្រើសរើសប្រយោគអវិជ្ជមានត្រឹមត្រូវ៖ \"He ___ eat meat.\"" },
          type: 'multiple-choice',
          options: [
            { en: "do not", km: "do not" },
            { en: "does not", km: "does not" },
            { en: "is not", km: "is not" },
            { en: "are not", km: "are not" }
          ],
          correctAnswer: "does not",
          explanation: { en: "Use \"does not\" with \"he\" in negative present simple.", km: "ប្រើ \"does not\" ជាមួយ \"he\" ក្នុងបច្ចុប្បន្នកាលធម្មតាអវិជ្ជមាន។" },
        },
        {
          id: "ps-ex-4",
          question: { en: "Which is a correct question?", km: "តើមួយណាជាសំណួរត្រឹមត្រូវ?" },
          type: 'multiple-choice',
          options: [
            { en: "Like you coffee?", km: "Like you coffee?" },
            { en: "Do you like coffee?", km: "Do you like coffee?" },
            { en: "You like coffee?", km: "You like coffee?" },
            { en: "Does you like coffee?", km: "Does you like coffee?" }
          ],
          correctAnswer: "Do you like coffee?",
          explanation: { en: "Use \"Do\" + subject + base verb for questions with I/you/we/they.", km: "ប្រើ \"Do\" + ប្រធាន + កិរិយាស័ព្ទដើម សម្រាប់សំណួរជាមួយ I/you/we/they។" },
        },
        {
          id: "ps-ex-5",
          question: { en: "Complete: \"The sun ___ (rise) in the east.\"", km: "បំពេញ៖ \"The sun ___ (rise) in the east.\"" },
          type: 'multiple-choice',
          options: [
            { en: "rise", km: "rise" },
            { en: "rises", km: "rises" },
            { en: "rising", km: "rising" },
            { en: "rose", km: "rose" }
          ],
          correctAnswer: "rises",
          explanation: { en: "With \"the sun\" (it), add \"s\" to \"rise\" -> \"rises\".", km: "ជាមួយ \"the sun\" (it) បន្ថែម \"s\" ទៅ \"rise\" -> \"rises\"។" },
        }
      ],
      homework: [
        { id: "ps-hw-1", instruction: { en: "Write 10 sentences about your daily routine using present simple.", km: "សរសេរប្រយោគ ១០ អំពីទម្លាប់ប្រចាំថ្ងៃរបស់អ្នកដោយប្រើបច្ចុប្បន្នកាលធម្មតា។" } },
        { id: "ps-hw-2", instruction: { en: "Write 5 things your friend does and 5 things your friend does not do.", km: "សរសេររឿង ៥ ដែលមិត្តរបស់អ្នកធ្វើ និង ៥ ដែលមិត្តរបស់អ្នកមិនធ្វើ។" } },
        { id: "ps-hw-3", instruction: { en: "Ask 5 people questions using \"Do you...\" and write their answers.", km: "សួរមនុស្ស ៥ នាក់នូវសំណួរដោយប្រើ \"Do you...\" ហើយសរសេរចម្លើយរបស់ពួកគេ។" } }
      ],
      quiz: [
        {
          id: "ps-q-1",
          question: { en: "Complete: \"She ___ (watch) TV every night.\"", km: "បំពេញ៖ \"She ___ (watch) TV every night.\"" },
          type: 'multiple-choice',
          options: [
            { en: "watch", km: "watch" },
            { en: "watches", km: "watches" },
            { en: "watching", km: "watching" },
            { en: "watched", km: "watched" }
          ],
          correctAnswer: "watches",
          explanation: { en: "With \"she\", add \"es\" to \"watch\" -> \"watches\".", km: "ជាមួយ \"she\" បន្ថែម \"es\" ទៅ \"watch\" -> \"watches\"។" },
        },
        {
          id: "ps-q-2",
          question: { en: "Which is correct? \"I ___ coffee every morning.\"", km: "តើមួយណាត្រឹមត្រូវ? \"I ___ coffee every morning.\"" },
          type: 'multiple-choice',
          options: [
            { en: "drink", km: "drink" },
            { en: "drinks", km: "drinks" },
            { en: "drinking", km: "drinking" },
            { en: "am drink", km: "am drink" }
          ],
          correctAnswer: "drink",
          explanation: { en: "With \"I\", use the base verb \"drink\".", km: "ជាមួយ \"I\" ប្រើកិរិយាស័ព្ទដើម \"drink\"។" },
        },
        {
          id: "ps-q-3",
          question: { en: "Make negative: \"He likes fish.\" -> \"He ___ like fish.\"", km: "បង្កើតប្រយោគអវិជ្ជមាន៖ \"He likes fish.\" -> \"He ___ like fish.\"" },
          type: 'multiple-choice',
          options: [
            { en: "do not", km: "do not" },
            { en: "does not", km: "does not" },
            { en: "is not", km: "is not" },
            { en: "are not", km: "are not" }
          ],
          correctAnswer: "does not",
          explanation: { en: "Use \"does not\" + base verb for negative with he/she/it.", km: "ប្រើ \"does not\" + កិរិយាស័ព្ទដើម សម្រាប់ប្រយោគអវិជ្ជមានជាមួយ he/she/it។" },
        }
      ],
      vocabularyIds: ["wake-up", "drink", "coffee", "school", "bus", "work", "office", "sun", "rise", "east", "eat", "food", "live", "speak"],
    },
    {
      id: "wh-questions",
      title: { en: "WH-Questions", km: "សំណួរ WH" },
      level: "beginner",
      unitId: "unit-1",
      chapterId: "ch-3-present-simple",
      order: 4,
      estimatedMinutes: 15,
      definition: { en: "WH-questions use question words: What, Where, When, Why, Who, How. They ask for specific information. Structure: WH-word + do/does + subject + verb?", km: "សំណួរ WH ប្រើពាក្យសំណួរ៖ What, Where, When, Why, Who, How។ ពួកវាសួររកព័ត៌មានជាក់លាក់។ រចនាសម្ព័ន្ធ៖ ពាក្យ WH + do/does + ប្រធាន + កិរិយាស័ព្ទ?" },
            forms: {
        affirmative:         {
          structure: "WH-word + do/does + subject + base verb?",
          examples: [
          { en: "What do you do? I am a teacher.", km: "តើអ្នកធ្វើការអ្វី? ខ្ញុំជាគ្រូបង្រៀន។" },
          { en: "Where does she live? She lives in Phnom Penh.", km: "តើនាងរស់នៅឯណា? នាងរស់នៅភ្នំពេញ។" },
          { en: "When do you wake up? I wake up at 6 AM.", km: "តើអ្នកភ្ញាក់ពីគេងនៅពេលណា? ខ្ញុំភ្ញាក់នៅម៉ោង ៦ ព្រឹក។" },
          { en: "Why does he study English? He wants to travel.", km: "តើហេតុអ្វីគាត់រៀនភាសាអង់គ្លេស? គាត់ចង់ធ្វើដំណើរ។" },
          { en: "How do you go to work? I go by motorcycle.", km: "តើអ្នកទៅធ្វើការដោយរបៀបណា? ខ្ញុំទៅដោយម៉ូតូ។" }
          ],
        },
        negative:         {
          structure: "(Negative WH-questions: WH-word + do/does + not + subject + verb?)",
          examples: [
          { en: "Why do you not study harder? Because I am tired.", km: "តើហេតុអ្វីអ្នកមិនរៀនឱ្យខ្លាំង? ព្រោះខ្ញុំនឿយហត់។" },
          { en: "Why does she not eat meat? She is a vegetarian.", km: "តើហេតុអ្វីនាងមិនញ៉ាំសាច់? នាងជាអ្នកបួស។" },
          { en: "Where does he not go? He does not go to the gym.", km: "តើគាត់មិនទៅណា? គាត់មិនទៅកន្លែងហាត់ប្រាណទេ។" },
          { en: "What do they not like? They do not like spiders.", km: "តើពួកគេមិនចូលចិត្តអ្វី? ពួកគេមិនចូលចិត្តសត្វពីងពាងទេ។" },
          { en: "When do you not work? I do not work on Sunday.", km: "តើអ្នកមិនធ្វើការនៅពេលណា? ខ្ញុំមិនធ្វើការនៅថ្ងៃអាទិត្យទេ។" }
          ],
        },
        question:         {
          structure: "WH-word + do/does + subject + base verb?",
          examples: [
          { en: "What do you want to eat?", km: "តើអ្នកចង់ញ៉ាំអ្វី?" },
          { en: "Where does your mother work?", km: "តើម្តាយអ្នកធ្វើការនៅឯណា?" },
          { en: "When does the movie start?", km: "តើរឿងចាប់ផ្តើមនៅពេលណា?" },
          { en: "Why do you like cats?", km: "តើហេតុអ្វីអ្នកចូលចិត្តឆ្មា?" },
          { en: "How does she go to school? She walks.", km: "តើនាងទៅសាលាដោយរបៀបណា? នាងដើរ។" }
          ],
        },
      },
      commonMistakes: [
        { mistake: "\"What you do?\"", correction: "\"What do you do?\"", reason: { en: "WH-questions need \"do/does\" between the WH-word and the subject.", km: "សំណួរ WH ត្រូវការ \"do/does\" នៅចន្លោះពាក្យ WH និងប្រធាន។" } },
        { mistake: "\"Where does he lives?\"", correction: "\"Where does he live?\"", reason: { en: "After \"does\", use the base verb without \"s\".", km: "បន្ទាប់ពី \"does\" ប្រើកិរិយាស័ព្ទដើមដោយគ្មាន \"s\"។" } },
        { mistake: "\"Why you don't like rice?\"", correction: "\"Why don't you like rice?\"", reason: { en: "In WH-questions, \"do/does\" comes before the subject, even in negative form.", km: "ក្នុងសំណួរ WH \"do/does\" មកមុខប្រធាន សូម្បីតែក្នុងទម្រង់អវិជ្ជមាន។" } }
      ],
      exercises: [
        {
          id: "wh-ex-1",
          question: { en: "___ do you live? \"I live in Siem Reap.\"", km: "___ do you live? \"I live in Siem Reap.\"" },
          type: 'multiple-choice',
          options: [
            { en: "What", km: "What" },
            { en: "Where", km: "Where" },
            { en: "When", km: "When" },
            { en: "Who", km: "Who" }
          ],
          correctAnswer: "Where",
          explanation: { en: "\"Where\" is used to ask about a place or location.", km: "\"Where\" ត្រូវបានប្រើដើម្បីសួរអំពីទីកន្លែង។" },
        },
        {
          id: "wh-ex-2",
          question: { en: "___ does she go to bed? \"At 10 PM.\"", km: "___ does she go to bed? \"At 10 PM.\"" },
          type: 'multiple-choice',
          options: [
            { en: "What", km: "What" },
            { en: "Where", km: "Where" },
            { en: "When", km: "When" },
            { en: "Why", km: "Why" }
          ],
          correctAnswer: "When",
          explanation: { en: "\"When\" is used to ask about time.", km: "\"When\" ត្រូវបានប្រើដើម្បីសួរអំពីពេលវេលា។" },
        },
        {
          id: "wh-ex-3",
          question: { en: "Choose the correct question for \"I like pizza.\"", km: "ជ្រើសរើសសំណួរត្រឹមត្រូវសម្រាប់ \"I like pizza.\"" },
          type: 'multiple-choice',
          options: [
            { en: "What do you like?", km: "What do you like?" },
            { en: "Where do you like?", km: "Where do you like?" },
            { en: "When do you like?", km: "When do you like?" },
            { en: "Who do you like?", km: "Who do you like?" }
          ],
          correctAnswer: "What do you like?",
          explanation: { en: "\"What\" asks about a thing (pizza).", km: "\"What\" សួរអំពីរឿង (pizza)។" },
        },
        {
          id: "wh-ex-4",
          question: { en: "___ do you study English? \"Because I want to travel.\"", km: "___ do you study English? \"Because I want to travel.\"" },
          type: 'multiple-choice',
          options: [
            { en: "What", km: "What" },
            { en: "Where", km: "Where" },
            { en: "When", km: "When" },
            { en: "Why", km: "Why" }
          ],
          correctAnswer: "Why",
          explanation: { en: "\"Why\" asks for a reason, and the answer often starts with \"Because\".", km: "\"Why\" សួររកមូលហេតុ ហើយចម្លើយច្រើនតែចាប់ផ្តើមដោយ \"Because\"។" },
        },
        {
          id: "wh-ex-5",
          question: { en: "Choose the correct sentence:", km: "ជ្រើសរើសប្រយោគត្រឹមត្រូវ៖" },
          type: 'multiple-choice',
          options: [
            { en: "Where does he works?", km: "Where does he works?" },
            { en: "Where do he works?", km: "Where do he works?" },
            { en: "Where does he work?", km: "Where does he work?" },
            { en: "Where do he work?", km: "Where do he work?" }
          ],
          correctAnswer: "Where does he work?",
          explanation: { en: "Use \"does\" with \"he\" and the base verb \"work\" without \"s\".", km: "ប្រើ \"does\" ជាមួយ \"he\" និងកិរិយាស័ព្ទដើម \"work\" ដោយគ្មាន \"s\"។" },
        }
      ],
      homework: [
        { id: "wh-hw-1", instruction: { en: "Write 5 WH-questions and answer them about your daily life.", km: "សរសេរសំណួរ WH ៥ ហើយឆ្លើយពួកវាអំពីជីវិតប្រចាំថ្ងៃរបស់អ្នក។" } },
        { id: "wh-hw-2", instruction: { en: "Ask a friend 5 WH-questions and write their answers.", km: "សួរមិត្តភក្តិនូវសំណួរ WH ៥ ហើយសរសេរចម្លើយរបស់ពួកគេ។" } }
      ],
      quiz: [
        {
          id: "wh-q-1",
          question: { en: "Which WH-word asks about a person?", km: "តើពាក្យ WH មួយណាសួរអំពីមនុស្ស?" },
          type: 'multiple-choice',
          options: [
            { en: "What", km: "What" },
            { en: "Where", km: "Where" },
            { en: "Who", km: "Who" },
            { en: "Why", km: "Why" }
          ],
          correctAnswer: "Who",
          explanation: { en: "\"Who\" is used to ask about a person.", km: "\"Who\" ត្រូវបានប្រើដើម្បីសួរអំពីមនុស្ស។" },
        },
        {
          id: "wh-q-2",
          question: { en: "___ do you go to the gym? \"Three times a week.\"", km: "___ do you go to the gym? \"Three times a week.\"" },
          type: 'multiple-choice',
          options: [
            { en: "How often", km: "How often" },
            { en: "What", km: "What" },
            { en: "Where", km: "Where" },
            { en: "Who", km: "Who" }
          ],
          correctAnswer: "How often",
          explanation: { en: "\"How often\" asks about frequency.", km: "\"How often\" សួរអំពីភាពញឹកញាប់។" },
        },
        {
          id: "wh-q-3",
          question: { en: "Correct the question: \"Why he is sad?\"", km: "កែសំណួរ៖ \"Why he is sad?\"" },
          type: 'multiple-choice',
          options: [
            { en: "Why is he sad?", km: "Why is he sad?" },
            { en: "Why he sad?", km: "Why he sad?" },
            { en: "He why is sad?", km: "He why is sad?" },
            { en: "Why does he sad?", km: "Why does he sad?" }
          ],
          correctAnswer: "Why is he sad?",
          explanation: { en: "With the verb \"to be\", the verb comes before the subject in questions.", km: "ជាមួយកិរិយាស័ព្ទ \"to be\" កិរិយាស័ព្ទមកមុខប្រធានក្នុងសំណួរ។" },
        }
      ],
      vocabularyIds: ["what", "where", "when", "why", "who", "how", "live", "work", "study", "travel", "eat", "like", "go", "want"],
    }
      ],
    },
    {
      id: "ch-4-parts-of-speech",
      title: { en: "Parts of Speech", km: "ផ្នែកនៃការនិយាយ" },
      lessons: [
    {
      id: "noun-verb-adjective",
      title: { en: "Nouns, Verbs & Adjectives", km: "នាម កិរិយាស័ព្ទ និង គុណនាម" },
      level: "beginner",
      unitId: "unit-1",
      chapterId: "ch-4-parts-of-speech",
      order: 5,
      estimatedMinutes: 15,
      definition: { en: "Nouns name people, places, things, or ideas. Verbs describe actions or states. Adjectives describe nouns. Learning these parts of speech helps you build correct sentences.", km: "នាមដាក់ឈ្មោះមនុស្ស ទីកន្លែង វត្ថុ ឬគំនិត។ កិរិយាស័ព្ទពិពណ៌នាអំពីសកម្មភាព ឬស្ថានភាព។ គុណនាមពិពណ៌នាអំពីនាម។ ការរៀនផ្នែកនៃការនិយាយទាំងនេះជួយអ្នកបង្កើតប្រយោគត្រឹមត្រូវ។" },
            forms: {
        affirmative:         {
          structure: "Subject + verb + (adjective) + noun",
          examples: [
          { en: "I have a red car.", km: "ខ្ញុំមានឡានក្រហមមួយ។" },
          { en: "She is a happy girl.", km: "នាងជាក្មេងស្រីរីករាយម្នាក់។" },
          { en: "He reads an interesting book.", km: "គាត់អានសៀវភៅគួរឱ្យចាប់អារម្មណ៍មួយ។" },
          { en: "They live in a big house.", km: "ពួកគេរស់នៅក្នុងផ្ទះធំមួយ។" },
          { en: "We eat delicious food.", km: "ពួកយើងញ៉ាំអាហារឆ្ងាញ់។" }
          ],
        },
        negative:         {
          structure: "Subject + do/does not + verb + (adjective) + noun",
          examples: [
          { en: "I do not have a blue pen.", km: "ខ្ញុំមិនមានប៊ិចពណ៌ខៀវទេ។" },
          { en: "She does not like spicy food.", km: "នាងមិនចូលចិត្តអាហារហឹរទេ។" },
          { en: "He does not read long books.", km: "គាត់មិនអានសៀវភៅវែងទេ។" },
          { en: "They do not have a small cat.", km: "ពួកគេមិនមានឆ្មាតូចទេ។" },
          { en: "We do not eat sweet fruit.", km: "ពួកយើងមិនញ៉ាំផ្លែឈើផ្អែមទេ។" }
          ],
        },
        question:         {
          structure: "Do/Does + subject + verb + (adjective) + noun?",
          examples: [
          { en: "Do you have a red car?", km: "តើអ្នកមានឡានក្រហមទេ?" },
          { en: "Does she like spicy food?", km: "តើនាងចូលចិត្តអាហារហឹរទេ?" },
          { en: "Does he read long books?", km: "តើគាត់អានសៀវភៅវែងទេ?" },
          { en: "Do they have a small dog?", km: "តើពួកគេមានឆ្កែតូចទេ?" },
          { en: "Do you eat sweet fruit?", km: "តើអ្នកញ៉ាំផ្លែឈើផ្អែមទេ?" }
          ],
        },
      },
      commonMistakes: [
        { mistake: "\"She is beautiful.\" (missing article)", correction: "\"She is a beautiful girl.\"", reason: { en: "An adjective alone is not a noun; add a noun after the adjective.", km: "គុណនាមតែម្នាក់ឯងមិនមែនជានាមទេ បន្ថែមនាមបន្ទាប់ពីគុណនាម។" } },
        { mistake: "\"I run fast.\" \"He run fast.\"", correction: "\"He runs fast.\"", reason: { en: "Add \"s\" to the verb with he/she/it in present simple.", km: "បន្ថែម \"s\" ទៅកិរិយាស័ព្ទជាមួយ he/she/it ក្នុងបច្ចុប្បន្នកាលធម្មតា។" } },
        { mistake: "\"I have car red.\"", correction: "\"I have a red car.\"", reason: { en: "In English, adjectives come before the noun, not after.", km: "ក្នុងភាសាអង់គ្លេស គុណនាមមកមុខនាម មិនមែនក្រោយទេ។" } }
      ],
      exercises: [
        {
          id: "nva-ex-1",
          question: { en: "Identify the noun: \"The cat sleeps on the bed.\"", km: "កំណត់នាម៖ \"The cat sleeps on the bed.\"" },
          type: 'multiple-choice',
          options: [
            { en: "sleeps", km: "sleeps" },
            { en: "cat", km: "cat" },
            { en: "on", km: "on" },
            { en: "the", km: "the" }
          ],
          correctAnswer: "cat",
          explanation: { en: "\"Cat\" is a noun — it names an animal.", km: "\"Cat\" ជានាម — វាដាក់ឈ្មោះសត្វ។" },
        },
        {
          id: "nva-ex-2",
          question: { en: "Identify the verb: \"The dog runs fast.\"", km: "កំណត់កិរិយាស័ព្ទ៖ \"The dog runs fast.\"" },
          type: 'multiple-choice',
          options: [
            { en: "dog", km: "dog" },
            { en: "runs", km: "runs" },
            { en: "fast", km: "fast" },
            { en: "the", km: "the" }
          ],
          correctAnswer: "runs",
          explanation: { en: "\"Runs\" is a verb — it describes the action.", km: "\"Runs\" ជាកិរិយាស័ព្ទ — វាពិណនាអំពីសកម្មភាព។" },
        },
        {
          id: "nva-ex-3",
          question: { en: "Identify the adjective: \"She wears a blue dress.\"", km: "កំណត់គុណនាម៖ \"She wears a blue dress.\"" },
          type: 'multiple-choice',
          options: [
            { en: "She", km: "She" },
            { en: "wears", km: "wears" },
            { en: "blue", km: "blue" },
            { en: "dress", km: "dress" }
          ],
          correctAnswer: "blue",
          explanation: { en: "\"Blue\" is an adjective — it describes the dress.", km: "\"Blue\" ជាគុណនាម — វាពិណនាអំពីសម្លៀកបំពាក់។" },
        },
        {
          id: "nva-ex-4",
          question: { en: "Complete: \"She ___ (have) a pretty cat.\"", km: "បំពេញ៖ \"She ___ (have) a pretty cat.\"" },
          type: 'multiple-choice',
          options: [
            { en: "have", km: "have" },
            { en: "has", km: "has" },
            { en: "having", km: "having" },
            { en: "had", km: "had" }
          ],
          correctAnswer: "has",
          explanation: { en: "With \"she\", use \"has\" not \"have\".", km: "ជាមួយ \"she\" ប្រើ \"has\" មិនមែន \"have\"។" },
        },
        {
          id: "nva-ex-5",
          question: { en: "Choose the correct sentence:", km: "ជ្រើសរើសប្រយោគត្រឹមត្រូវ៖" },
          type: 'multiple-choice',
          options: [
            { en: "She is a girl happy.", km: "She is a girl happy." },
            { en: "She is happy a girl.", km: "She is happy a girl." },
            { en: "She is a happy girl.", km: "She is a happy girl." },
            { en: "She happy is a girl.", km: "She happy is a girl." }
          ],
          correctAnswer: "She is a happy girl.",
          explanation: { en: "Adjectives come between the article and the noun: a + adjective + noun.", km: "គុណនាមនៅចន្លោះអត្ថបទ និងនាម៖ a + គុណនាម + នាម។" },
        }
      ],
      homework: [
        { id: "nva-hw-1", instruction: { en: "Find 10 nouns, 5 verbs, and 5 adjectives in an English book or article.", km: "រកនាម ១០ កិរិយាស័ព្ទ ៥ និងគុណនាម ៥ ក្នុងសៀវភៅ ឬអត្ថបទអង់គ្លេស។" } },
        { id: "nva-hw-2", instruction: { en: "Write 5 sentences. Each sentence must have at least one noun, one verb, and one adjective.", km: "សរសេរប្រយោគ ៥។ ប្រយោគនីមួយៗត្រូវតែមាននាមយ៉ាងតិចមួយ កិរិយាស័ព្ទមួយ និងគុណនាមមួយ។" } }
      ],
      quiz: [
        {
          id: "nva-q-1",
          question: { en: "Which word is a noun?", km: "តើពាក្យមួយណាជានាម?" },
          type: 'multiple-choice',
          options: [
            { en: "run", km: "run" },
            { en: "beautiful", km: "beautiful" },
            { en: "dog", km: "dog" },
            { en: "quickly", km: "quickly" }
          ],
          correctAnswer: "dog",
          explanation: { en: "\"Dog\" is a noun — it names an animal.", km: "\"Dog\" ជានាម — វាដាក់ឈ្មោះសត្វ។" },
        },
        {
          id: "nva-q-2",
          question: { en: "Which word is a verb?", km: "តើពាក្យមួយណាជាកិរិយាស័ព្ទ?" },
          type: 'multiple-choice',
          options: [
            { en: "car", km: "car" },
            { en: "eat", km: "eat" },
            { en: "green", km: "green" },
            { en: "slowly", km: "slowly" }
          ],
          correctAnswer: "eat",
          explanation: { en: "\"Eat\" is a verb — it describes an action.", km: "\"Eat\" ជាកិរិយាស័ព្ទ — វាពិណនាអំពីសកម្មភាព។" },
        },
        {
          id: "nva-q-3",
          question: { en: "Which word is an adjective?", km: "តើពាក្យមួយណាជាគុណនាម?" },
          type: 'multiple-choice',
          options: [
            { en: "book", km: "book" },
            { en: "write", km: "write" },
            { en: "tall", km: "tall" },
            { en: "quickly", km: "quickly" }
          ],
          correctAnswer: "tall",
          explanation: { en: "\"Tall\" is an adjective — it describes a noun.", km: "\"Tall\" ជាគុណនាម — វាពិណនាអំពីនាម។" },
        }
      ],
      vocabularyIds: ["noun", "verb", "adjective", "cat", "dog", "car", "book", "house", "rice", "food", "girl", "dress", "blue", "red", "big", "small", "happy", "tall"],
    },
    {
      id: "pronouns",
      title: { en: "Pronouns", km: "សព្វនាម" },
      level: "beginner",
      unitId: "unit-1",
      chapterId: "ch-4-parts-of-speech",
      order: 6,
      estimatedMinutes: 15,
      definition: { en: "Pronouns replace nouns in sentences. Subject pronouns (I, you, he, she, it, we, they) act as the subject. Object pronouns (me, you, him, her, it, us, them) receive the action.", km: "សព្វនាមជំនួសនាមក្នុងប្រយោគ។ សព្វនាមប្រធាន (I, you, he, she, it, we, they) ធ្វើជាប្រធាន។ សព្វនាមកម្មបំពេញ (me, you, him, her, it, us, them) ទទួលសកម្មភាព។" },
            forms: {
        affirmative:         {
          structure: "Subject pronoun + verb + object pronoun",
          examples: [
          { en: "I like her.", km: "ខ្ញុំចូលចិត្តនាង។" },
          { en: "She helps me.", km: "នាងជួយខ្ញុំ។" },
          { en: "They see us.", km: "ពួកគេឃើញពួកយើង។" },
          { en: "He calls him.", km: "គាត់ទូរស័ព្ទទៅគាត់។" },
          { en: "We invite them.", km: "ពួកយើងអញ្ជើញពួកគេ។" }
          ],
        },
        negative:         {
          structure: "Subject pronoun + do/does not + verb + object pronoun",
          examples: [
          { en: "I do not like her.", km: "ខ្ញុំមិនចូលចិត្តនាងទេ។" },
          { en: "She does not help me.", km: "នាងមិនជួយខ្ញុំទេ។" },
          { en: "They do not see us.", km: "ពួកគេមិនឃើញពួកយើងទេ។" },
          { en: "He does not call him.", km: "គាត់មិនទូរស័ព្ទទៅគាត់ទេ។" },
          { en: "We do not invite them.", km: "ពួកយើងមិនអញ្ជើញពួកគេទេ។" }
          ],
        },
        question:         {
          structure: "Do/Does + subject pronoun + verb + object pronoun?",
          examples: [
          { en: "Do you like her?", km: "តើអ្នកចូលចិត្តនាងទេ?" },
          { en: "Does she help me?", km: "តើនាងជួយខ្ញុំទេ?" },
          { en: "Do they see us?", km: "តើពួកគេឃើញពួកយើងទេ?" },
          { en: "Does he call him?", km: "តើគាត់ទូរស័ព្ទទៅគាត់ទេ?" },
          { en: "Do you invite them?", km: "តើអ្នកអញ្ជើញពួកគេទេ?" }
          ],
        },
      },
      commonMistakes: [
        { mistake: "\"Me like him.\"", correction: "\"I like him.\"", reason: { en: "Use subject pronouns (I, he, she, they) as the subject of a sentence.", km: "ប្រើសព្វនាមប្រធាន (I, he, she, they) ជាប្រធានប្រយោគ។" } },
        { mistake: "\"I like he.\"", correction: "\"I like him.\"", reason: { en: "Use object pronouns (me, him, her, them) after a verb.", km: "ប្រើសព្វនាមកម្មបំពេញ (me, him, her, them) បន្ទាប់ពីកិរិយាស័ព្ទ។" } },
        { mistake: "\"Her likes me.\"", correction: "\"She likes me.\"", reason: { en: "\"Her\" is an object pronoun. Use \"she\" as a subject pronoun.", km: "\"Her\" ជាសព្វនាមកម្មបំពេញ។ ប្រើ \"she\" ជាសព្វនាមប្រធាន។" } }
      ],
      exercises: [
        {
          id: "pro-ex-1",
          question: { en: "Choose: \"___ (I/Me) am a student.\"", km: "ជ្រើសរើស៖ \"___ (I/Me) am a student.\"" },
          type: 'multiple-choice',
          options: [
            { en: "I", km: "I" },
            { en: "Me", km: "Me" },
            { en: "My", km: "My" },
            { en: "Mine", km: "Mine" }
          ],
          correctAnswer: "I",
          explanation: { en: "Use \"I\" as the subject pronoun before the verb.", km: "ប្រើ \"I\" ជាសព្វនាមប្រធានមុនកិរិយាស័ព្ទ។" },
        },
        {
          id: "pro-ex-2",
          question: { en: "Choose: \"She likes ___ (he/him).\"", km: "ជ្រើសរើស៖ \"She likes ___ (he/him).\"" },
          type: 'multiple-choice',
          options: [
            { en: "he", km: "he" },
            { en: "him", km: "him" },
            { en: "his", km: "his" },
            { en: "her", km: "her" }
          ],
          correctAnswer: "him",
          explanation: { en: "Use object pronoun \"him\" after the verb \"likes\".", km: "ប្រើសព្វនាមកម្មបំពេញ \"him\" បន្ទាប់ពីកិរិយាស័ព្ទ \"likes\"។" },
        },
        {
          id: "pro-ex-3",
          question: { en: "Choose: \"___ (They/Them) play football.\"", km: "ជ្រើសរើស៖ \"___ (They/Them) play football.\"" },
          type: 'multiple-choice',
          options: [
            { en: "They", km: "They" },
            { en: "Them", km: "Them" },
            { en: "Their", km: "Their" },
            { en: "Theirs", km: "Theirs" }
          ],
          correctAnswer: "They",
          explanation: { en: "\"They\" is a subject pronoun. Use it as the subject of the sentence.", km: "\"They\" ជាសព្វនាមប្រធាន។ ប្រើវាជាប្រធានប្រយោគ។" },
        },
        {
          id: "pro-ex-4",
          question: { en: "Choose: \"Give this to ___ (she/her).\"", km: "ជ្រើសរើស៖ \"Give this to ___ (she/her).\"" },
          type: 'multiple-choice',
          options: [
            { en: "she", km: "she" },
            { en: "her", km: "her" },
            { en: "hers", km: "hers" },
            { en: "she is", km: "she is" }
          ],
          correctAnswer: "her",
          explanation: { en: "Use object pronoun \"her\" after the preposition \"to\".", km: "ប្រើសព្វនាមកម្មបំពេញ \"her\" បន្ទាប់ពីធ្នាក់ \"to\"។" },
        },
        {
          id: "pro-ex-5",
          question: { en: "Choose: \"___ (We/Us) are friends.\"", km: "ជ្រើសរើស៖ \"___ (We/Us) are friends.\"" },
          type: 'multiple-choice',
          options: [
            { en: "We", km: "We" },
            { en: "Us", km: "Us" },
            { en: "Our", km: "Our" },
            { en: "Ours", km: "Ours" }
          ],
          correctAnswer: "We",
          explanation: { en: "\"We\" is a subject pronoun. Use it before the verb \"are\".", km: "\"We\" ជាសព្វនាមប្រធាន។ ប្រើវាមុនកិរិយាស័ព្ទ \"are\"។" },
        }
      ],
      homework: [
        { id: "pro-hw-1", instruction: { en: "Rewrite 5 sentences replacing the nouns with pronouns.", km: "សរសេរប្រយោគ ៥ ឡើងវិញដោយជំនួសនាមជាមួយសព្វនាម។" } },
        { id: "pro-hw-2", instruction: { en: "Write 5 sentences using subject pronouns and object pronouns.", km: "សរសេរប្រយោគ ៥ ដោយប្រើសព្វនាមប្រធាន និងសព្វនាមកម្មបំពេញ។" } },
        { id: "pro-hw-3", instruction: { en: "Fill in: \"___ (I/Me) gave ___ (she/her) a gift.\"", km: "បំពេញ៖ \"___ (I/Me) gave ___ (she/her) a gift.\"" } }
      ],
      quiz: [
        {
          id: "pro-q-1",
          question: { en: "\"___ is my friend.\" Choose the correct pronoun.", km: "\"___ is my friend.\" ជ្រើសរើសសព្វនាមត្រឹមត្រូវ។" },
          type: 'multiple-choice',
          options: [
            { en: "He", km: "He" },
            { en: "Him", km: "Him" },
            { en: "His", km: "His" },
            { en: "Her", km: "Her" }
          ],
          correctAnswer: "He",
          explanation: { en: "\"He\" is a subject pronoun used as the subject of the sentence.", km: "\"He\" ជាសព្វនាមប្រធានប្រើជាប្រធានប្រយោគ។" },
        },
        {
          id: "pro-q-2",
          question: { en: "\"I call ___ every day.\" Choose the correct pronoun.", km: "\"I call ___ every day.\" ជ្រើសរើសសព្វនាមត្រឹមត្រូវ។" },
          type: 'multiple-choice',
          options: [
            { en: "she", km: "she" },
            { en: "her", km: "her" },
            { en: "hers", km: "hers" },
            { en: "she is", km: "she is" }
          ],
          correctAnswer: "her",
          explanation: { en: "Use object pronoun \"her\" after the verb \"call\".", km: "ប្រើសព្វនាមកម្មបំពេញ \"her\" បន្ទាប់ពីកិរិយាស័ព្ទ \"call\"។" },
        },
        {
          id: "pro-q-3",
          question: { en: "\"___ am a teacher.\" Choose the correct pronoun.", km: "\"___ am a teacher.\" ជ្រើសរើសសព្វនាមត្រឹមត្រូវ។" },
          type: 'multiple-choice',
          options: [
            { en: "I", km: "I" },
            { en: "Me", km: "Me" },
            { en: "My", km: "My" },
            { en: "Mine", km: "Mine" }
          ],
          correctAnswer: "I",
          explanation: { en: "\"I\" is the subject pronoun used with \"am\".", km: "\"I\" ជាសព្វនាមប្រធានប្រើជាមួយ \"am\"។" },
        }
      ],
      vocabularyIds: ["i", "you", "he", "she", "it", "we", "they", "me", "him", "her", "us", "them", "friend", "call", "help", "invite", "gift", "give"],
    },
    {
      id: "a-an",
      title: { en: "A / An", km: "A / An" },
      level: "beginner",
      unitId: "unit-1",
      chapterId: "ch-4-parts-of-speech",
      order: 7,
      estimatedMinutes: 10,
      definition: { en: "Use \"a\" before words that begin with a consonant sound. Use \"an\" before words that begin with a vowel sound (a, e, i, o, u). These are called indefinite articles.", km: "ប្រើ \"a\" មុខពាក្យដែលចាប់ផ្តើមដោយសំឡេងព្យញ្ជនៈ។ ប្រើ \"an\" មុខពាក្យដែលចាប់ផ្តើមដោយសំឡេងស្រៈ (a, e, i, o, u)។ ទាំងនេះត្រូវបានគេហៅថាអត្ថបទមិនកំណត់។" },
            forms: {
        affirmative:         {
          structure: "Subject + be + a/an + noun",
          examples: [
          { en: "It is a book.", km: "វាជាសៀវភៅមួយ។" },
          { en: "She is an artist.", km: "នាងជាវិចិត្រករម្នាក់។" },
          { en: "He is a teacher.", km: "គាត់ជាគ្រូបង្រៀនម្នាក់។" },
          { en: "It is an apple.", km: "វាជាផ្លែប៉ោមមួយ។" },
          { en: "I am a student.", km: "ខ្ញុំជាសិស្សម្នាក់។" }
          ],
        },
        negative:         {
          structure: "Subject + be + not + a/an + noun",
          examples: [
          { en: "It is not a book.", km: "វាមិនមែនជាសៀវភៅទេ។" },
          { en: "She is not an artist.", km: "នាងមិនមែនជាវិចិត្រករទេ។" },
          { en: "He is not a teacher.", km: "គាត់មិនមែនជាគ្រូបង្រៀនទេ។" },
          { en: "It is not an apple.", km: "វាមិនមែនជាផ្លែប៉ោមទេ។" },
          { en: "I am not a student.", km: "ខ្ញុំមិនមែនជាសិស្សទេ។" }
          ],
        },
        question:         {
          structure: "Be + subject + a/an + noun?",
          examples: [
          { en: "Is it a book?", km: "តើវាជាសៀវភៅមែនទេ?" },
          { en: "Is she an artist?", km: "តើនាងជាវិចិត្រករមែនទេ?" },
          { en: "Is he a teacher?", km: "តើគាត់ជាគ្រូបង្រៀនមែនទេ?" },
          { en: "Is it an apple?", km: "តើវាជាផ្លែប៉ោមមែនទេ?" },
          { en: "Are you a student?", km: "តើអ្នកជាសិស្សមែនទេ?" }
          ],
        },
      },
      commonMistakes: [
        { mistake: "\"She is a artist.\"", correction: "\"She is an artist.\"", reason: { en: "Use \"an\" before words starting with a vowel sound. \"Artist\" starts with \"a\".", km: "ប្រើ \"an\" មុខពាក្យដែលចាប់ផ្តើមដោយសំឡេងស្រៈ។ \"Artist\" ចាប់ផ្តើមដោយ \"a\"។" } },
        { mistake: "\"It is an book.\"", correction: "\"It is a book.\"", reason: { en: "Use \"a\" before words starting with a consonant sound. \"Book\" starts with \"b\".", km: "ប្រើ \"a\" មុខពាក្យដែលចាប់ផ្តើមដោយសំឡេងព្យញ្ជនៈ។ \"Book\" ចាប់ផ្តើមដោយ \"b\"។" } },
        { mistake: "\"He is teacher.\"", correction: "\"He is a teacher.\"", reason: { en: "Always use \"a\" or \"an\" before singular countable nouns.", km: "តែងតែប្រើ \"a\" ឬ \"an\" មុខនាមរាប់បានឯកវចនៈ។" } }
      ],
      exercises: [
        {
          id: "aa-ex-1",
          question: { en: "Choose: \"___ (A/An) elephant is big.\"", km: "ជ្រើសរើស៖ \"___ (A/An) elephant is big.\"" },
          type: 'multiple-choice',
          options: [
            { en: "A", km: "A" },
            { en: "An", km: "An" },
            { en: "The", km: "The" },
            { en: "None", km: "None" }
          ],
          correctAnswer: "An",
          explanation: { en: "\"Elephant\" starts with a vowel sound \"e\", so use \"an\".", km: "\"Elephant\" ចាប់ផ្តើមដោយសំឡេងស្រៈ \"e\" ដូច្នេះប្រើ \"an\"។" },
        },
        {
          id: "aa-ex-2",
          question: { en: "Choose: \"She has ___ (a/an) cat.\"", km: "ជ្រើសរើស៖ \"She has ___ (a/an) cat.\"" },
          type: 'multiple-choice',
          options: [
            { en: "a", km: "a" },
            { en: "an", km: "an" },
            { en: "the", km: "the" },
            { en: "no", km: "no" }
          ],
          correctAnswer: "a",
          explanation: { en: "\"Cat\" starts with a consonant sound \"c\", so use \"a\".", km: "\"Cat\" ចាប់ផ្តើមដោយសំឡេងព្យញ្ជនៈ \"c\" ដូច្នេះប្រើ \"a\"។" },
        },
        {
          id: "aa-ex-3",
          question: { en: "Fill in: \"I am ___ student.\"", km: "បំពេញ៖ \"I am ___ student.\"" },
          type: 'multiple-choice',
          options: [
            { en: "a", km: "a" },
            { en: "an", km: "an" },
            { en: "the", km: "the" },
            { en: "none", km: "none" }
          ],
          correctAnswer: "a",
          explanation: { en: "\"Student\" starts with a consonant sound \"s\", so use \"a\".", km: "\"Student\" ចាប់ផ្តើមដោយសំឡេងព្យញ្ជនៈ \"s\" ដូច្នេះប្រើ \"a\"។" },
        },
        {
          id: "aa-ex-4",
          question: { en: "Fill in: \"It is ___ orange.\"", km: "បំពេញ៖ \"It is ___ orange.\"" },
          type: 'multiple-choice',
          options: [
            { en: "a", km: "a" },
            { en: "an", km: "an" },
            { en: "the", km: "the" },
            { en: "none", km: "none" }
          ],
          correctAnswer: "an",
          explanation: { en: "\"Orange\" starts with a vowel sound \"o\", so use \"an\".", km: "\"Orange\" ចាប់ផ្តើមដោយសំឡេងស្រៈ \"o\" ដូច្នេះប្រើ \"an\"។" },
        },
        {
          id: "aa-ex-5",
          question: { en: "Which is correct?", km: "តើមួយណាត្រឹមត្រូវ?" },
          type: 'multiple-choice',
          options: [
            { en: "He is a engineer.", km: "He is a engineer." },
            { en: "He is an engineer.", km: "He is an engineer." },
            { en: "He is engineer.", km: "He is engineer." },
            { en: "Engineer he is.", km: "Engineer he is." }
          ],
          correctAnswer: "He is an engineer.",
          explanation: { en: "\"Engineer\" starts with a vowel sound \"e\", so use \"an\".", km: "\"Engineer\" ចាប់ផ្តើមដោយសំឡេងស្រៈ \"e\" ដូច្នេះប្រើ \"an\"។" },
        }
      ],
      homework: [
        { id: "aa-hw-1", instruction: { en: "Find 10 things in your room and write \"a\" or \"an\" before each one.", km: "រកវត្ថុ ១០ ក្នុងបន្ទប់របស់អ្នក ហើយសរសេរ \"a\" ឬ \"an\" មុខវត្ថុនីមួយៗ។" } },
        { id: "aa-hw-2", instruction: { en: "Write 5 sentences using \"a\" and 5 sentences using \"an\".", km: "សរសេរប្រយោគ ៥ ដោយប្រើ \"a\" និង ៥ ដោយប្រើ \"an\"។" } }
      ],
      quiz: [
        {
          id: "aa-q-1",
          question: { en: "Choose: \"___ (A/An) university.\" (Note: \"university\" starts with /ju:/ sound)", km: "ជ្រើសរើស៖ \"___ (A/An) university.\"" },
          type: 'multiple-choice',
          options: [
            { en: "A", km: "A" },
            { en: "An", km: "An" },
            { en: "The", km: "The" },
            { en: "None", km: "None" }
          ],
          correctAnswer: "A",
          explanation: { en: "\"University\" starts with a consonant sound /j/, so use \"a\".", km: "\"University\" ចាប់ផ្តើមដោយសំឡេងព្យញ្ជនៈ /j/ ដូច្នេះប្រើ \"a\"។" },
        },
        {
          id: "aa-q-2",
          question: { en: "Choose: \"___ (A/An) hour.\" (Note: \"hour\" starts with a silent \"h\")", km: "ជ្រើសរើស៖ \"___ (A/An) hour.\"" },
          type: 'multiple-choice',
          options: [
            { en: "A", km: "A" },
            { en: "An", km: "An" },
            { en: "The", km: "The" },
            { en: "None", km: "None" }
          ],
          correctAnswer: "An",
          explanation: { en: "\"Hour\" starts with a vowel sound (silent \"h\"), so use \"an\".", km: "\"Hour\" ចាប់ផ្តើមដោយសំឡេងស្រៈ (h ស្ងាត់) ដូច្នេះប្រើ \"an\"។" },
        },
        {
          id: "aa-q-3",
          question: { en: "Fill in: \"It is ___ umbrella.\"", km: "បំពេញ៖ \"It is ___ umbrella.\"" },
          type: 'multiple-choice',
          options: [
            { en: "a", km: "a" },
            { en: "an", km: "an" },
            { en: "the", km: "the" },
            { en: "none", km: "none" }
          ],
          correctAnswer: "an",
          explanation: { en: "\"Umbrella\" starts with a vowel sound \"u\", so use \"an\".", km: "\"Umbrella\" ចាប់ផ្តើមដោយសំឡេងស្រៈ \"u\" ដូច្នេះប្រើ \"an\"។" },
        }
      ],
      vocabularyIds: ["a", "an", "book", "artist", "teacher", "apple", "student", "elephant", "cat", "orange", "engineer", "umbrella", "university", "hour"],
    }
      ],
    },
    {
      id: "ch-5-demonstratives",
      title: { en: "Demonstratives", km: "សព្វនាមចង្អុល" },
      lessons: [
    {
      id: "this-that-these-those",
      title: { en: "This / That / These / Those", km: "This / That / These / Those" },
      level: "beginner",
      unitId: "unit-1",
      chapterId: "ch-5-demonstratives",
      order: 8,
      estimatedMinutes: 10,
      definition: { en: "Use \"this\" for something near (singular). Use \"that\" for something far (singular). Use \"these\" for things near (plural). Use \"those\" for things far (plural).", km: "ប្រើ \"this\" សម្រាប់អ្វីដែលនៅជិត (ឯកវចនៈ)។ ប្រើ \"that\" សម្រាប់អ្វីដែលនៅឆ្ងាយ (ឯកវចនៈ)។ ប្រើ \"these\" សម្រាប់អ្វីដែលនៅជិត (ពហុវចនៈ)។ ប្រើ \"those\" សម្រាប់អ្វីដែលនៅឆ្ងាយ (ពហុវចនៈ)។" },
            forms: {
        affirmative:         {
          structure: "This/That + is + noun | These/Those + are + noun",
          examples: [
          { en: "This is a pen.", km: "នេះគឺជាប៊ិចមួយ។" },
          { en: "That is a car.", km: "នោះគឺជាឡានមួយ។" },
          { en: "These are books.", km: "ទាំងនេះគឺជាសៀវភៅ។" },
          { en: "Those are chairs.", km: "ទាំងនោះគឺជាកៅអី។" },
          { en: "This is my phone.", km: "នេះគឺជាទូរស័ព្ទរបស់ខ្ញុំ។" }
          ],
        },
        negative:         {
          structure: "This/That + is + not + noun | These/Those + are + not + noun",
          examples: [
          { en: "This is not a pen.", km: "នេះមិនមែនជាប៊ិចទេ។" },
          { en: "That is not a car.", km: "នោះមិនមែនជាឡានទេ។" },
          { en: "These are not books.", km: "ទាំងនេះមិនមែនជាសៀវភៅទេ។" },
          { en: "Those are not chairs.", km: "ទាំងនោះមិនមែនជាកៅអីទេ។" },
          { en: "That is not my bag.", km: "នោះមិនមែនជាកាបូបរបស់ខ្ញុំទេ។" }
          ],
        },
        question:         {
          structure: "Is + this/that + noun? | Are + these/those + noun?",
          examples: [
          { en: "Is this a pen? Yes, it is.", km: "តើនេះជាប៊ិចមែនទេ? បាទ វាជា។" },
          { en: "Is that a car? No, it is not.", km: "តើនោះជាឡានមែនទេ? ទេ វាមិនមែនទេ។" },
          { en: "Are these books? Yes, they are.", km: "តើទាំងនេះជាសៀវភៅមែនទេ? បាទ ពួកវាជា។" },
          { en: "Are those chairs? No, they are not.", km: "តើទាំងនោះជាកៅអីមែនទេ? ទេ ពួកវាមិនមែនទេ។" },
          { en: "Is this your phone? Yes, it is.", km: "តើនេះជាទូរស័ព្ទរបស់អ្នកមែនទេ? បាទ វាជា។" }
          ],
        },
      },
      commonMistakes: [
        { mistake: "\"This are a book.\"", correction: "\"This is a book.\"", reason: { en: "Use \"is\" with \"this\" and \"that\" (singular).", km: "ប្រើ \"is\" ជាមួយ \"this\" និង \"that\" (ឯកវចនៈ)។" } },
        { mistake: "\"These is books.\"", correction: "\"These are books.\"", reason: { en: "Use \"are\" with \"these\" and \"those\" (plural).", km: "ប្រើ \"are\" ជាមួយ \"these\" និង \"those\" (ពហុវចនៈ)។" } },
        { mistake: "\"That pens are blue.\"", correction: "\"Those pens are blue.\"", reason: { en: "Use \"those\" for plural things that are far.", km: "ប្រើ \"those\" សម្រាប់វត្ថុពហុវចនៈដែលនៅឆ្ងាយ។" } }
      ],
      exercises: [
        {
          id: "ttt-ex-1",
          question: { en: "Choose: \"___ (This/These) is a book.\" (near, singular)", km: "ជ្រើសរើស៖ \"___ (This/These) is a book.\"" },
          type: 'multiple-choice',
          options: [
            { en: "This", km: "This" },
            { en: "These", km: "These" },
            { en: "That", km: "That" },
            { en: "Those", km: "Those" }
          ],
          correctAnswer: "This",
          explanation: { en: "\"This\" is used for a singular noun that is near.", km: "\"This\" ត្រូវបានប្រើសម្រាប់នាមឯកវចនៈដែលនៅជិត។" },
        },
        {
          id: "ttt-ex-2",
          question: { en: "Choose: \"___ (That/Those) are chairs.\" (far, plural)", km: "ជ្រើសរើស៖ \"___ (That/Those) are chairs.\"" },
          type: 'multiple-choice',
          options: [
            { en: "That", km: "That" },
            { en: "Those", km: "Those" },
            { en: "This", km: "This" },
            { en: "These", km: "These" }
          ],
          correctAnswer: "Those",
          explanation: { en: "\"Those\" is used for plural nouns that are far.", km: "\"Those\" ត្រូវបានប្រើសម្រាប់នាមពហុវចនៈដែលនៅឆ្ងាយ។" },
        },
        {
          id: "ttt-ex-3",
          question: { en: "Fill in: \"___ is my bag.\" (near, singular)", km: "បំពេញ៖ \"___ is my bag.\" (នៅជិត, ឯកវចនៈ)" },
          type: 'multiple-choice',
          options: [
            { en: "This", km: "This" },
            { en: "These", km: "These" },
            { en: "Those", km: "Those" },
            { en: "They", km: "They" }
          ],
          correctAnswer: "This",
          explanation: { en: "\"This\" is correct for a singular noun near the speaker.", km: "\"This\" ត្រឹមត្រូវសម្រាប់នាមឯកវចនៈនៅជិតអ្នកនិយាយ។" },
        },
        {
          id: "ttt-ex-4",
          question: { en: "Fill in: \"___ are my shoes.\" (far, plural)", km: "បំពេញ៖ \"___ are my shoes.\" (នៅឆ្ងាយ, ពហុវចនៈ)" },
          type: 'multiple-choice',
          options: [
            { en: "This", km: "This" },
            { en: "That", km: "That" },
            { en: "These", km: "These" },
            { en: "Those", km: "Those" }
          ],
          correctAnswer: "Those",
          explanation: { en: "\"Those\" is correct for plural nouns far from the speaker.", km: "\"Those\" ត្រឹមត្រូវសម្រាប់នាមពហុវចនៈឆ្ងាយពីអ្នកនិយាយ។" },
        },
        {
          id: "ttt-ex-5",
          question: { en: "Choose the correct sentence:", km: "ជ្រើសរើសប្រយោគត្រឹមត្រូវ៖" },
          type: 'multiple-choice',
          options: [
            { en: "This are my keys.", km: "This are my keys." },
            { en: "These is my keys.", km: "These is my keys." },
            { en: "These are my keys.", km: "These are my keys." },
            { en: "This my keys.", km: "This my keys." }
          ],
          correctAnswer: "These are my keys.",
          explanation: { en: "\"Keys\" is plural, so use \"These are\".", km: "\"Keys\" ជាពហុវចនៈ ដូច្នេះប្រើ \"These are\"។" },
        }
      ],
      homework: [
        { id: "ttt-hw-1", instruction: { en: "Walk around your room. Point to 5 objects near you and 5 objects far from you and say the correct demonstrative.", km: "ដើរជុំវិញបន្ទប់របស់អ្នក។ ចង្អុលទៅវត្ថុ ៥ នៅជិតអ្នក និង ៥ នៅឆ្ងាយពីអ្នក ហើយនិយាយពាក្យចង្អុលត្រឹមត្រូវ។" } },
        { id: "ttt-hw-2", instruction: { en: "Write 4 sentences: one with this, one with that, one with these, one with those.", km: "សរសេរប្រយោគ ៤៖ មួយជាមួយ this, មួយជាមួយ that, មួយជាមួយ these, មួយជាមួយ those។" } }
      ],
      quiz: [
        {
          id: "ttt-q-1",
          question: { en: "Which word do you use for a book in your hand?", km: "តើអ្នកប្រើពាក្យអ្វីសម្រាប់សៀវភៅនៅក្នុងដៃរបស់អ្នក?" },
          type: 'multiple-choice',
          options: [
            { en: "This", km: "This" },
            { en: "That", km: "That" },
            { en: "These", km: "These" },
            { en: "Those", km: "Those" }
          ],
          correctAnswer: "This",
          explanation: { en: "A book in your hand is near, singular — use \"this\".", km: "សៀវភៅនៅក្នុងដៃរបស់អ្នកគឺនៅជិត ឯកវចនៈ — ប្រើ \"this\"។" },
        },
        {
          id: "ttt-q-2",
          question: { en: "Which word do you use for chairs across the room?", km: "តើអ្នកប្រើពាក្យអ្វីសម្រាប់កៅអីនៅត្រើយម្ខាងបន្ទប់?" },
          type: 'multiple-choice',
          options: [
            { en: "This", km: "This" },
            { en: "That", km: "That" },
            { en: "These", km: "These" },
            { en: "Those", km: "Those" }
          ],
          correctAnswer: "Those",
          explanation: { en: "Chairs across the room are far and plural — use \"those\".", km: "កៅអីនៅត្រើយម្ខាងបន្ទប់គឺឆ្ងាយ និងពហុវចនៈ — ប្រើ \"those\"។" },
        },
        {
          id: "ttt-q-3",
          question: { en: "Complete: \"___ are my friends standing next to me.\"", km: "បំពេញ៖ \"___ are my friends standing next to me.\"" },
          type: 'multiple-choice',
          options: [
            { en: "This", km: "This" },
            { en: "That", km: "That" },
            { en: "These", km: "These" },
            { en: "Those", km: "Those" }
          ],
          correctAnswer: "These",
          explanation: { en: "Friends next to you are near and plural — use \"these\".", km: "មិត្តភក្តិនៅក្បែរអ្នកគឺនៅជិត និងពហុវចនៈ — ប្រើ \"these\"។" },
        }
      ],
      vocabularyIds: ["this", "that", "these", "those", "pen", "book", "car", "chair", "phone", "bag", "key", "shoe"],
    }
      ],
    },
    {
      id: "ch-6-quantifiers",
      title: { en: "Quantifiers", km: "បរិមាណន័យ" },
      lessons: [
    {
      id: "some-any",
      title: { en: "Some / Any", km: "Some / Any" },
      level: "beginner",
      unitId: "unit-1",
      chapterId: "ch-6-quantifiers",
      order: 9,
      estimatedMinutes: 10,
      definition: { en: "Use \"some\" in positive sentences and offers/requests. Use \"any\" in negative sentences and questions. Both are used with uncountable nouns and plural countable nouns.", km: "ប្រើ \"some\" ក្នុងប្រយោគបញ្ជាក់ និងការផ្តល់ជូន/សំណើ។ ប្រើ \"any\" ក្នុងប្រយោគអវិជ្ជមាន និងសំណួរ។ ទាំងពីរត្រូវបានប្រើជាមួយនាមរាប់មិនបាន និងនាមរាប់បានពហុវចនៈ។" },
            forms: {
        affirmative:         {
          structure: "Subject + verb + some + noun",
          examples: [
          { en: "I have some water.", km: "ខ្ញុំមានទឹកខ្លះ។" },
          { en: "She has some books.", km: "នាងមានសៀវភៅខ្លះ។" },
          { en: "They need some help.", km: "ពួកគេត្រូវការជំនួយខ្លះ។" },
          { en: "We want some rice.", km: "ពួកយើងចង់បានបាយខ្លះ។" },
          { en: "I bought some apples.", km: "ខ្ញុំបានទិញផ្លែប៉ោមខ្លះ។" }
          ],
        },
        negative:         {
          structure: "Subject + do/does not + verb + any + noun",
          examples: [
          { en: "I do not have any water.", km: "ខ្ញុំមិនមានទឹកទេ។" },
          { en: "She does not have any books.", km: "នាងមិនមានសៀវភៅទេ។" },
          { en: "They do not need any help.", km: "ពួកគេមិនត្រូវការជំនួយទេ។" },
          { en: "We do not want any rice.", km: "ពួកយើងមិនចង់បានបាយទេ។" },
          { en: "I did not buy any apples.", km: "ខ្ញុំមិនបានទិញផ្លែប៉ោមទេ។" }
          ],
        },
        question:         {
          structure: "Do/Does + subject + verb + any + noun?",
          examples: [
          { en: "Do you have any water?", km: "តើអ្នកមានទឹកទេ?" },
          { en: "Does she have any books?", km: "តើនាងមានសៀវភៅទេ?" },
          { en: "Do they need any help?", km: "តើពួកគេត្រូវការជំនួយទេ?" },
          { en: "Do you want any rice?", km: "តើអ្នកចង់បានបាយទេ?" },
          { en: "Did you buy any apples?", km: "តើអ្នកបានទិញផ្លែប៉ោមទេ?" }
          ],
        },
      },
      commonMistakes: [
        { mistake: "\"I have any water.\"", correction: "\"I have some water.\"", reason: { en: "Use \"some\" in positive sentences.", km: "ប្រើ \"some\" ក្នុងប្រយោគបញ្ជាក់។" } },
        { mistake: "\"I do not have some water.\"", correction: "\"I do not have any water.\"", reason: { en: "Use \"any\" in negative sentences.", km: "ប្រើ \"any\" ក្នុងប្រយោគអវិជ្ជមាន។" } },
        { mistake: "\"Do you have some water?\" (general question)", correction: "\"Do you have any water?\"", reason: { en: "Use \"any\" in most questions. Use \"some\" for offers/requests.", km: "ប្រើ \"any\" ក្នុងសំណួរភាគច្រើន។ ប្រើ \"some\" សម្រាប់ការផ្តល់ជូន/សំណើ។" } }
      ],
      exercises: [
        {
          id: "sa-ex-1",
          question: { en: "Choose: \"I have ___ (some/any) money.\"", km: "ជ្រើសរើស៖ \"I have ___ (some/any) money.\"" },
          type: 'multiple-choice',
          options: [
            { en: "some", km: "some" },
            { en: "any", km: "any" },
            { en: "a", km: "a" },
            { en: "an", km: "an" }
          ],
          correctAnswer: "some",
          explanation: { en: "Use \"some\" in positive sentences.", km: "ប្រើ \"some\" ក្នុងប្រយោគបញ្ជាក់។" },
        },
        {
          id: "sa-ex-2",
          question: { en: "Choose: \"I do not have ___ (some/any) money.\"", km: "ជ្រើសរើស៖ \"I do not have ___ (some/any) money.\"" },
          type: 'multiple-choice',
          options: [
            { en: "some", km: "some" },
            { en: "any", km: "any" },
            { en: "a", km: "a" },
            { en: "an", km: "an" }
          ],
          correctAnswer: "any",
          explanation: { en: "Use \"any\" in negative sentences with \"not\".", km: "ប្រើ \"any\" ក្នុងប្រយោគអវិជ្ជមានជាមួយ \"not\"។" },
        },
        {
          id: "sa-ex-3",
          question: { en: "Choose: \"Do you have ___ (some/any) children?\"", km: "ជ្រើសរើស៖ \"Do you have ___ (some/any) children?\"" },
          type: 'multiple-choice',
          options: [
            { en: "some", km: "some" },
            { en: "any", km: "any" },
            { en: "a", km: "a" },
            { en: "an", km: "an" }
          ],
          correctAnswer: "any",
          explanation: { en: "Use \"any\" in questions.", km: "ប្រើ \"any\" ក្នុងសំណួរ។" },
        },
        {
          id: "sa-ex-4",
          question: { en: "Complete: \"Would you like ___ (some/any) tea?\" (offer)", km: "បំពេញ៖ \"Would you like ___ (some/any) tea?\" (ការផ្តល់ជូន)" },
          type: 'multiple-choice',
          options: [
            { en: "some", km: "some" },
            { en: "any", km: "any" },
            { en: "a", km: "a" },
            { en: "the", km: "the" }
          ],
          correctAnswer: "some",
          explanation: { en: "Use \"some\" in offers and requests even in question form.", km: "ប្រើ \"some\" ក្នុងការផ្តល់ជូន និងសំណើ សូម្បីតែក្នុងទម្រង់សំណួរ។" },
        },
        {
          id: "sa-ex-5",
          question: { en: "Choose the correct sentence:", km: "ជ្រើសរើសប្រយោគត្រឹមត្រូវ៖" },
          type: 'multiple-choice',
          options: [
            { en: "She has any cats.", km: "She has any cats." },
            { en: "She does not have some cats.", km: "She does not have some cats." },
            { en: "She does not have any cats.", km: "She does not have any cats." },
            { en: "She not have any cats.", km: "She not have any cats." }
          ],
          correctAnswer: "She does not have any cats.",
          explanation: { en: "Negative sentence needs \"does not\" + \"any\".", km: "ប្រយោគអវិជ្ជមានត្រូវការ \"does not\" + \"any\"។" },
        }
      ],
      homework: [
        { id: "sa-hw-1", instruction: { en: "Write 5 positive sentences using \"some\" and 5 negative sentences using \"any\".", km: "សរសេរប្រយោគបញ្ជាក់ ៥ ដោយប្រើ \"some\" និងប្រយោគអវិជ្ជមាន ៥ ដោយប្រើ \"any\"។" } },
        { id: "sa-hw-2", instruction: { en: "Ask 5 questions using \"any\".", km: "សួរសំណួរ ៥ ដោយប្រើ \"any\"។" } }
      ],
      quiz: [
        {
          id: "sa-q-1",
          question: { en: "\"I have ___ friends in the city.\"", km: "\"I have ___ friends in the city.\"" },
          type: 'multiple-choice',
          options: [
            { en: "some", km: "some" },
            { en: "any", km: "any" },
            { en: "a", km: "a" },
            { en: "an", km: "an" }
          ],
          correctAnswer: "some",
          explanation: { en: "Use \"some\" in positive statements.", km: "ប្រើ \"some\" ក្នុងប្រយោគបញ្ជាក់។" },
        },
        {
          id: "sa-q-2",
          question: { en: "\"There is not ___ milk in the fridge.\"", km: "\"There is not ___ milk in the fridge.\"" },
          type: 'multiple-choice',
          options: [
            { en: "some", km: "some" },
            { en: "any", km: "any" },
            { en: "a", km: "a" },
            { en: "many", km: "many" }
          ],
          correctAnswer: "any",
          explanation: { en: "Use \"any\" after \"not\" in negative sentences.", km: "ប្រើ \"any\" បន្ទាប់ពី \"not\" ក្នុងប្រយោគអវិជ្ជមាន។" },
        },
        {
          id: "sa-q-3",
          question: { en: "\"Can I have ___ water, please?\" (request)", km: "\"Can I have ___ water, please?\" (សំណើ)" },
          type: 'multiple-choice',
          options: [
            { en: "some", km: "some" },
            { en: "any", km: "any" },
            { en: "a", km: "a" },
            { en: "an", km: "an" }
          ],
          correctAnswer: "some",
          explanation: { en: "Use \"some\" in polite requests.", km: "ប្រើ \"some\" ក្នុងសំណើគួរសម។" },
        }
      ],
      vocabularyIds: ["some", "any", "water", "rice", "help", "money", "book", "tea", "milk", "friend", "apple", "child"],
    },
    {
      id: "countable-uncountable",
      title: { en: "Countable & Uncountable Nouns", km: "នាមរាប់បាន និង រាប់មិនបាន" },
      level: "beginner",
      unitId: "unit-1",
      chapterId: "ch-6-quantifiers",
      order: 10,
      estimatedMinutes: 15,
      definition: { en: "Countable nouns can be counted (one apple, two apples). Uncountable nouns cannot be counted (water, rice, milk). Use \"a/an\" with singular countable nouns. Use \"some/any\" with uncountable and plural countable nouns.", km: "នាមរាប់បានអាចរាប់បាន (ផ្លែប៉ោមមួយ ផ្លែប៉ោមពីរ)។ នាមរាប់មិនបានមិនអាចរាប់បានទេ (ទឹក បាយ ទឹកដោះគោ)។ ប្រើ \"a/an\" ជាមួយនាមរាប់បានឯកវចនៈ។ ប្រើ \"some/any\" ជាមួយនាមរាប់មិនបាន និងនាមរាប់បានពហុវចនៈ។" },
            forms: {
        affirmative:         {
          structure: "Countable: a/an + singular | number + plural. Uncountable: some + uncountable",
          examples: [
          { en: "I have a banana.", km: "ខ្ញុំមានចេកមួយ។" },
          { en: "She has two bananas.", km: "នាងមានចេកពីរ។" },
          { en: "We have some rice.", km: "ពួកយើងមានបាយខ្លះ។" },
          { en: "He drinks milk every day.", km: "គាត់ផឹកទឹកដោះគោរាល់ថ្ងៃ។" },
          { en: "They have three cars.", km: "ពួកគេមានឡានបី។" }
          ],
        },
        negative:         {
          structure: "Countable: do/does not have + a/an/any + noun. Uncountable: do/does not have + any + noun",
          examples: [
          { en: "I do not have a banana.", km: "ខ្ញុំមិនមានចេកទេ។" },
          { en: "She does not have any bananas.", km: "នាងមិនមានចេកទេ។" },
          { en: "We do not have any rice.", km: "ពួកយើងមិនមានបាយទេ។" },
          { en: "He does not drink milk.", km: "គាត់មិនផឹកទឹកដោះគោទេ។" },
          { en: "They do not have a car.", km: "ពួកគេមិនមានឡានទេ។" }
          ],
        },
        question:         {
          structure: "Do/Does + subject + have + any + noun? | How many/much?",
          examples: [
          { en: "Do you have a banana?", km: "តើអ្នកមានចេកទេ?" },
          { en: "Does she have any bananas?", km: "តើនាងមានចេកទេ?" },
          { en: "Do you have any rice?", km: "តើអ្នកមានបាយទេ?" },
          { en: "How many apples do you have?", km: "តើអ្នកមានផ្លែប៉ោមប៉ុន្មាន?" },
          { en: "How much water do you need?", km: "តើអ្នកត្រូវការទឹកប៉ុន្មាន?" }
          ],
        },
      },
      commonMistakes: [
        { mistake: "\"I have many rice.\"", correction: "\"I have a lot of rice.\" / \"I have some rice.\"", reason: { en: "\"Rice\" is uncountable. Use \"much\" or \"a lot of\", not \"many\".", km: "\"Rice\" ជានាមរាប់មិនបាន។ ប្រើ \"much\" ឬ \"a lot of\" មិនមែន \"many\"។" } },
        { mistake: "\"I need a milk.\"", correction: "\"I need some milk.\"", reason: { en: "Do not use \"a/an\" with uncountable nouns.", km: "កុំប្រើ \"a/an\" ជាមួយនាមរាប់មិនបាន។" } },
        { mistake: "\"I have two rices.\"", correction: "\"I have two bowls of rice.\"", reason: { en: "Uncountable nouns do not have a plural form.", km: "នាមរាប់មិនបានគ្មានទម្រង់ពហុវចនៈទេ។" } }
      ],
      exercises: [
        {
          id: "cu-ex-1",
          question: { en: "Which is countable?", km: "តើមួយណារាប់បាន?" },
          type: 'multiple-choice',
          options: [
            { en: "water", km: "water" },
            { en: "rice", km: "rice" },
            { en: "apple", km: "apple" },
            { en: "milk", km: "milk" }
          ],
          correctAnswer: "apple",
          explanation: { en: "\"Apple\" is countable — you can say one apple, two apples.", km: "\"Apple\" រាប់បាន — អ្នកអាចនិយាយបានថា ផ្លែប៉ោមមួយ ផ្លែប៉ោមពីរ។" },
        },
        {
          id: "cu-ex-2",
          question: { en: "Which is uncountable?", km: "តើមួយណារាប់មិនបាន?" },
          type: 'multiple-choice',
          options: [
            { en: "banana", km: "banana" },
            { en: "car", km: "car" },
            { en: "water", km: "water" },
            { en: "book", km: "book" }
          ],
          correctAnswer: "water",
          explanation: { en: "\"Water\" is uncountable — you cannot say \"one water\".", km: "\"Water\" រាប់មិនបាន — អ្នកមិនអាចនិយាយ \"one water\" បានទេ។" },
        },
        {
          id: "cu-ex-3",
          question: { en: "Complete: \"I need ___ (a/some) milk.\"", km: "បំពេញ៖ \"I need ___ (a/some) milk.\"" },
          type: 'multiple-choice',
          options: [
            { en: "a", km: "a" },
            { en: "an", km: "an" },
            { en: "some", km: "some" },
            { en: "many", km: "many" }
          ],
          correctAnswer: "some",
          explanation: { en: "\"Milk\" is uncountable, so use \"some\" not \"a\".", km: "\"Milk\" រាប់មិនបាន ដូច្នេះប្រើ \"some\" មិនមែន \"a\"។" },
        },
        {
          id: "cu-ex-4",
          question: { en: "Complete: \"I have three ___ (book/books).\"", km: "បំពេញ៖ \"I have three ___ (book/books).\"" },
          type: 'multiple-choice',
          options: [
            { en: "book", km: "book" },
            { en: "books", km: "books" },
            { en: "a book", km: "a book" },
            { en: "some book", km: "some book" }
          ],
          correctAnswer: "books",
          explanation: { en: "Use plural form \"books\" after the number three.", km: "ប្រើទម្រង់ពហុវចនៈ \"books\" បន្ទាប់ពីលេខបី។" },
        },
        {
          id: "cu-ex-5",
          question: { en: "Choose the correct sentence:", km: "ជ្រើសរើសប្រយោគត្រឹមត្រូវ៖" },
          type: 'multiple-choice',
          options: [
            { en: "I have a rice.", km: "I have a rice." },
            { en: "I have some rices.", km: "I have some rices." },
            { en: "I have some rice.", km: "I have some rice." },
            { en: "I have many rice.", km: "I have many rice." }
          ],
          correctAnswer: "I have some rice.",
          explanation: { en: "\"Rice\" is uncountable. Use \"some\" + uncountable noun (no plural).", km: "\"Rice\" រាប់មិនបាន។ ប្រើ \"some\" + នាមរាប់មិនបាន (គ្មានពហុវចនៈ)។" },
        }
      ],
      homework: [
        { id: "cu-hw-1", instruction: { en: "List 10 countable and 10 uncountable nouns in your kitchen.", km: "រាយនាមរាប់បាន ១០ និងនាមរាប់មិនបាន ១០ នៅក្នុងផ្ទះបាយរបស់អ្នក។" } },
        { id: "cu-hw-2", instruction: { en: "Write 5 sentences using countable nouns and 5 using uncountable nouns.", km: "សរសេរប្រយោគ ៥ ដោយប្រើនាមរាប់បាន និង ៥ ដោយប្រើនាមរាប់មិនបាន។" } }
      ],
      quiz: [
        {
          id: "cu-q-1",
          question: { en: "Which sentence is correct?", km: "តើប្រយោគមួយណាត្រឹមត្រូវ?" },
          type: 'multiple-choice',
          options: [
            { en: "I need a water.", km: "I need a water." },
            { en: "I need some water.", km: "I need some water." },
            { en: "I need waters.", km: "I need waters." },
            { en: "I need a waters.", km: "I need a waters." }
          ],
          correctAnswer: "I need some water.",
          explanation: { en: "\"Water\" is uncountable. Use \"some\" with uncountable nouns.", km: "\"Water\" រាប់មិនបាន។ ប្រើ \"some\" ជាមួយនាមរាប់មិនបាន។" },
        },
        {
          id: "cu-q-2",
          question: { en: "\"I have two ___.\" Choose the correct noun.", km: "\"I have two ___.\" ជ្រើសរើសនាមត្រឹមត្រូវ។" },
          type: 'multiple-choice',
          options: [
            { en: "children", km: "children" },
            { en: "childs", km: "childs" },
            { en: "child", km: "child" },
            { en: "childes", km: "childes" }
          ],
          correctAnswer: "children",
          explanation: { en: "\"Children\" is the irregular plural of \"child\".", km: "\"Children\" ជាពហុវចនៈមិនទៀងទាត់របស់ \"child\"។" },
        },
        {
          id: "cu-q-3",
          question: { en: "\"How ___ (many/much) sugar do you want?\"", km: "\"How ___ (many/much) sugar do you want?\"" },
          type: 'multiple-choice',
          options: [
            { en: "many", km: "many" },
            { en: "much", km: "much" },
            { en: "a lot", km: "a lot" },
            { en: "some", km: "some" }
          ],
          correctAnswer: "much",
          explanation: { en: "\"Sugar\" is uncountable, so use \"how much\".", km: "\"Sugar\" រាប់មិនបាន ដូច្នេះប្រើ \"how much\"។" },
        }
      ],
      vocabularyIds: ["countable", "uncountable", "apple", "banana", "rice", "water", "milk", "sugar", "car", "book", "child", "rice", "milk", "water", "car", "book", "banana"],
    },
    {
      id: "there-is-there-are",
      title: { en: "There Is / There Are", km: "There Is / There Are" },
      level: "beginner",
      unitId: "unit-1",
      chapterId: "ch-6-quantifiers",
      order: 11,
      estimatedMinutes: 10,
      definition: { en: "Use \"there is\" with singular and uncountable nouns. Use \"there are\" with plural nouns. \"There is/are\" talks about the existence of something.", km: "ប្រើ \"there is\" ជាមួយនាមឯកវចនៈ និងនាមរាប់មិនបាន។ ប្រើ \"there are\" ជាមួយនាមពហុវចនៈ។ \"There is/are\" និយាយអំពីអត្ថិភាពនៃអ្វីមួយ។" },
            forms: {
        affirmative:         {
          structure: "There is + a/an/some + singular/uncountable noun | There are + plural noun",
          examples: [
          { en: "There is a book on the table.", km: "មានសៀវភៅមួយនៅលើតុ។" },
          { en: "There is some milk in the fridge.", km: "មានទឹកដោះគោខ្លះនៅក្នុងទូទឹកកក។" },
          { en: "There are three chairs in the room.", km: "មានកៅអីបីនៅក្នុងបន្ទប់។" },
          { en: "There are many students in class.", km: "មានសិស្សច្រើននាក់ក្នុងថ្នាក់។" },
          { en: "There is a cat under the bed.", km: "មានឆ្មាមួយនៅក្រោមគ្រែ។" }
          ],
        },
        negative:         {
          structure: "There is/are + not + any + noun",
          examples: [
          { en: "There is not a book on the table.", km: "គ្មានសៀវភៅនៅលើតុទេ។" },
          { en: "There is not any milk in the fridge.", km: "គ្មានទឹកដោះគោនៅក្នុងទូទឹកកកទេ។" },
          { en: "There are not any chairs in the room.", km: "គ្មានកៅអីនៅក្នុងបន្ទប់ទេ។" },
          { en: "There are not many students in class.", km: "គ្មានសិស្សច្រើននាក់ក្នុងថ្នាក់ទេ។" },
          { en: "There is not a cat under the bed.", km: "គ្មានឆ្មានៅក្រោមគ្រែទេ។" }
          ],
        },
        question:         {
          structure: "Is/Are there + any + noun?",
          examples: [
          { en: "Is there a book on the table?", km: "តើមានសៀវភៅនៅលើតុទេ?" },
          { en: "Is there any milk in the fridge?", km: "តើមានទឹកដោះគោនៅក្នុងទូទឹកកកទេ?" },
          { en: "Are there any chairs in the room?", km: "តើមានកៅអីនៅក្នុងបន្ទប់ទេ?" },
          { en: "Are there many students in class?", km: "តើមានសិស្សច្រើននាក់ក្នុងថ្នាក់ទេ?" },
          { en: "Is there a cat under the bed?", km: "តើមានឆ្មានៅក្រោមគ្រែទេ?" }
          ],
        },
      },
      commonMistakes: [
        { mistake: "\"There is three books.\"", correction: "\"There are three books.\"", reason: { en: "Use \"there are\" before plural nouns.", km: "ប្រើ \"there are\" មុខនាមពហុវចនៈ។" } },
        { mistake: "\"There are a book.\"", correction: "\"There is a book.\"", reason: { en: "Use \"there is\" before singular nouns.", km: "ប្រើ \"there is\" មុខនាមឯកវចនៈ។" } },
        { mistake: "\"There is not some milk.\"", correction: "\"There is not any milk.\"", reason: { en: "Use \"any\" in negative sentences with \"there is/are\".", km: "ប្រើ \"any\" ក្នុងប្រយោគអវិជ្ជមានជាមួយ \"there is/are\"។" } }
      ],
      exercises: [
        {
          id: "tia-ex-1",
          question: { en: "Choose: \"___ (There is/There are) a pen on the desk.\"", km: "ជ្រើសរើស៖ \"___ (There is/There are) a pen on the desk.\"" },
          type: 'multiple-choice',
          options: [
            { en: "There is", km: "There is" },
            { en: "There are", km: "There are" },
            { en: "Is there", km: "Is there" },
            { en: "Are there", km: "Are there" }
          ],
          correctAnswer: "There is",
          explanation: { en: "\"Pen\" is singular, so use \"there is\".", km: "\"Pen\" ជាឯកវចនៈ ដូច្នេះប្រើ \"there is\"។" },
        },
        {
          id: "tia-ex-2",
          question: { en: "Choose: \"___ (There is/There are) two cats in the garden.\"", km: "ជ្រើសរើស៖ \"___ (There is/There are) two cats in the garden.\"" },
          type: 'multiple-choice',
          options: [
            { en: "There is", km: "There is" },
            { en: "There are", km: "There are" },
            { en: "Is there", km: "Is there" },
            { en: "Are there", km: "Are there" }
          ],
          correctAnswer: "There are",
          explanation: { en: "\"Two cats\" is plural, so use \"there are\".", km: "\"Two cats\" ជាពហុវចនៈ ដូច្នេះប្រើ \"there are\"។" },
        },
        {
          id: "tia-ex-3",
          question: { en: "Complete: \"___ (Is/Are) there any milk?\"", km: "បំពេញ៖ \"___ (Is/Are) there any milk?\"" },
          type: 'multiple-choice',
          options: [
            { en: "Is", km: "Is" },
            { en: "Are", km: "Are" },
            { en: "Do", km: "Do" },
            { en: "Does", km: "Does" }
          ],
          correctAnswer: "Is",
          explanation: { en: "\"Milk\" is uncountable, so use \"Is there\".", km: "\"Milk\" រាប់មិនបាន ដូច្នេះប្រើ \"Is there\"។" },
        },
        {
          id: "tia-ex-4",
          question: { en: "Choose the correct negative: \"There ___ (is not/are not) any chairs.\"", km: "ជ្រើសរើសប្រយោគអវិជ្ជមានត្រឹមត្រូវ៖ \"There ___ (is not/are not) any chairs.\"" },
          type: 'multiple-choice',
          options: [
            { en: "is not", km: "is not" },
            { en: "are not", km: "are not" },
            { en: "do not", km: "do not" },
            { en: "does not", km: "does not" }
          ],
          correctAnswer: "are not",
          explanation: { en: "\"Chairs\" is plural, so use \"there are not\".", km: "\"Chairs\" ជាពហុវចនៈ ដូច្នេះប្រើ \"there are not\"។" },
        },
        {
          id: "tia-ex-5",
          question: { en: "Choose the correct sentence:", km: "ជ្រើសរើសប្រយោគត្រឹមត្រូវ៖" },
          type: 'multiple-choice',
          options: [
            { en: "There is a book on table.", km: "There is a book on table." },
            { en: "There is a book on the table.", km: "There is a book on the table." },
            { en: "There are a book on the table.", km: "There are a book on the table." },
            { en: "There is book on the table.", km: "There is book on the table." }
          ],
          correctAnswer: "There is a book on the table.",
          explanation: { en: "Singular noun \"book\" needs \"there is\" + \"a\" + \"the table\".", km: "នាមឯកវចនៈ \"book\" ត្រូវការ \"there is\" + \"a\" + \"the table\"។" },
        }
      ],
      homework: [
        { id: "tia-hw-1", instruction: { en: "Look around your room and write 5 sentences with \"There is\" and 5 with \"There are\".", km: "មើលជុំវិញបន្ទប់របស់អ្នក ហើយសរសេរប្រយោគ ៥ ជាមួយ \"There is\" និង ៥ ជាមួយ \"There are\"។" } },
        { id: "tia-hw-2", instruction: { en: "Describe your kitchen using \"There is\" and \"There are\".", km: "ពិពណ៌នាអំពីផ្ទះបាយរបស់អ្នកដោយប្រើ \"There is\" និង \"There are\"។" } }
      ],
      quiz: [
        {
          id: "tia-q-1",
          question: { en: "\"There ___ a restaurant near my house.\"", km: "\"There ___ a restaurant near my house.\"" },
          type: 'multiple-choice',
          options: [
            { en: "is", km: "is" },
            { en: "are", km: "are" },
            { en: "am", km: "am" },
            { en: "be", km: "be" }
          ],
          correctAnswer: "is",
          explanation: { en: "\"Restaurant\" is singular, so use \"there is\".", km: "\"Restaurant\" ជាឯកវចនៈ ដូច្នេះប្រើ \"there is\"។" },
        },
        {
          id: "tia-q-2",
          question: { en: "\"___ there any students in the library?\"", km: "\"___ there any students in the library?\"" },
          type: 'multiple-choice',
          options: [
            { en: "Is", km: "Is" },
            { en: "Are", km: "Are" },
            { en: "Do", km: "Do" },
            { en: "Does", km: "Does" }
          ],
          correctAnswer: "Are",
          explanation: { en: "\"Students\" is plural, so use \"are there\".", km: "\"Students\" ជាពហុវចនៈ ដូច្នេះប្រើ \"are there\"។" },
        },
        {
          id: "tia-q-3",
          question: { en: "\"There is not ___ water in the bottle.\"", km: "\"There is not ___ water in the bottle.\"" },
          type: 'multiple-choice',
          options: [
            { en: "some", km: "some" },
            { en: "any", km: "any" },
            { en: "a", km: "a" },
            { en: "many", km: "many" }
          ],
          correctAnswer: "any",
          explanation: { en: "Use \"any\" in negative sentences with \"there is\".", km: "ប្រើ \"any\" ក្នុងប្រយោគអវិជ្ជមានជាមួយ \"there is\"។" },
        },
        {
          id: "tia-q-4",
          question: { en: "\"There are many ___ (child/children) in the park.\"", km: "\"There are many ___ (child/children) in the park.\"" },
          type: 'multiple-choice',
          options: [
            { en: "child", km: "child" },
            { en: "children", km: "children" },
            { en: "childs", km: "childs" },
            { en: "childes", km: "childes" }
          ],
          correctAnswer: "children",
          explanation: { en: "\"Children\" is the plural of \"child\".", km: "\"Children\" ជាពហុវចនៈរបស់ \"child\"។" },
        }
      ],
      vocabularyIds: ["there-is", "there-are", "book", "table", "milk", "fridge", "chair", "room", "student", "class", "cat", "bed", "pen", "desk", "garden", "restaurant", "library", "park", "water", "bottle"],
    },
    {
      id: "much-many",
      title: { en: "Much / Many", km: "Much / Many" },
      level: "beginner",
      unitId: "unit-1",
      chapterId: "ch-6-quantifiers",
      order: 12,
      estimatedMinutes: 10,
      definition: { en: "Use \"many\" with countable plural nouns (many books). Use \"much\" with uncountable nouns (much water). Both ask about quantity. Use \"a lot of\" with both types in positive sentences.", km: "ប្រើ \"many\" ជាមួយនាមរាប់បានពហុវចនៈ (សៀវភៅច្រើន)។ ប្រើ \"much\" ជាមួយនាមរាប់មិនបាន (ទឹកច្រើន)។ ទាំងពីរសួរអំពីបរិមាណ។ ប្រើ \"a lot of\" ជាមួយទាំងពីរក្នុងប្រយោគបញ្ជាក់។" },
            forms: {
        affirmative:         {
          structure: "Subject + have/verb + many + plural countable noun | much + uncountable noun",
          examples: [
          { en: "I have many books.", km: "ខ្ញុំមានសៀវភៅច្រើន។" },
          { en: "She has much homework.", km: "នាងមានកិច្ចការផ្ទះច្រើន។" },
          { en: "They have many friends.", km: "ពួកគេមានមិត្តភក្តិច្រើន។" },
          { en: "We have much work to do.", km: "ពួកយើងមានការងារច្រើនត្រូវធ្វើ។" },
          { en: "He drinks much water every day.", km: "គាត់ផឹកទឹកច្រើនរាល់ថ្ងៃ។" }
          ],
        },
        negative:         {
          structure: "Subject + do/does not + have + many/much + noun",
          examples: [
          { en: "I do not have many books.", km: "ខ្ញុំមិនមានសៀវភៅច្រើនទេ។" },
          { en: "She does not have much homework.", km: "នាងមិនមានកិច្ចការផ្ទះច្រើនទេ។" },
          { en: "They do not have many friends.", km: "ពួកគេមិនមានមិត្តភក្តិច្រើនទេ។" },
          { en: "We do not have much time.", km: "ពួកយើងមិនមានពេលច្រើនទេ។" },
          { en: "He does not drink much coffee.", km: "គាត់មិនផឹកកាហ្វេច្រើនទេ។" }
          ],
        },
        question:         {
          structure: "How many + plural countable noun? | How much + uncountable noun?",
          examples: [
          { en: "How many books do you have?", km: "តើអ្នកមានសៀវភៅប៉ុន្មាន?" },
          { en: "How much homework do you have?", km: "តើអ្នកមានកិច្ចការផ្ទះប៉ុន្មាន?" },
          { en: "How many friends does she have?", km: "តើនាងមានមិត្តភក្តិប៉ុន្មាននាក់?" },
          { en: "How much water do you drink?", km: "តើអ្នកផឹកទឹកប៉ុន្មាន?" },
          { en: "How many students are in your class?", km: "តើមានសិស្សប៉ុន្មាននាក់ក្នុងថ្នាក់របស់អ្នក?" }
          ],
        },
      },
      commonMistakes: [
        { mistake: "\"I have many water.\"", correction: "\"I have a lot of water.\" / \"I have much water.\"", reason: { en: "\"Water\" is uncountable. Use \"much\" or \"a lot of\", not \"many\".", km: "\"Water\" រាប់មិនបាន។ ប្រើ \"much\" ឬ \"a lot of\" មិនមែន \"many\"។" } },
        { mistake: "\"How much books do you have?\"", correction: "\"How many books do you have?\"", reason: { en: "\"Books\" is countable. Use \"how many\" with countable nouns.", km: "\"Books\" រាប់បាន។ ប្រើ \"how many\" ជាមួយនាមរាប់បាន។" } },
        { mistake: "\"I do not have much friends.\"", correction: "\"I do not have many friends.\"", reason: { en: "\"Friends\" is countable. Use \"many\" with plural countable nouns in negatives.", km: "\"Friends\" រាប់បាន។ ប្រើ \"many\" ជាមួយនាមរាប់បានពហុវចនៈក្នុងប្រយោគអវិជ្ជមាន។" } }
      ],
      exercises: [
        {
          id: "mm-ex-1",
          question: { en: "Choose: \"How ___ (many/much) apples do you want?\"", km: "ជ្រើសរើស៖ \"How ___ (many/much) apples do you want?\"" },
          type: 'multiple-choice',
          options: [
            { en: "many", km: "many" },
            { en: "much", km: "much" },
            { en: "a lot", km: "a lot" },
            { en: "some", km: "some" }
          ],
          correctAnswer: "many",
          explanation: { en: "\"Apples\" is countable, so use \"how many\".", km: "\"Apples\" រាប់បាន ដូច្នេះប្រើ \"how many\"។" },
        },
        {
          id: "mm-ex-2",
          question: { en: "Choose: \"How ___ (many/much) sugar do you need?\"", km: "ជ្រើសរើស៖ \"How ___ (many/much) sugar do you need?\"" },
          type: 'multiple-choice',
          options: [
            { en: "many", km: "many" },
            { en: "much", km: "much" },
            { en: "a lot", km: "a lot" },
            { en: "some", km: "some" }
          ],
          correctAnswer: "much",
          explanation: { en: "\"Sugar\" is uncountable, so use \"how much\".", km: "\"Sugar\" រាប់មិនបាន ដូច្នេះប្រើ \"how much\"។" },
        },
        {
          id: "mm-ex-3",
          question: { en: "Complete: \"I do not have ___ (many/much) money.\"", km: "បំពេញ៖ \"I do not have ___ (many/much) money.\"" },
          type: 'multiple-choice',
          options: [
            { en: "many", km: "many" },
            { en: "much", km: "much" },
            { en: "a lot", km: "a lot" },
            { en: "some", km: "some" }
          ],
          correctAnswer: "much",
          explanation: { en: "\"Money\" is uncountable, so use \"much\".", km: "\"Money\" រាប់មិនបាន ដូច្នេះប្រើ \"much\"។" },
        },
        {
          id: "mm-ex-4",
          question: { en: "Complete: \"She has ___ (many/much) books.\"", km: "បំពេញ៖ \"She has ___ (many/much) books.\"" },
          type: 'multiple-choice',
          options: [
            { en: "many", km: "many" },
            { en: "much", km: "much" },
            { en: "a lot of", km: "a lot of" },
            { en: "some", km: "some" }
          ],
          correctAnswer: "many",
          explanation: { en: "\"Books\" is countable, so use \"many\" in positive statements.", km: "\"Books\" រាប់បាន ដូច្នេះប្រើ \"many\" ក្នុងប្រយោគបញ្ជាក់។" },
        },
        {
          id: "mm-ex-5",
          question: { en: "Choose the correct sentence:", km: "ជ្រើសរើសប្រយោគត្រឹមត្រូវ៖" },
          type: 'multiple-choice',
          options: [
            { en: "How many rice do you eat?", km: "How many rice do you eat?" },
            { en: "How much rice do you eat?", km: "How much rice do you eat?" },
            { en: "How much rices do you eat?", km: "How much rices do you eat?" },
            { en: "How many rices do you eat?", km: "How many rices do you eat?" }
          ],
          correctAnswer: "How much rice do you eat?",
          explanation: { en: "\"Rice\" is uncountable, so use \"how much\".", km: "\"Rice\" រាប់មិនបាន ដូច្នេះប្រើ \"how much\"។" },
        }
      ],
      homework: [
        { id: "mm-hw-1", instruction: { en: "Write 5 questions with \"How many\" and 5 with \"How much\".", km: "សរសេរសំណួរ ៥ ជាមួយ \"How many\" និង ៥ ជាមួយ \"How much\"។" } },
        { id: "mm-hw-2", instruction: { en: "Count 10 things in your room and ask \"How many\" questions about them.", km: "រាប់វត្ថុ ១០ នៅក្នុងបន្ទប់របស់អ្នក ហើយសួរសំណួរ \"How many\" អំពីពួកវា។" } }
      ],
      quiz: [
        {
          id: "mm-q-1",
          question: { en: "\"How ___ people are in your family?\"", km: "\"How ___ people are in your family?\"" },
          type: 'multiple-choice',
          options: [
            { en: "many", km: "many" },
            { en: "much", km: "much" },
            { en: "a lot", km: "a lot" },
            { en: "some", km: "some" }
          ],
          correctAnswer: "many",
          explanation: { en: "\"People\" is countable, so use \"how many\".", km: "\"People\" រាប់បាន ដូច្នេះប្រើ \"how many\"។" },
        },
        {
          id: "mm-q-2",
          question: { en: "\"I do not have ___ time.\"", km: "\"I do not have ___ time.\"" },
          type: 'multiple-choice',
          options: [
            { en: "many", km: "many" },
            { en: "much", km: "much" },
            { en: "a lot", km: "a lot" },
            { en: "some", km: "some" }
          ],
          correctAnswer: "much",
          explanation: { en: "\"Time\" is uncountable, so use \"much\".", km: "\"Time\" រាប់មិនបាន ដូច្នេះប្រើ \"much\"។" },
        },
        {
          id: "mm-q-3",
          question: { en: "\"How ___ is this bag? It is $50.\"", km: "\"How ___ is this bag? It is $50.\"" },
          type: 'multiple-choice',
          options: [
            { en: "many", km: "many" },
            { en: "much", km: "much" },
            { en: "a lot", km: "a lot" },
            { en: "some", km: "some" }
          ],
          correctAnswer: "much",
          explanation: { en: "\"How much\" asks about price.", km: "\"How much\" សួរអំពីតម្លៃ។" },
        }
      ],
      vocabularyIds: ["many", "much", "book", "homework", "friend", "work", "water", "time", "coffee", "money", "sugar", "rice", "people", "family", "apple", "student"],
    }
      ],
    },
    {
      id: "ch-7-modals",
      title: { en: "Modals & Connectors", km: "ពាក្យជំនួយ និង ឈ្នាប់" },
      lessons: [
    {
      id: "can",
      title: { en: "Can (Ability & Permission)", km: "Can (សមត្ថភាព និង ការអនុញ្ញាត)" },
      level: "beginner",
      unitId: "unit-1",
      chapterId: "ch-7-modals",
      order: 13,
      estimatedMinutes: 10,
      definition: { en: "Use \"can\" to talk about ability (what you are able to do) and permission (what is allowed). \"Can\" is followed by the base verb. It does not change with he/she/it.", km: "ប្រើ \"can\" ដើម្បីនិយាយអំពីសមត្ថភាព (អ្វីដែលអ្នកអាចធ្វើបាន) និងការអនុញ្ញាត (អ្វីដែលត្រូវបានអនុញ្ញាត)។ \"Can\" ត្រូវបានបន្តដោយកិរិយាស័ព្ទដើម។ វាមិនផ្លាស់ប្តូរជាមួយ he/she/it ទេ។" },
            forms: {
        affirmative:         {
          structure: "Subject + can + base verb",
          examples: [
          { en: "I can swim.", km: "ខ្ញុំអាចហែលទឹកបាន។" },
          { en: "She can speak English.", km: "នាងអាចនិយាយភាសាអង់គ្លេសបាន។" },
          { en: "He can play guitar.", km: "គាត់អាចលេងហ្គីតាបាន។" },
          { en: "They can come to the party.", km: "ពួកគេអាចមកជប់លៀងបាន។" },
          { en: "You can sit here.", km: "អ្នកអាចអង្គុយនៅទីនេះបាន។" }
          ],
        },
        negative:         {
          structure: "Subject + cannot (can't) + base verb",
          examples: [
          { en: "I cannot swim.", km: "ខ្ញុំមិនអាចហែលទឹកបានទេ។" },
          { en: "She cannot speak French.", km: "នាងមិនអាចនិយាយភាសាបារាំងបានទេ។" },
          { en: "He cannot play piano.", km: "គាត់មិនអាចលេងព្យាណូបានទេ។" },
          { en: "They cannot come to the party.", km: "ពួកគេមិនអាចមកជប់លៀងបានទេ។" },
          { en: "You cannot park here.", km: "អ្នកមិនអាចចតនៅទីនេះបានទេ។" }
          ],
        },
        question:         {
          structure: "Can + subject + base verb?",
          examples: [
          { en: "Can you swim? Yes, I can.", km: "តើអ្នកអាចហែលទឹកបានទេ? បាទ ខ្ញុំអាច។" },
          { en: "Can she speak English? No, she cannot.", km: "តើនាងអាចនិយាយភាសាអង់គ្លេសបានទេ? ទេ នាងមិនអាចទេ។" },
          { en: "Can he play guitar? Yes, he can.", km: "តើគាត់អាចលេងហ្គីតាបានទេ? បាទ គាត់អាច។" },
          { en: "Can they come? Yes, they can.", km: "តើពួកគេអាចមកបានទេ? បាទ ពួកគេអាច។" },
          { en: "Can I sit here? Yes, you can.", km: "តើខ្ញុំអាចអង្គុយនៅទីនេះបានទេ? បាទ អ្នកអាច។" }
          ],
        },
      },
      commonMistakes: [
        { mistake: "\"He can swims.\"", correction: "\"He can swim.\"", reason: { en: "After \"can\", use the base verb without \"s\".", km: "បន្ទាប់ពី \"can\" ប្រើកិរិយាស័ព្ទដើមដោយគ្មាន \"s\"។" } },
        { mistake: "\"She cans swim.\"", correction: "\"She can swim.\"", reason: { en: "\"Can\" does not change with he/she/it. Do not add \"s\" to \"can\".", km: "\"Can\" មិនផ្លាស់ប្តូរជាមួយ he/she/it ទេ។ កុំបន្ថែម \"s\" ទៅ \"can\"។" } },
        { mistake: "\"I no can swim.\"", correction: "\"I cannot swim.\" / \"I can't swim.\"", reason: { en: "The negative of \"can\" is \"cannot\" or \"can't\", not \"no can\".", km: "ទម្រង់អវិជ្ជមានរបស់ \"can\" គឺ \"cannot\" ឬ \"can't\" មិនមែន \"no can\"។" } }
      ],
      exercises: [
        {
          id: "can-ex-1",
          question: { en: "Complete: \"She ___ (can/cans) dance.\"", km: "បំពេញ៖ \"She ___ (can/cans) dance.\"" },
          type: 'multiple-choice',
          options: [
            { en: "can", km: "can" },
            { en: "cans", km: "cans" },
            { en: "can to", km: "can to" },
            { en: "canning", km: "canning" }
          ],
          correctAnswer: "can",
          explanation: { en: "\"Can\" does not change. Use \"can\" with all subjects.", km: "\"Can\" មិនផ្លាស់ប្តូរទេ។ ប្រើ \"can\" ជាមួយប្រធានទាំងអស់។" },
        },
        {
          id: "can-ex-2",
          question: { en: "Choose the negative: \"He ___ (cannot/cans not) drive.\"", km: "ជ្រើសរើសទម្រង់អវិជ្ជមាន៖ \"He ___ (cannot/cans not) drive.\"" },
          type: 'multiple-choice',
          options: [
            { en: "cannot", km: "cannot" },
            { en: "cans not", km: "cans not" },
            { en: "can not to", km: "can not to" },
            { en: "no can", km: "no can" }
          ],
          correctAnswer: "cannot",
          explanation: { en: "The negative is \"cannot\" (one word) or \"can't\".", km: "ទម្រង់អវិជ្ជមានគឺ \"cannot\" (មួយពាក្យ) ឬ \"can't\"។" },
        },
        {
          id: "can-ex-3",
          question: { en: "Complete: \"___ (Can/Does) you play chess?\"", km: "បំពេញ៖ \"___ (Can/Does) you play chess?\"" },
          type: 'multiple-choice',
          options: [
            { en: "Can", km: "Can" },
            { en: "Does", km: "Does" },
            { en: "Do", km: "Do" },
            { en: "Is", km: "Is" }
          ],
          correctAnswer: "Can",
          explanation: { en: "Use \"can\" to ask about ability or permission.", km: "ប្រើ \"can\" ដើម្បីសួរអំពីសមត្ថភាព ឬការអនុញ្ញាត។" },
        },
        {
          id: "can-ex-4",
          question: { en: "Fill in: \"She ___ (can/can't) fly because she is not a bird.\"", km: "បំពេញ៖ \"She ___ (can/can't) fly because she is not a bird.\"" },
          type: 'multiple-choice',
          options: [
            { en: "can", km: "can" },
            { en: "can't", km: "can't" },
            { en: "cannot to", km: "cannot to" },
            { en: "no can", km: "no can" }
          ],
          correctAnswer: "can't",
          explanation: { en: "Use \"can't\" to show inability.", km: "ប្រើ \"can't\" ដើម្បីបង្ហាញភាពមិនអាច។" },
        },
        {
          id: "can-ex-5",
          question: { en: "Choose the correct sentence:", km: "ជ្រើសរើសប្រយោគត្រឹមត្រូវ៖" },
          type: 'multiple-choice',
          options: [
            { en: "I can to swim.", km: "I can to swim." },
            { en: "I can swim.", km: "I can swim." },
            { en: "I can swimming.", km: "I can swimming." },
            { en: "I can swam.", km: "I can swam." }
          ],
          correctAnswer: "I can swim.",
          explanation: { en: "After \"can\", use the base verb without \"to\".", km: "បន្ទាប់ពី \"can\" ប្រើកិរិយាស័ព្ទដើមដោយគ្មាន \"to\"។" },
        }
      ],
      homework: [
        { id: "can-hw-1", instruction: { en: "Write 5 things you can do and 5 things you cannot do.", km: "សរសេរអ្វី ៥ ដែលអ្នកអាចធ្វើបាន និង ៥ ដែលអ្នកមិនអាចធ្វើបាន។" } },
        { id: "can-hw-2", instruction: { en: "Ask 3 friends \"Can you...\" questions and write their answers.", km: "សួរមិត្តភក្តិ ៣ នាក់នូវសំណួរ \"Can you...\" ហើយសរសេរចម្លើយរបស់ពួកគេ។" } }
      ],
      quiz: [
        {
          id: "can-q-1",
          question: { en: "\"___ you help me, please?\"", km: "\"___ you help me, please?\"" },
          type: 'multiple-choice',
          options: [
            { en: "Can", km: "Can" },
            { en: "Do", km: "Do" },
            { en: "Are", km: "Are" },
            { en: "Have", km: "Have" }
          ],
          correctAnswer: "Can",
          explanation: { en: "Use \"can\" to ask for help politely.", km: "ប្រើ \"can\" ដើម្បីសុំជំនួយដោយគួរសម។" },
        },
        {
          id: "can-q-2",
          question: { en: "\"She ___ (can/can't) speak three languages.\" (She is talented.)", km: "\"She ___ (can/can't) speak three languages.\"" },
          type: 'multiple-choice',
          options: [
            { en: "can", km: "can" },
            { en: "can't", km: "can't" },
            { en: "cannot to", km: "cannot to" },
            { en: "no can", km: "no can" }
          ],
          correctAnswer: "can",
          explanation: { en: "\"Can\" shows ability. She has the ability to speak three languages.", km: "\"Can\" បង្ហាញសមត្ថភាព។ នាងមានសមត្ថភាពនិយាយបីភាសា។" },
        },
        {
          id: "can-q-3",
          question: { en: "\"I ___ (can/can't) come to the party. I am busy.\"", km: "\"I ___ (can/can't) come to the party. I am busy.\"" },
          type: 'multiple-choice',
          options: [
            { en: "can", km: "can" },
            { en: "can't", km: "can't" },
            { en: "cannot to", km: "cannot to" },
            { en: "no can", km: "no can" }
          ],
          correctAnswer: "can't",
          explanation: { en: "Use \"can't\" because being busy means you are not able to come.", km: "ប្រើ \"can't\" ព្រោះការរវល់មានន័យថាអ្នកមិនអាចមកបានទេ។" },
        }
      ],
      vocabularyIds: ["can", "cannot", "ability", "permission", "swim", "speak", "play", "guitar", "piano", "dance", "drive", "fly", "swim", "chess", "help", "come", "sit", "park"],
    },
    {
      id: "conjunctions",
      title: { en: "Conjunctions", km: "ឈ្នាប់" },
      level: "beginner",
      unitId: "unit-1",
      chapterId: "ch-7-modals",
      order: 14,
      estimatedMinutes: 10,
      definition: { en: "Conjunctions connect words, phrases, or sentences. Common conjunctions: \"and\" (add information), \"but\" (show contrast), \"or\" (show a choice), \"because\" (show a reason), \"so\" (show a result).", km: "ឈ្នាប់ភ្ជាប់ពាក្យ ឃ្លា ឬប្រយោគ។ ឈ្នាប់ទូទៅ៖ \"and\" (បន្ថែមព័ត៌មាន), \"but\" (បង្ហាញភាពផ្ទុយគ្នា), \"or\" (បង្ហាញជម្រើស), \"because\" (បង្ហាញមូលហេតុ), \"so\" (បង្ហាញលទ្ធផល)។" },
            forms: {
        affirmative:         {
          structure: "Clause + conjunction + clause",
          examples: [
          { en: "I like cats and dogs.", km: "ខ្ញុំចូលចិត្តឆ្មា និង ឆ្កែ។" },
          { en: "She is tired but happy.", km: "នាងនឿយហត់ ប៉ុន្តែ រីករាយ។" },
          { en: "Do you want tea or coffee?", km: "តើអ្នកចង់បានតែ ឬ កាហ្វេ?" },
          { en: "He is staying home because it is raining.", km: "គាត់នៅផ្ទះ ព្រោះ ភ្លៀង។" },
          { en: "I was hungry so I ate rice.", km: "ខ្ញុំឃ្លាន ដូច្នេះ ខ្ញុំញ៉ាំបាយ។" }
          ],
        },
        negative:         {
          structure: "Subject + do/does not + verb + conjunction + clause",
          examples: [
          { en: "I do not like cats or dogs.", km: "ខ្ញុំមិនចូលចិត្តឆ្មា ឬ ឆ្កែទេ។" },
          { en: "She is not tired but she is bored.", km: "នាងមិននឿយហត់ទេ ប៉ុន្តែ នាងធុញទ្រាន់។" },
          { en: "He does not want tea or coffee.", km: "គាត់មិនចង់បានតែ ឬ កាហ្វេទេ។" },
          { en: "I am not going because I am sick.", km: "ខ្ញុំមិនទៅទេ ព្រោះ ខ្ញុំឈឺ។" },
          { en: "She did not study so she failed.", km: "នាងមិនបានរៀនទេ ដូច្នេះ នាងធ្លាក់។" }
          ],
        },
        question:         {
          structure: "Question word + clause + conjunction + clause?",
          examples: [
          { en: "Do you like cats or dogs?", km: "តើអ្នកចូលចិត្តឆ្មា ឬ ឆ្កែ?" },
          { en: "Is she tired or happy?", km: "តើនាងនឿយហត់ ឬ រីករាយ?" },
          { en: "Do you want tea or coffee?", km: "តើអ្នកចង់បានតែ ឬ កាហ្វេ?" },
          { en: "Why is he staying home? Because it is raining.", km: "តើហេតុអ្វីគាត់នៅផ្ទះ? ព្រោះភ្លៀង។" },
          { en: "Were you hungry so you ate?", km: "តើអ្នកឃ្លាន ដូច្នេះអ្នកញ៉ាំមែនទេ?" }
          ],
        },
      },
      commonMistakes: [
        { mistake: "\"I like cats and I like dogs.\" (redundant)", correction: "\"I like cats and dogs.\"", reason: { en: "You can join two nouns with \"and\" without repeating the verb.", km: "អ្នកអាចភ្ជាប់នាមពីរជាមួយ \"and\" ដោយមិនចាំបាច់និយាយកិរិយាស័ព្ទម្តងទៀត។" } },
        { mistake: "\"I like cats but not dogs.\"", correction: "\"I like cats but I do not like dogs.\"", reason: { en: "\"But\" usually connects two complete clauses.", km: "\"But\" ជាធម្មតាភ្ជាប់ប្រយោគពេញលេញពីរ។" } },
        { mistake: "\"Because I was tired, so I slept.\"", correction: "\"Because I was tired, I slept.\" or \"I was tired, so I slept.\"", reason: { en: "Use \"because\" or \"so\", not both in the same sentence.", km: "ប្រើ \"because\" ឬ \"so\" មិនត្រូវប្រើទាំងពីរក្នុងប្រយោគតែមួយទេ។" } }
      ],
      exercises: [
        {
          id: "conj-ex-1",
          question: { en: "Choose: \"I like apples ___ (and/but) oranges.\"", km: "ជ្រើសរើស៖ \"I like apples ___ (and/but) oranges.\"" },
          type: 'multiple-choice',
          options: [
            { en: "and", km: "and" },
            { en: "but", km: "but" },
            { en: "or", km: "or" },
            { en: "because", km: "because" }
          ],
          correctAnswer: "and",
          explanation: { en: "\"And\" adds similar information.", km: "\"And\" បន្ថែមព័ត៌មានដូចគ្នា។" },
        },
        {
          id: "conj-ex-2",
          question: { en: "Choose: \"She is small ___ (and/but) strong.\"", km: "ជ្រើសរើស៖ \"She is small ___ (and/but) strong.\"" },
          type: 'multiple-choice',
          options: [
            { en: "and", km: "and" },
            { en: "but", km: "but" },
            { en: "or", km: "or" },
            { en: "so", km: "so" }
          ],
          correctAnswer: "but",
          explanation: { en: "\"But\" shows contrast between small and strong.", km: "\"But\" បង្ហាញភាពផ្ទុយគ្នារវាងតូច និងខ្លាំង។" },
        },
        {
          id: "conj-ex-3",
          question: { en: "Choose: \"Is it hot ___ (or/and) cold?\"", km: "ជ្រើសរើស៖ \"Is it hot ___ (or/and) cold?\"" },
          type: 'multiple-choice',
          options: [
            { en: "and", km: "and" },
            { en: "but", km: "but" },
            { en: "or", km: "or" },
            { en: "so", km: "so" }
          ],
          correctAnswer: "or",
          explanation: { en: "\"Or\" presents a choice between hot and cold.", km: "\"Or\" បង្ហាញជម្រើសរវាងក្តៅ និងត្រជាក់។" },
        },
        {
          id: "conj-ex-4",
          question: { en: "Complete: \"He is sad ___ (because/so) he lost his phone.\"", km: "បំពេញ៖ \"He is sad ___ (because/so) he lost his phone.\"" },
          type: 'multiple-choice',
          options: [
            { en: "because", km: "because" },
            { en: "so", km: "so" },
            { en: "and", km: "and" },
            { en: "but", km: "but" }
          ],
          correctAnswer: "because",
          explanation: { en: "\"Because\" introduces the reason for his sadness.", km: "\"Because\" បង្ហាញពីមូលហេតុនៃភាពក្រៀមក្រំរបស់គាត់។" },
        },
        {
          id: "conj-ex-5",
          question: { en: "Choose the correct sentence:", km: "ជ្រើសរើសប្រយោគត្រឹមត្រូវ៖" },
          type: 'multiple-choice',
          options: [
            { en: "Because I was tired so I slept.", km: "Because I was tired so I slept." },
            { en: "I was tired so I slept.", km: "I was tired so I slept." },
            { en: "Because so I slept.", km: "Because so I slept." },
            { en: "Tired so I slept.", km: "Tired so I slept." }
          ],
          correctAnswer: "I was tired so I slept.",
          explanation: { en: "Use \"so\" to show result. Do not use \"because\" and \"so\" together.", km: "ប្រើ \"so\" ដើម្បីបង្ហាញលទ្ធផល។ កុំប្រើ \"because\" និង \"so\" ជាមួយគ្នា។" },
        }
      ],
      homework: [
        { id: "conj-hw-1", instruction: { en: "Write 2 sentences with \"and\", 2 with \"but\", 2 with \"or\", 2 with \"because\", and 2 with \"so\".", km: "សរសេរប្រយោគ ២ ជាមួយ \"and\", ២ ជាមួយ \"but\", ២ ជាមួយ \"or\", ២ ជាមួយ \"because\", និង ២ ជាមួយ \"so\"។" } },
        { id: "conj-hw-2", instruction: { en: "Join 5 pairs of short sentences using conjunctions.", km: "ភ្ជាប់ប្រយោគខ្លី ៥ គូដោយប្រើឈ្នាប់។" } }
      ],
      quiz: [
        {
          id: "conj-q-1",
          question: { en: "\"I want to go ___ (but/and) I am too tired.\"", km: "\"I want to go ___ (but/and) I am too tired.\"" },
          type: 'multiple-choice',
          options: [
            { en: "and", km: "and" },
            { en: "but", km: "but" },
            { en: "or", km: "or" },
            { en: "so", km: "so" }
          ],
          correctAnswer: "but",
          explanation: { en: "\"But\" shows contrast between wanting to go and being tired.", km: "\"But\" បង្ហាញភាពផ្ទុយគ្នារវាងការចង់ទៅ និងការនឿយហត់។" },
        },
        {
          id: "conj-q-2",
          question: { en: "\"Do you want milk ___ (or/and) juice?\"", km: "\"Do you want milk ___ (or/and) juice?\"" },
          type: 'multiple-choice',
          options: [
            { en: "and", km: "and" },
            { en: "but", km: "but" },
            { en: "or", km: "or" },
            { en: "so", km: "so" }
          ],
          correctAnswer: "or",
          explanation: { en: "\"Or\" offers a choice between milk and juice.", km: "\"Or\" ផ្តល់ជម្រើសរវាងទឹកដោះគោ និងទឹកផ្លែឈើ។" },
        },
        {
          id: "conj-q-3",
          question: { en: "\"He studied hard ___ (because/so) he passed the test.\"", km: "\"He studied hard ___ (because/so) he passed the test.\"" },
          type: 'multiple-choice',
          options: [
            { en: "because", km: "because" },
            { en: "so", km: "so" },
            { en: "and", km: "and" },
            { en: "but", km: "but" }
          ],
          correctAnswer: "so",
          explanation: { en: "\"So\" shows the result: passing was the result of studying hard.", km: "\"So\" បង្ហាញលទ្ធផល៖ ការប្រឡងជាប់គឺជាលទ្ធផលនៃការរៀនខ្លាំង។" },
        }
      ],
      vocabularyIds: ["and", "but", "or", "because", "so", "cat", "dog", "tea", "coffee", "milk", "juice", "hot", "cold", "tired", "happy", "sad", "hungry", "rain", "study", "pass"],
    },
    {
      id: "preposition",
      title: { en: "Prepositions", km: "ធ្នាក់" },
      level: "beginner",
      unitId: "unit-1",
      chapterId: "ch-7-modals",
      order: 15,
      estimatedMinutes: 15,
      definition: { en: "Prepositions show relationships between words. Common prepositions of place: in, on, under, next to, between, behind, in front of. Prepositions of time: at, on, in.", km: "ធ្នាក់បង្ហាញទំនាក់ទំនងរវាងពាក្យ។ ធ្នាក់នៃទីកន្លែងទូទៅ៖ in, on, under, next to, between, behind, in front of។ ធ្នាក់នៃពេលវេលា៖ at, on, in។" },
            forms: {
        affirmative:         {
          structure: "Subject + be/verb + preposition + noun",
          examples: [
          { en: "The book is on the table.", km: "សៀវភៅនៅលើតុ។" },
          { en: "The cat is under the bed.", km: "ឆ្មានៅក្រោមគ្រែ។" },
          { en: "She sits next to me.", km: "នាងអង្គុយក្បែរខ្ញុំ។" },
          { en: "I wake up at 6 AM.", km: "ខ្ញុំភ្ញាក់ពីគេងនៅម៉ោង ៦ ព្រឹក។" },
          { en: "He was born in May.", km: "គាត់កើតនៅខែឧសភា។" }
          ],
        },
        negative:         {
          structure: "Subject + be/verb + not + preposition + noun",
          examples: [
          { en: "The book is not on the table.", km: "សៀវភៅមិននៅលើតុទេ។" },
          { en: "The cat is not under the bed.", km: "ឆ្មាមិននៅក្រោមគ្រែទេ។" },
          { en: "She does not sit next to me.", km: "នាងមិនអង្គុយក្បែរខ្ញុំទេ។" },
          { en: "I do not wake up at 5 AM.", km: "ខ្ញុំមិនភ្ញាក់ពីគេងនៅម៉ោង ៥ ព្រឹកទេ។" },
          { en: "He was not born in June.", km: "គាត់មិនបានកើតនៅខែមិថុនាទេ។" }
          ],
        },
        question:         {
          structure: "Be/Do/Does + subject + preposition + noun?",
          examples: [
          { en: "Is the book on the table?", km: "តើសៀវភៅនៅលើតុទេ?" },
          { en: "Is the cat under the bed?", km: "តើឆ្មានៅក្រោមគ្រែទេ?" },
          { en: "Does she sit next to you?", km: "តើនាងអង្គុយក្បែរអ្នកទេ?" },
          { en: "Do you wake up at 6 AM?", km: "តើអ្នកភ្ញាក់ពីគេងនៅម៉ោង ៦ ព្រឹកទេ?" },
          { en: "Was he born in May?", km: "តើគាត់កើតនៅខែឧសភាទេ?" }
          ],
        },
      },
      commonMistakes: [
        { mistake: "\"The book is the table on.\"", correction: "\"The book is on the table.\"", reason: { en: "In English, the preposition comes before the noun.", km: "ក្នុងភាសាអង់គ្លេស ធ្នាក់មកមុខនាម។" } },
        { mistake: "\"I will meet you in Monday.\"", correction: "\"I will meet you on Monday.\"", reason: { en: "Use \"on\" with days of the week.", km: "ប្រើ \"on\" ជាមួយថ្ងៃនៃសប្តាហ៍។" } },
        { mistake: "\"I go to school on the morning.\"", correction: "\"I go to school in the morning.\"", reason: { en: "Use \"in\" with parts of the day (morning, afternoon, evening).", km: "ប្រើ \"in\" ជាមួយផ្នែកនៃថ្ងៃ (ព្រឹក រសៀល ល្ងាច)។" } }
      ],
      exercises: [
        {
          id: "prep-ex-1",
          question: { en: "Choose: \"The pen is ___ (in/on) the desk.\"", km: "ជ្រើសរើស៖ \"The pen is ___ (in/on) the desk.\"" },
          type: 'multiple-choice',
          options: [
            { en: "in", km: "in" },
            { en: "on", km: "on" },
            { en: "under", km: "under" },
            { en: "at", km: "at" }
          ],
          correctAnswer: "on",
          explanation: { en: "\"On\" is used when something is on top of a surface.", km: "\"On\" ត្រូវបានប្រើនៅពេលអ្វីមួយនៅលើផ្ទៃ។" },
        },
        {
          id: "prep-ex-2",
          question: { en: "Choose: \"The cat is ___ (in/under) the box.\" (inside)", km: "ជ្រើសរើស៖ \"The cat is ___ (in/under) the box.\"" },
          type: 'multiple-choice',
          options: [
            { en: "in", km: "in" },
            { en: "on", km: "on" },
            { en: "under", km: "under" },
            { en: "next to", km: "next to" }
          ],
          correctAnswer: "in",
          explanation: { en: "\"In\" means inside something.", km: "\"In\" មានន័យថានៅក្នុងអ្វីមួយ។" },
        },
        {
          id: "prep-ex-3",
          question: { en: "Complete: \"I have a class ___ (in/at) 2 PM.\"", km: "បំពេញ៖ \"I have a class ___ (in/at) 2 PM.\"" },
          type: 'multiple-choice',
          options: [
            { en: "in", km: "in" },
            { en: "on", km: "on" },
            { en: "at", km: "at" },
            { en: "for", km: "for" }
          ],
          correctAnswer: "at",
          explanation: { en: "Use \"at\" with specific times.", km: "ប្រើ \"at\" ជាមួយពេលវេលាជាក់លាក់។" },
        },
        {
          id: "prep-ex-4",
          question: { en: "Complete: \"My birthday is ___ (in/on) July.\"", km: "បំពេញ៖ \"My birthday is ___ (in/on) July.\"" },
          type: 'multiple-choice',
          options: [
            { en: "in", km: "in" },
            { en: "on", km: "on" },
            { en: "at", km: "at" },
            { en: "by", km: "by" }
          ],
          correctAnswer: "in",
          explanation: { en: "Use \"in\" with months and years.", km: "ប្រើ \"in\" ជាមួយខែ និងឆ្នាំ។" },
        },
        {
          id: "prep-ex-5",
          question: { en: "Choose the correct sentence:", km: "ជ្រើសរើសប្រយោគត្រឹមត្រូវ៖" },
          type: 'multiple-choice',
          options: [
            { en: "The cat is the bed under.", km: "The cat is the bed under." },
            { en: "The cat under is the bed.", km: "The cat under is the bed." },
            { en: "The cat is under the bed.", km: "The cat is under the bed." },
            { en: "Under the bed the cat is.", km: "Under the bed the cat is." }
          ],
          correctAnswer: "The cat is under the bed.",
          explanation: { en: "Correct word order: Subject + verb + preposition + noun.", km: "លំដាប់ពាក្យត្រឹមត្រូវ៖ ប្រធាន + កិរិយាស័ព្ទ + ធ្នាក់ + នាម។" },
        }
      ],
      homework: [
        { id: "prep-hw-1", instruction: { en: "Describe where 10 objects are in your room using prepositions of place.", km: "ពិពណ៌នាថាវត្ថុ ១០ នៅឯណាក្នុងបន្ទប់របស់អ្នកដោយប្រើធ្នាក់នៃទីកន្លែង។" } },
        { id: "prep-hw-2", instruction: { en: "Write 5 sentences about your daily schedule using prepositions of time.", km: "សរសេរប្រយោគ ៥ អំពីកាលវិភាគប្រចាំថ្ងៃរបស់អ្នកដោយប្រើធ្នាក់នៃពេលវេលា។" } },
        { id: "prep-hw-3", instruction: { en: "Write 3 sentences using \"in\", 3 using \"on\", and 3 using \"at\" for time.", km: "សរសេរប្រយោគ ៣ ដោយប្រើ \"in\", ៣ ដោយប្រើ \"on\", និង ៣ ដោយប្រើ \"at\" សម្រាប់ពេលវេលា។" } }
      ],
      quiz: [
        {
          id: "prep-q-1",
          question: { en: "\"She is sitting ___ (on/in) the chair.\"", km: "\"She is sitting ___ (on/in) the chair.\"" },
          type: 'multiple-choice',
          options: [
            { en: "in", km: "in" },
            { en: "on", km: "on" },
            { en: "at", km: "at" },
            { en: "under", km: "under" }
          ],
          correctAnswer: "on",
          explanation: { en: "\"On\" is used for sitting on a chair.", km: "\"On\" ត្រូវបានប្រើសម្រាប់អង្គុយលើកៅអី។" },
        },
        {
          id: "prep-q-2",
          question: { en: "\"The restaurant is ___ (in/on) the corner of the street.\"", km: "\"The restaurant is ___ (in/on) the corner of the street.\"" },
          type: 'multiple-choice',
          options: [
            { en: "in", km: "in" },
            { en: "on", km: "on" },
            { en: "at", km: "at" },
            { en: "by", km: "by" }
          ],
          correctAnswer: "on",
          explanation: { en: "\"On the corner\" is the standard phrase for street corners.", km: "\"On the corner\" គឺជាឃ្លាស្តង់ដារសម្រាប់ជ្រុងផ្លូវ។" },
        },
        {
          id: "prep-q-3",
          question: { en: "\"I usually wake up ___ (in/at) 7:00.\"", km: "\"I usually wake up ___ (in/at) 7:00.\"" },
          type: 'multiple-choice',
          options: [
            { en: "in", km: "in" },
            { en: "on", km: "on" },
            { en: "at", km: "at" },
            { en: "for", km: "for" }
          ],
          correctAnswer: "at",
          explanation: { en: "Use \"at\" with specific clock times.", km: "ប្រើ \"at\" ជាមួយពេលវេលានាឡិកាជាក់លាក់។" },
        },
        {
          id: "prep-q-4",
          question: { en: "\"He was born ___ (in/on) January 1st.\"", km: "\"He was born ___ (in/on) January 1st.\"" },
          type: 'multiple-choice',
          options: [
            { en: "in", km: "in" },
            { en: "on", km: "on" },
            { en: "at", km: "at" },
            { en: "by", km: "by" }
          ],
          correctAnswer: "on",
          explanation: { en: "Use \"on\" with specific dates.", km: "ប្រើ \"on\" ជាមួយកាលបរិច្ឆេទជាក់លាក់។" },
        }
      ],
      vocabularyIds: ["in", "on", "at", "under", "next-to", "between", "behind", "in-front-of", "table", "bed", "book", "cat", "pen", "desk", "box", "chair", "morning", "afternoon", "evening", "monday", "july", "year"],
    }
      ],
    },
    {
      id: "ch-8-adverbs",
      title: { en: "Adverbs", km: "គុណកិរិយា" },
      lessons: [
    {
      id: "adverbs-frequency",
      title: { en: "Adverbs of Frequency", km: "គុណកិរិយានៃភាពញឹកញាប់" },
      level: "beginner",
      unitId: "unit-1",
      chapterId: "ch-8-adverbs",
      order: 16,
      estimatedMinutes: 15,
      definition: { en: "Adverbs of frequency tell how often something happens: always (100%), usually (90%), often (70%), sometimes (50%), rarely (10%), never (0%). They come before the main verb but after the verb \"be\".", km: "គុណកិរិយានៃភាពញឹកញាប់ប្រាប់ថាអ្វីមួយកើតឡើងញឹកញាប់ប៉ុណ្ណា៖ always (១០០%), usually (៩០%), often (៧០%), sometimes (៥០%), rarely (១០%), never (០%)។ ពួកវាមកមុនកិរិយាស័ព្ទចម្បង ប៉ុន្តែបន្ទាប់ពីកិរិយាស័ព្ទ \"be\"។" },
            forms: {
        affirmative:         {
          structure: "Subject + adverb of frequency + main verb | Subject + be + adverb of frequency",
          examples: [
          { en: "I always wake up at 6 AM.", km: "ខ្ញុំតែងតែភ្ញាក់ពីគេងនៅម៉ោង ៦ ព្រឹក។" },
          { en: "She usually drinks coffee.", km: "នាងជាធម្មតាផឹកកាហ្វេ។" },
          { en: "They often play football.", km: "ពួកគេច្រើនតែលេងបាល់ទាត់។" },
          { en: "He is sometimes late.", km: "គាត់ពេលខ្លះមកយឺត។" },
          { en: "I am never bored in class.", km: "ខ្ញុំមិនដែលធុញក្នុងថ្នាក់ទេ។" }
          ],
        },
        negative:         {
          structure: "Subject + do/does not + often/usually + verb | Subject + be + not + adverb",
          examples: [
          { en: "I do not always wake up at 6 AM.", km: "ខ្ញុំមិនតែងតែភ្ញាក់ពីគេងនៅម៉ោង ៦ ព្រឹកទេ។" },
          { en: "She does not usually drink tea.", km: "នាងមិនជាធម្មតាផឹកតែទេ។" },
          { en: "They do not often play tennis.", km: "ពួកគេមិនច្រើនតែលេងកីឡាវាយកូនបាល់ទេ។" },
          { en: "He is not often late.", km: "គាត់មិនច្រើនតែមកយឺតទេ។" },
          { en: "I am never tired in the morning.", km: "ខ្ញុំមិនដែលនឿយហត់នៅពេលព្រឹកទេ។" }
          ],
        },
        question:         {
          structure: "Do/Does + subject + adverb of frequency + verb?",
          examples: [
          { en: "Do you always wake up at 6 AM?", km: "តើអ្នកតែងតែភ្ញាក់ពីគេងនៅម៉ោង ៦ ព្រឹកទេ?" },
          { en: "Does she usually drink coffee?", km: "តើនាងជាធម្មតាផឹកកាហ្វេទេ?" },
          { en: "Do they often play football?", km: "តើពួកគេច្រើនតែលេងបាល់ទាត់ទេ?" },
          { en: "Is he sometimes late?", km: "តើគាត់ពេលខ្លះមកយឺតទេ?" },
          { en: "Are you never bored?", km: "តើអ្នកមិនដែលធុញទេ?" }
          ],
        },
      },
      commonMistakes: [
        { mistake: "\"I wake up always at 6 AM.\"", correction: "\"I always wake up at 6 AM.\"", reason: { en: "Adverbs of frequency come before the main verb.", km: "គុណកិរិយានៃភាពញឹកញាប់មកមុនកិរិយាស័ព្ទចម្បង។" } },
        { mistake: "\"She is usually drink coffee.\"", correction: "\"She usually drinks coffee.\"", reason: { en: "Do not use \"be\" with main verbs when using adverbs.", km: "កុំប្រើ \"be\" ជាមួយកិរិយាស័ព្ទចម្បងនៅពេលប្រើគុណកិរិយា។" } },
        { mistake: "\"I never am late.\"", correction: "\"I am never late.\"", reason: { en: "With the verb \"be\", the adverb comes after \"be\".", km: "ជាមួយកិរិយាស័ព្ទ \"be\" គុណកិរិយាមកបន្ទាប់ពី \"be\"។" } }
      ],
      exercises: [
        {
          id: "af-ex-1",
          question: { en: "Choose: \"I ___ (always/am always) happy.\"", km: "ជ្រើសរើស៖ \"I ___ (always/am always) happy.\"" },
          type: 'multiple-choice',
          options: [
            { en: "always", km: "always" },
            { en: "am always", km: "am always" },
            { en: "always am", km: "always am" },
            { en: "always be", km: "always be" }
          ],
          correctAnswer: "am always",
          explanation: { en: "With the verb \"be\", the adverb comes after \"be\".", km: "ជាមួយកិរិយាស័ព្ទ \"be\" គុណកិរិយាមកបន្ទាប់ពី \"be\"។" },
        },
        {
          id: "af-ex-2",
          question: { en: "Choose: \"She ___ (usually eats/eats usually) breakfast.\"", km: "ជ្រើសរើស៖ \"She ___ (usually eats/eats usually) breakfast.\"" },
          type: 'multiple-choice',
          options: [
            { en: "usually eats", km: "usually eats" },
            { en: "eats usually", km: "eats usually" },
            { en: "is usually eats", km: "is usually eats" },
            { en: "usually eat", km: "usually eat" }
          ],
          correctAnswer: "usually eats",
          explanation: { en: "Adverbs of frequency come before the main verb.", km: "គុណកិរិយានៃភាពញឹកញាប់មកមុនកិរិយាស័ព្ទចម្បង។" },
        },
        {
          id: "af-ex-3",
          question: { en: "Complete: \"He ___ (always/never) smokes. He hates smoking.\"", km: "បំពេញ៖ \"He ___ (always/never) smokes. He hates smoking.\"" },
          type: 'multiple-choice',
          options: [
            { en: "always", km: "always" },
            { en: "never", km: "never" },
            { en: "usually", km: "usually" },
            { en: "often", km: "often" }
          ],
          correctAnswer: "never",
          explanation: { en: "\"Never\" means 0% — he does not smoke at all.", km: "\"Never\" មានន័យថា ០% — គាត់មិនជក់បារីទាល់តែសោះ។" },
        },
        {
          id: "af-ex-4",
          question: { en: "Complete: \"They ___ (sometimes/always) go to the beach. About twice a month.\"", km: "បំពេញ៖ \"They ___ (sometimes/always) go to the beach. About twice a month.\"" },
          type: 'multiple-choice',
          options: [
            { en: "always", km: "always" },
            { en: "never", km: "never" },
            { en: "sometimes", km: "sometimes" },
            { en: "rarely", km: "rarely" }
          ],
          correctAnswer: "sometimes",
          explanation: { en: "\"Sometimes\" means about 50% of the time — twice a month is sometimes.", km: "\"Sometimes\" មានន័យថាប្រហែល ៥០% — ពីរដងក្នុងមួយខែគឺពេលខ្លះ។" },
        },
        {
          id: "af-ex-5",
          question: { en: "Choose the correct sentence:", km: "ជ្រើសរើសប្រយោគត្រឹមត្រូវ៖" },
          type: 'multiple-choice',
          options: [
            { en: "I always am on time.", km: "I always am on time." },
            { en: "I am always on time.", km: "I am always on time." },
            { en: "Always I am on time.", km: "Always I am on time." },
            { en: "I am on time always.", km: "I am on time always." }
          ],
          correctAnswer: "I am always on time.",
          explanation: { en: "With \"be\", the adverb comes after the verb: am + always.", km: "ជាមួយ \"be\" គុណកិរិយាមកបន្ទាប់ពីកិរិយាស័ព្ទ៖ am + always។" },
        }
      ],
      homework: [
        { id: "af-hw-1", instruction: { en: "Write 1 sentence for each adverb of frequency: always, usually, often, sometimes, rarely, never.", km: "សរសេរប្រយោគ ១ សម្រាប់គុណកិរិយានីមួយៗ៖ always, usually, often, sometimes, rarely, never។" } },
        { id: "af-hw-2", instruction: { en: "Write 5 sentences about your daily routine using adverbs of frequency.", km: "សរសេរប្រយោគ ៥ អំពីទម្លាប់ប្រចាំថ្ងៃរបស់អ្នកដោយប្រើគុណកិរិយានៃភាពញឹកញាប់។" } }
      ],
      quiz: [
        {
          id: "af-q-1",
          question: { en: "\"I ___ (always/never) brush my teeth before bed. Every single night.\"", km: "\"I ___ (always/never) brush my teeth before bed. Every single night.\"" },
          type: 'multiple-choice',
          options: [
            { en: "always", km: "always" },
            { en: "never", km: "never" },
            { en: "sometimes", km: "sometimes" },
            { en: "rarely", km: "rarely" }
          ],
          correctAnswer: "always",
          explanation: { en: "\"Every single night\" means 100% — always.", km: "\"Every single night\" មានន័យថា ១០០% — always។" },
        },
        {
          id: "af-q-2",
          question: { en: "\"She ___ (usually/is usually) kind to everyone.\"", km: "\"She ___ (usually/is usually) kind to everyone.\"" },
          type: 'multiple-choice',
          options: [
            { en: "usually", km: "usually" },
            { en: "is usually", km: "is usually" },
            { en: "usually is", km: "usually is" },
            { en: "usually be", km: "usually be" }
          ],
          correctAnswer: "is usually",
          explanation: { en: "With \"kind\" (adjective) we use \"be\" + adverb.", km: "ជាមួយ \"kind\" (គុណនាម) យើងប្រើ \"be\" + គុណកិរិយា។" },
        },
        {
          id: "af-q-3",
          question: { en: "\"Where do you ___ (usually/usually do) go on weekends?\"", km: "\"Where do you ___ (usually/usually do) go on weekends?\"" },
          type: 'multiple-choice',
          options: [
            { en: "usually", km: "usually" },
            { en: "usually do", km: "usually do" },
            { en: "do usually", km: "do usually" },
            { en: "are usually", km: "are usually" }
          ],
          correctAnswer: "usually",
          explanation: { en: "In questions, the adverb comes after the subject and before the main verb.", km: "ក្នុងសំណួរ គុណកិរិយាមកក្រោយប្រធាន និងមុនកិរិយាស័ព្ទចម្បង។" },
        }
      ],
      vocabularyIds: ["always", "usually", "often", "sometimes", "rarely", "never", "wake-up", "coffee", "football", "late", "bored", "tired", "breakfast", "beach", "smoke", "time", "morning", "weekend"],
    }
      ],
    },
    {
      id: "ch-9-past",
      title: { en: "Past Tense", km: "អតីតកាល" },
      lessons: [
    {
      id: "past-simple",
      title: { en: "Past Simple Tense", km: "អតីតកាលធម្មតា" },
      level: "beginner",
      unitId: "unit-1",
      chapterId: "ch-9-past",
      order: 17,
      estimatedMinutes: 20,
      definition: { en: "Past Simple is used for completed actions in the past. Regular verbs add \"-ed\" (walk -> walked). Irregular verbs change form (go -> went). Use \"did not\" + base verb for negatives. Use \"Did\" + subject + base verb for questions.", km: "អតីតកាលធម្មតាត្រូវបានប្រើសម្រាប់សកម្មភាពដែលបានបញ្ចប់ក្នុងអតីតកាល។ កិរិយាស័ព្ទទៀងទាត់បន្ថែម \"-ed\" (walk -> walked)។ កិរិយាស័ព្ទមិនទៀងទាត់ប្តូរទម្រង់ (go -> went)។ ប្រើ \"did not\" + កិរិយាស័ព្ទដើមសម្រាប់អវិជ្ជមាន។ ប្រើ \"Did\" + ប្រធាន + កិរិយាស័ព្ទដើមសម្រាប់សំណួរ។" },
            forms: {
        affirmative:         {
          structure: "Subject + past tense verb (V2)",
          examples: [
          { en: "I walked to school yesterday.", km: "ខ្ញុំបានដើរទៅសាលារៀនកាលពីម្សិលមិញ។" },
          { en: "She went to the market.", km: "នាងបានទៅផ្សារ។" },
          { en: "He ate rice for lunch.", km: "គាត់បានញ៉ាំបាយសម្រាប់អាហារថ្ងៃត្រង់។" },
          { en: "They played football last Sunday.", km: "ពួកគេបានលេងបាល់ទាត់កាលពីថ្ងៃអាទិត្យមុន។" },
          { en: "We visited Angkor Wat last year.", km: "ពួកយើងបានទៅទស្សនាអង្គរវត្តកាលពីឆ្នាំមុន។" }
          ],
        },
        negative:         {
          structure: "Subject + did not (didn't) + base verb",
          examples: [
          { en: "I did not walk to school.", km: "ខ្ញុំមិនបានដើរទៅសាលារៀនទេ។" },
          { en: "She did not go to the market.", km: "នាងមិនបានទៅផ្សារទេ។" },
          { en: "He did not eat rice.", km: "គាត់មិនបានញ៉ាំបាយទេ។" },
          { en: "They did not play football.", km: "ពួកគេមិនបានលេងបាល់ទាត់ទេ។" },
          { en: "We did not visit Angkor Wat.", km: "ពួកយើងមិនបានទៅទស្សនាអង្គរវត្តទេ។" }
          ],
        },
        question:         {
          structure: "Did + subject + base verb?",
          examples: [
          { en: "Did you walk to school? Yes, I did.", km: "តើអ្នកបានដើរទៅសាលារៀនទេ? បាទ ខ្ញុំបានដើរ។" },
          { en: "Did she go to the market? No, she did not.", km: "តើនាងបានទៅផ្សារទេ? ទេ នាងមិនបានទៅទេ។" },
          { en: "Did he eat rice? Yes, he did.", km: "តើគាត់បានញ៉ាំបាយទេ? បាទ គាត់បានញ៉ាំ។" },
          { en: "Did they play football? No, they did not.", km: "តើពួកគេបានលេងបាល់ទាត់ទេ? ទេ ពួកគេមិនបានលេងទេ។" },
          { en: "Did you visit Angkor Wat? Yes, we did.", km: "តើអ្នកបានទៅទស្សនាអង្គរវត្តទេ? បាទ ពួកយើងបានទៅ។" }
          ],
        },
      },
      commonMistakes: [
        { mistake: "\"I go to school yesterday.\"", correction: "\"I went to school yesterday.\"", reason: { en: "Use past tense form of the verb for past actions.", km: "ប្រើទម្រង់អតីតកាលនៃកិរិយាស័ព្ទសម្រាប់សកម្មភាពកន្លងមក។" } },
        { mistake: "\"I did not went to school.\"", correction: "\"I did not go to school.\"", reason: { en: "After \"did not\", use the base verb without past tense.", km: "បន្ទាប់ពី \"did not\" ប្រើកិរិយាស័ព្ទដើមដោយគ្មានទម្រង់អតីតកាល។" } },
        { mistake: "\"Did you went to school?\"", correction: "\"Did you go to school?\"", reason: { en: "After \"Did\", use the base verb without past tense.", km: "បន្ទាប់ពី \"Did\" ប្រើកិរិយាស័ព្ទដើមដោយគ្មានទម្រង់អតីតកាល។" } }
      ],
      exercises: [
        {
          id: "ps-ex-1",
          question: { en: "Complete: \"I ___ (walk/walked) to the park yesterday.\"", km: "បំពេញ៖ \"I ___ (walk/walked) to the park yesterday.\"" },
          type: 'multiple-choice',
          options: [
            { en: "walk", km: "walk" },
            { en: "walked", km: "walked" },
            { en: "walking", km: "walking" },
            { en: "walks", km: "walks" }
          ],
          correctAnswer: "walked",
          explanation: { en: "For past actions, add \"-ed\" to regular verbs like \"walk\".", km: "សម្រាប់សកម្មភាពកន្លងមក បន្ថែម \"-ed\" ទៅកិរិយាស័ព្ទទៀងទាត់ដូចជា \"walk\"។" },
        },
        {
          id: "ps-ex-2",
          question: { en: "Complete: \"She ___ (go/went) to Siem Reap last week.\"", km: "បំពេញ៖ \"She ___ (go/went) to Siem Reap last week.\"" },
          type: 'multiple-choice',
          options: [
            { en: "go", km: "go" },
            { en: "went", km: "went" },
            { en: "going", km: "going" },
            { en: "goes", km: "goes" }
          ],
          correctAnswer: "went",
          explanation: { en: "\"Went\" is the irregular past form of \"go\".", km: "\"Went\" ជាទម្រង់អតីតកាលមិនទៀងទាត់របស់ \"go\"។" },
        },
        {
          id: "ps-ex-3",
          question: { en: "Choose the negative: \"He ___ (did not eat/did not ate) dinner.\"", km: "ជ្រើសរើសទម្រង់អវិជ្ជមាន៖ \"He ___ (did not eat/did not ate) dinner.\"" },
          type: 'multiple-choice',
          options: [
            { en: "did not eat", km: "did not eat" },
            { en: "did not ate", km: "did not ate" },
            { en: "did not eating", km: "did not eating" },
            { en: "not ate", km: "not ate" }
          ],
          correctAnswer: "did not eat",
          explanation: { en: "After \"did not\" use the base verb \"eat\", not \"ate\".", km: "បន្ទាប់ពី \"did not\" ប្រើកិរិយាស័ព្ទដើម \"eat\" មិនមែន \"ate\"។" },
        },
        {
          id: "ps-ex-4",
          question: { en: "Choose the correct question: \"___ (Did/Does) she call you yesterday?\"", km: "ជ្រើសរើសសំណួរត្រឹមត្រូវ៖ \"___ (Did/Does) she call you yesterday?\"" },
          type: 'multiple-choice',
          options: [
            { en: "Did", km: "Did" },
            { en: "Does", km: "Does" },
            { en: "Do", km: "Do" },
            { en: "Was", km: "Was" }
          ],
          correctAnswer: "Did",
          explanation: { en: "Use \"Did\" for past simple questions.", km: "ប្រើ \"Did\" សម្រាប់សំណួរអតីតកាលធម្មតា។" },
        },
        {
          id: "ps-ex-5",
          question: { en: "Choose the correct sentence:", km: "ជ្រើសរើសប្រយោគត្រឹមត្រូវ៖" },
          type: 'multiple-choice',
          options: [
            { en: "I didn't went to the party.", km: "I didn't went to the party." },
            { en: "I didn't go to the party.", km: "I didn't go to the party." },
            { en: "I not went to the party.", km: "I not went to the party." },
            { en: "I didn't going to the party.", km: "I didn't going to the party." }
          ],
          correctAnswer: "I didn't go to the party.",
          explanation: { en: "After \"didn't\", always use the base verb form.", km: "បន្ទាប់ពី \"didn't\" តែងតែប្រើទម្រង់កិរិយាស័ព្ទដើម។" },
        }
      ],
      homework: [
        { id: "ps-hw-1", instruction: { en: "Write 10 sentences about what you did yesterday using past simple.", km: "សរសេរប្រយោគ ១០ អំពីអ្វីដែលអ្នកបានធ្វើកាលពីម្សិលមិញដោយប្រើអតីតកាលធម្មតា។" } },
        { id: "ps-hw-2", instruction: { en: "Write 5 questions in past simple and answer them.", km: "សរសេរសំណួរ ៥ ក្នុងអតីតកាលធម្មតា ហើយឆ្លើយពួកវា។" } },
        { id: "ps-hw-3", instruction: { en: "Make a list of 10 irregular verbs and their past forms.", km: "ធ្វើបញ្ជីកិរិយាស័ព្ទមិនទៀងទាត់ ១០ និងទម្រង់អតីតកាលរបស់វា។" } }
      ],
      quiz: [
        {
          id: "ps-q-1",
          question: { en: "\"I ___ (see/saw) a movie last night.\"", km: "\"I ___ (see/saw) a movie last night.\"" },
          type: 'multiple-choice',
          options: [
            { en: "see", km: "see" },
            { en: "saw", km: "saw" },
            { en: "seeing", km: "seeing" },
            { en: "seen", km: "seen" }
          ],
          correctAnswer: "saw",
          explanation: { en: "\"Saw\" is the irregular past form of \"see\".", km: "\"Saw\" ជាទម្រង់អតីតកាលមិនទៀងទាត់របស់ \"see\"។" },
        },
        {
          id: "ps-q-2",
          question: { en: "\"___ (Did/Does) you eat breakfast this morning?\"", km: "\"___ (Did/Does) you eat breakfast this morning?\"" },
          type: 'multiple-choice',
          options: [
            { en: "Did", km: "Did" },
            { en: "Does", km: "Does" },
            { en: "Do", km: "Do" },
            { en: "Are", km: "Are" }
          ],
          correctAnswer: "Did",
          explanation: { en: "Use \"Did\" for past simple questions. \"This morning\" is already past.", km: "ប្រើ \"Did\" សម្រាប់សំណួរអតីតកាលធម្មតា។ \"This morning\" គឺជាអតីតកាលរួចហើយ។" },
        },
        {
          id: "ps-q-3",
          question: { en: "\"She ___ (buy/bought) a new phone yesterday.\"", km: "\"She ___ (buy/bought) a new phone yesterday.\"" },
          type: 'multiple-choice',
          options: [
            { en: "buy", km: "buy" },
            { en: "bought", km: "bought" },
            { en: "buying", km: "buying" },
            { en: "buys", km: "buys" }
          ],
          correctAnswer: "bought",
          explanation: { en: "\"Bought\" is the irregular past form of \"buy\".", km: "\"Bought\" ជាទម្រង់អតីតកាលមិនទៀងទាត់របស់ \"buy\"។" },
        },
        {
          id: "ps-q-4",
          question: { en: "\"They ___ (did not/didn't) come to the meeting.\"", km: "\"They ___ (did not/didn't) come to the meeting.\"" },
          type: 'multiple-choice',
          options: [
            { en: "did not", km: "did not" },
            { en: "didn't", km: "didn't" },
            { en: "not", km: "not" },
            { en: "did not came", km: "did not came" }
          ],
          correctAnswer: "didn't",
          explanation: { en: "Both \"did not\" and \"didn't\" are correct. Base verb \"come\" after \"didn't\".", km: "ទាំង \"did not\" និង \"didn't\" គឺត្រឹមត្រូវ។ កិរិយាស័ព្ទដើម \"come\" បន្ទាប់ពី \"didn't\"។" },
        }
      ],
      vocabularyIds: ["past-simple", "yesterday", "last-week", "last-year", "walk", "went", "ate", "played", "visited", "saw", "bought", "did", "ate", "went", "saw", "bought", "came", "call", "eat", "drink", "sleep", "study", "play", "visit"],
    }
      ],
    }
    ],
  },
{
  id: "unit-2",
  title: {
    en: "Essential Grammar",
    km: "វេយ្យាករណ៍សំខាន់"
  },
  level: "intermediate",
  order: 2,
  chapters: [
    {
      id: "ch-2-pres-past-cont",
      title: {
        en: "Present & Past Continuous",
        km: "បច្ចុប្បន្នកាលកំពុងបន្ត និងអតីតកាលកំពុងបន្ត"
      },
      lessons: [
        {
          id: "pres-continuous",
          title: {
            en: "Present Continuous",
            km: "បច្ចុប្បន្នកាលកំពុងបន្ត"
          },
          level: "intermediate",
          unitId: "unit-2",
          chapterId: "ch-2-pres-past-cont",
          order: 1,
          estimatedMinutes: 15,
          definition: {
            en: "Present Continuous for actions happening NOW. Form: am/is/are + verb-ing.",
            km: "ប្រើសម្រាប់សកម្មភាពកំពុងកើតឡើងឥឡូវ។ រូបមន្ត៖ am/is/are + verb-ing"
          },
          forms: {
            affirmative: {
              structure: "S + am/is/are + verb-ing",
              examples: [
                {
                  en: "I am working now.",
                  km: "ខ្ញុំកំពុងធ្វើការឥឡូវ"
                },
                {
                  en: "She is reading.",
                  km: "នាងកំពុងអាន"
                },
                {
                  en: "They are eating.",
                  km: "ពួកគេកំពុងញ៉ាំ"
                },
                {
                  en: "He is helping.",
                  km: "គាត់កំពុងជួយ"
                },
                {
                  en: "We are studying.",
                  km: "យើងកំពុងរៀន"
                }
              ]
            },
            negative: {
              structure: "S + am/is/are + not + verb-ing",
              examples: [
                {
                  en: "I am not working.",
                  km: "ខ្ញុំមិនកំពុងធ្វើការ"
                },
                {
                  en: "She is not reading.",
                  km: "នាងមិនកំពុងអាន"
                },
                {
                  en: "They are not eating.",
                  km: "ពួកគេមិនកំពុងញ៉ាំ"
                }
              ]
            },
            question: {
              structure: "Am/Is/Are + S + verb-ing?",
              examples: [
                {
                  en: "Are you working?",
                  km: "តើអ្នកកំពុងធ្វើការទេ?"
                },
                {
                  en: "Is she reading?",
                  km: "តើនាងកំពុងអានទេ?"
                },
                {
                  en: "Are they eating?",
                  km: "តើពួកគេកំពុងញ៉ាំទេ?"
                }
              ]
            }
          },
          commonMistakes: [
            {
              mistake: "He working now",
              correction: "He is working now",
              reason: {
                en: "Include be verb before verb-ing",
                km: ""
              }
            }
          ],
          exercises: [
            {
              id: "pres-continuous-ex-1",
              question: {
                en: "She ___ a book now.",
                km: "She ___ a book now."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "is read",
                  km: "is read"
                },
                {
                  en: "is reading",
                  km: "is reading"
                },
                {
                  en: "reads",
                  km: "reads"
                },
                {
                  en: "read",
                  km: "read"
                }
              ],
              correctAnswer: "is reading",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "pres-continuous-ex-2",
              question: {
                en: "They ___ lunch right now.",
                km: "They ___ lunch right now."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "are eat",
                  km: "are eat"
                },
                {
                  en: "are eating",
                  km: "are eating"
                },
                {
                  en: "eat",
                  km: "eat"
                },
                {
                  en: "eats",
                  km: "eats"
                }
              ],
              correctAnswer: "are eating",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "pres-continuous-ex-3",
              question: {
                en: "I am working -> negative form uses ___",
                km: "I am working -> negative form uses ___"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "am not",
                  km: "am not"
                },
                {
                  en: "is not",
                  km: "is not"
                },
                {
                  en: "are not",
                  km: "are not"
                },
                {
                  en: "do not",
                  km: "do not"
                }
              ],
              correctAnswer: "am not",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "pres-continuous-ex-4",
              question: {
                en: "___ he playing football now?",
                km: "___ he playing football now?"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "Are",
                  km: "Are"
                },
                {
                  en: "Is",
                  km: "Is"
                },
                {
                  en: "Am",
                  km: "Am"
                },
                {
                  en: "Do",
                  km: "Do"
                }
              ],
              correctAnswer: "Is",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "pres-continuous-ex-5",
              question: {
                en: "Choose correct:",
                km: "Choose correct:"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "We studying now.",
                  km: "We studying now."
                },
                {
                  en: "We are studying now.",
                  km: "We are studying now."
                },
                {
                  en: "We are study now.",
                  km: "We are study now."
                },
                {
                  en: "We studies now.",
                  km: "We studies now."
                }
              ],
              correctAnswer: "We are studying now.",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          homework: [
            {
              id: "pres-continuous-hw-1",
              instruction: {
                en: "Write 5 sentences using present continuous",
                km: "Write 5 sentences using present continuous"
              }
            },
            {
              id: "pres-continuous-hw-2",
              instruction: {
                en: "Write 3 present continuous questions",
                km: "Write 3 present continuous questions"
              }
            }
          ],
          quiz: [
            {
              id: "pres-continuous-q-1",
              question: {
                en: "I ___ an email now.",
                km: "I ___ an email now."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "am write",
                  km: "am write"
                },
                {
                  en: "am writing",
                  km: "am writing"
                },
                {
                  en: "write",
                  km: "write"
                },
                {
                  en: "writes",
                  km: "writes"
                }
              ],
              correctAnswer: "am writing",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "pres-continuous-q-2",
              question: {
                en: "The children ___ in the garden.",
                km: "The children ___ in the garden."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "is playing",
                  km: "is playing"
                },
                {
                  en: "are playing",
                  km: "are playing"
                },
                {
                  en: "play",
                  km: "play"
                },
                {
                  en: "plays",
                  km: "plays"
                }
              ],
              correctAnswer: "are playing",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "pres-continuous-q-3",
              question: {
                en: "He is cooking -> He ___ cooking",
                km: "He is cooking -> He ___ cooking"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "is not",
                  km: "is not"
                },
                {
                  en: "am not",
                  km: "am not"
                },
                {
                  en: "are not",
                  km: "are not"
                },
                {
                  en: "does not",
                  km: "does not"
                }
              ],
              correctAnswer: "is not",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          vocabularyIds: [
            "present-continuous",
            "working",
            "reading",
            "eating",
            "helping",
            "studying"
          ]
        },
        {
          id: "simple-vs-continuous",
          title: {
            en: "Present Simple vs Present Continuous",
            km: "បច្ចុប្បន្នកាលធម្មតា vs បច្ចុប្បន្នកាលកំពុងបន្ត"
          },
          level: "intermediate",
          unitId: "unit-2",
          chapterId: "ch-2-pres-past-cont",
          order: 2,
          estimatedMinutes: 20,
          definition: {
            en: "Present Simple = habits. Present Continuous = now. Past Continuous = was/were + verb-ing for past ongoing actions.",
            km: "Present Simple = ទម្លាប់។ Present Continuous = ឥឡូវនេះ។"
          },
          forms: {
            affirmative: {
              structure: "S+V(s/es) | S+am/is/are+V-ing | S+was/were+V-ing",
              examples: [
                {
                  en: "She works every day.",
                  km: "នាងធ្វើការរាល់ថ្ងៃ"
                },
                {
                  en: "She is working now.",
                  km: "នាងកំពុងធ្វើការឥឡូវ"
                },
                {
                  en: "I was watching when she called.",
                  km: "ខ្ញុំកំពុងមើលពេលនាងទូរស័ព្ទមក"
                },
                {
                  en: "They were playing.",
                  km: "ពួកគេកំពុងលេង"
                }
              ]
            },
            negative: {
              structure: "S+do/does+not+V | S+be+not+V-ing",
              examples: [
                {
                  en: "She does not work Sundays.",
                  km: "នាងមិនធ្វើការថ្ងៃអាទិត្យ"
                },
                {
                  en: "I was not watching.",
                  km: "ខ្ញុំមិនបានមើល"
                },
                {
                  en: "They were not playing.",
                  km: "ពួកគេមិនបានលេង"
                }
              ]
            },
            question: {
              structure: "Do/Does+...? | Am/Is/Are+...? | Was/Were+...?",
              examples: [
                {
                  en: "Does she work every day?",
                  km: "តើនាងធ្វើការរាល់ថ្ងៃទេ?"
                },
                {
                  en: "Is she working now?",
                  km: "តើនាងកំពុងធ្វើការទេ?"
                },
                {
                  en: "Were you watching?",
                  km: "តើអ្នកកំពុងមើលទេ?"
                }
              ]
            }
          },
          commonMistakes: [
            {
              mistake: "She is work every day",
              correction: "She works every day",
              reason: {
                en: "Habits = Present Simple, not Continuous",
                km: ""
              }
            }
          ],
          exercises: [
            {
              id: "simple-vs-continuous-ex-1",
              question: {
                en: "She ___ every day.",
                km: "She ___ every day."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "works",
                  km: "works"
                },
                {
                  en: "is working",
                  km: "is working"
                },
                {
                  en: "work",
                  km: "work"
                },
                {
                  en: "working",
                  km: "working"
                }
              ],
              correctAnswer: "works",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "simple-vs-continuous-ex-2",
              question: {
                en: "She ___ right now.",
                km: "She ___ right now."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "works",
                  km: "works"
                },
                {
                  en: "is working",
                  km: "is working"
                },
                {
                  en: "work",
                  km: "work"
                },
                {
                  en: "worked",
                  km: "worked"
                }
              ],
              correctAnswer: "is working",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "simple-vs-continuous-ex-3",
              question: {
                en: "I ___ TV when she arrived.",
                km: "I ___ TV when she arrived."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "watched",
                  km: "watched"
                },
                {
                  en: "was watching",
                  km: "was watching"
                },
                {
                  en: "watch",
                  km: "watch"
                },
                {
                  en: "am watching",
                  km: "am watching"
                }
              ],
              correctAnswer: "was watching",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "simple-vs-continuous-ex-4",
              question: {
                en: "Choose correct for habits:",
                km: "Choose correct for habits:"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "He is drinking every morning.",
                  km: "He is drinking every morning."
                },
                {
                  en: "He drinks every morning.",
                  km: "He drinks every morning."
                },
                {
                  en: "He drink every morning.",
                  km: "He drink every morning."
                }
              ],
              correctAnswer: "He drinks every morning.",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "simple-vs-continuous-ex-5",
              question: {
                en: "They ___ when it rained.",
                km: "They ___ when it rained."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "were playing",
                  km: "were playing"
                },
                {
                  en: "played",
                  km: "played"
                },
                {
                  en: "play",
                  km: "play"
                },
                {
                  en: "are playing",
                  km: "are playing"
                }
              ],
              correctAnswer: "were playing",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          homework: [
            {
              id: "simple-vs-continuous-hw-1",
              instruction: {
                en: "Write 3 pairs: Present Simple (habit) vs Present Continuous (now)",
                km: "Write 3 pairs: Present Simple (habit) vs Present Continuous (now)"
              }
            },
            {
              id: "simple-vs-continuous-hw-2",
              instruction: {
                en: "Write 3 Past Continuous sentences",
                km: "Write 3 Past Continuous sentences"
              }
            }
          ],
          quiz: [
            {
              id: "simple-vs-continuous-q-1",
              question: {
                en: "Which is about a routine?",
                km: "Which is about a routine?"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "She is working now.",
                  km: "She is working now."
                },
                {
                  en: "She works in a hospital.",
                  km: "She works in a hospital."
                },
                {
                  en: "She was working.",
                  km: "She was working."
                }
              ],
              correctAnswer: "She works in a hospital.",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "simple-vs-continuous-q-2",
              question: {
                en: "I ___ reading when the phone rang.",
                km: "I ___ reading when the phone rang."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "was",
                  km: "was"
                },
                {
                  en: "am",
                  km: "am"
                },
                {
                  en: "reads",
                  km: "reads"
                },
                {
                  en: "read",
                  km: "read"
                }
              ],
              correctAnswer: "was",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "simple-vs-continuous-q-3",
              question: {
                en: "He ___ sleeping when I called last night.",
                km: "He ___ sleeping when I called last night."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "is",
                  km: "is"
                },
                {
                  en: "was",
                  km: "was"
                },
                {
                  en: "were",
                  km: "were"
                },
                {
                  en: "are",
                  km: "are"
                }
              ],
              correctAnswer: "was",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          vocabularyIds: [
            "present-simple",
            "present-continuous",
            "past-continuous",
            "habit",
            "routine",
            "was",
            "were"
          ]
        }
      ]
    },
    {
      id: "ch-2-future",
      title: {
        en: "Future Tenses",
        km: "អនាគតកាល"
      },
      lessons: [
        {
          id: "be-going-to",
          title: {
            en: "Future with Be Going To",
            km: "អនាគតកាលជាមួយ Be Going To"
          },
          level: "intermediate",
          unitId: "unit-2",
          chapterId: "ch-2-future",
          order: 3,
          estimatedMinutes: 15,
          definition: {
            en: "Be going to for plans, intentions, predictions based on evidence. Form: am/is/are + going to + V.",
            km: "Be going to សម្រាប់ផែនការ ចេតនា ការទស្សន៍ទាយ"
          },
          forms: {
            affirmative: {
              structure: "S + am/is/are + going to + V",
              examples: [
                {
                  en: "She is going to meet a client.",
                  km: "នាងគ្រោងជួបអតិថិជន"
                },
                {
                  en: "I am going to study.",
                  km: "ខ្ញុំគ្រោងរៀន"
                },
                {
                  en: "It is going to rain.",
                  km: "វាហៀបនឹងភ្លៀង"
                },
                {
                  en: "They are going to travel.",
                  km: "ពួកគេគ្រោងធ្វើដំណើរ"
                },
                {
                  en: "He is going to buy a car.",
                  km: "គាត់គ្រោងទិញឡាន"
                }
              ]
            },
            negative: {
              structure: "S + am/is/are + not + going to + V",
              examples: [
                {
                  en: "She is not going to meet.",
                  km: "នាងមិនគ្រោងជួប"
                },
                {
                  en: "I am not going to study.",
                  km: "ខ្ញុំមិនគ្រោងរៀន"
                },
                {
                  en: "It is not going to rain.",
                  km: "វាមិនមែននឹងភ្លៀង"
                }
              ]
            },
            question: {
              structure: "Am/Is/Are + S + going to + V?",
              examples: [
                {
                  en: "Is she going to meet?",
                  km: "តើនាងគ្រោងជួបទេ?"
                },
                {
                  en: "Are you going to study?",
                  km: "តើអ្នកគ្រោងរៀនទេ?"
                },
                {
                  en: "Is it going to rain?",
                  km: "តើវានឹងភ្លៀងទេ?"
                }
              ]
            }
          },
          commonMistakes: [
            {
              mistake: "She going to meet",
              correction: "She is going to meet",
              reason: {
                en: "Include am/is/are before going to",
                km: ""
              }
            }
          ],
          exercises: [
            {
              id: "be-going-to-ex-1",
              question: {
                en: "She ___ going to visit family.",
                km: "She ___ going to visit family."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "is",
                  km: "is"
                },
                {
                  en: "are",
                  km: "are"
                },
                {
                  en: "am",
                  km: "am"
                },
                {
                  en: "be",
                  km: "be"
                }
              ],
              correctAnswer: "is",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "be-going-to-ex-2",
              question: {
                en: "They ___ going to arrive tomorrow.",
                km: "They ___ going to arrive tomorrow."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "are",
                  km: "are"
                },
                {
                  en: "is",
                  km: "is"
                },
                {
                  en: "am",
                  km: "am"
                },
                {
                  en: "be",
                  km: "be"
                }
              ],
              correctAnswer: "are",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "be-going-to-ex-3",
              question: {
                en: "I am going to travel -> I ___ going to travel (negative)",
                km: "I am going to travel -> I ___ going to travel (negative)"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "am not",
                  km: "am not"
                },
                {
                  en: "is not",
                  km: "is not"
                },
                {
                  en: "are not",
                  km: "are not"
                },
                {
                  en: "do not",
                  km: "do not"
                }
              ],
              correctAnswer: "am not",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "be-going-to-ex-4",
              question: {
                en: "___ he going to call us?",
                km: "___ he going to call us?"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "Is",
                  km: "Is"
                },
                {
                  en: "Are",
                  km: "Are"
                },
                {
                  en: "Am",
                  km: "Am"
                },
                {
                  en: "Do",
                  km: "Do"
                }
              ],
              correctAnswer: "Is",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "be-going-to-ex-5",
              question: {
                en: "Choose correct:",
                km: "Choose correct:"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "She going to buy.",
                  km: "She going to buy."
                },
                {
                  en: "She is going to buy.",
                  km: "She is going to buy."
                },
                {
                  en: "She will going to buy.",
                  km: "She will going to buy."
                }
              ],
              correctAnswer: "She is going to buy.",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          homework: [
            {
              id: "be-going-to-hw-1",
              instruction: {
                en: "Write 5 sentences about your future plans using be going to",
                km: "Write 5 sentences about your future plans using be going to"
              }
            },
            {
              id: "be-going-to-hw-2",
              instruction: {
                en: "Make 3 predictions using be going to",
                km: "Make 3 predictions using be going to"
              }
            }
          ],
          quiz: [
            {
              id: "be-going-to-q-1",
              question: {
                en: "He ___ going to start a job.",
                km: "He ___ going to start a job."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "is",
                  km: "is"
                },
                {
                  en: "are",
                  km: "are"
                },
                {
                  en: "am",
                  km: "am"
                },
                {
                  en: "will",
                  km: "will"
                }
              ],
              correctAnswer: "is",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "be-going-to-q-2",
              question: {
                en: "They ___ going to build a school.",
                km: "They ___ going to build a school."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "are",
                  km: "are"
                },
                {
                  en: "is",
                  km: "is"
                },
                {
                  en: "am",
                  km: "am"
                },
                {
                  en: "will",
                  km: "will"
                }
              ],
              correctAnswer: "are",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "be-going-to-q-3",
              question: {
                en: "We are going to leave -> We ___ going to leave",
                km: "We are going to leave -> We ___ going to leave"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "are not",
                  km: "are not"
                },
                {
                  en: "is not",
                  km: "is not"
                },
                {
                  en: "am not",
                  km: "am not"
                },
                {
                  en: "do not",
                  km: "do not"
                }
              ],
              correctAnswer: "are not",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          vocabularyIds: [
            "be-going-to",
            "plan",
            "intention",
            "prediction",
            "travel",
            "rain",
            "buy",
            "visit"
          ]
        },
        {
          id: "will-future",
          title: {
            en: "Future with Will",
            km: "អនាគតកាលជាមួយ Will"
          },
          level: "intermediate",
          unitId: "unit-2",
          chapterId: "ch-2-future",
          order: 4,
          estimatedMinutes: 15,
          definition: {
            en: "Will for spontaneous decisions, promises, offers, predictions. Form: will + V. Negative: will not (won't).",
            km: "Will សម្រាប់ការសម្រេចចិត្តភ្លាមៗ ការសន្យា ការផ្តល់ជូន"
          },
          forms: {
            affirmative: {
              structure: "S + will + V",
              examples: [
                {
                  en: "I will help you.",
                  km: "ខ្ញុំនឹងជួយអ្នក"
                },
                {
                  en: "I think it will rain.",
                  km: "ខ្ញុំគិតថានឹងភ្លៀង"
                },
                {
                  en: "She will call you.",
                  km: "នាងនឹងទូរស័ព្ទ"
                },
                {
                  en: "We will see you.",
                  km: "យើងនឹងជួបអ្នក"
                },
                {
                  en: "He will be late.",
                  km: "គាត់នឹងមកយឺត"
                }
              ]
            },
            negative: {
              structure: "S + will not (won't) + V",
              examples: [
                {
                  en: "I will not help you.",
                  km: "ខ្ញុំនឹងមិនជួយ"
                },
                {
                  en: "It won't rain.",
                  km: "វានឹងមិនភ្លៀង"
                },
                {
                  en: "She won't call.",
                  km: "នាងនឹងមិនទូរស័ព្ទ"
                }
              ]
            },
            question: {
              structure: "Will + S + V?",
              examples: [
                {
                  en: "Will you help me?",
                  km: "តើអ្នកនឹងជួយខ្ញុំទេ?"
                },
                {
                  en: "Will it rain?",
                  km: "តើវានឹងភ្លៀងទេ?"
                },
                {
                  en: "Will she call?",
                  km: "តើនាងនឹងទូរស័ព្ទទេ?"
                }
              ]
            }
          },
          commonMistakes: [
            {
              mistake: "I will to help you",
              correction: "I will help you",
              reason: {
                en: "Base verb after will, no to",
                km: ""
              }
            }
          ],
          exercises: [
            {
              id: "will-future-ex-1",
              question: {
                en: "I ___ call you later.",
                km: "I ___ call you later."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "will",
                  km: "will"
                },
                {
                  en: "will to",
                  km: "will to"
                },
                {
                  en: "will calling",
                  km: "will calling"
                },
                {
                  en: "will called",
                  km: "will called"
                }
              ],
              correctAnswer: "will",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "will-future-ex-2",
              question: {
                en: "She will come -> She ___ come (negative)",
                km: "She will come -> She ___ come (negative)"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "will not",
                  km: "will not"
                },
                {
                  en: "will not to",
                  km: "will not to"
                },
                {
                  en: "does not will",
                  km: "does not will"
                },
                {
                  en: "is not",
                  km: "is not"
                }
              ],
              correctAnswer: "will not",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "will-future-ex-3",
              question: {
                en: "___ you marry me?",
                km: "___ you marry me?"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "Will",
                  km: "Will"
                },
                {
                  en: "Does",
                  km: "Does"
                },
                {
                  en: "Do",
                  km: "Do"
                },
                {
                  en: "Are",
                  km: "Are"
                }
              ],
              correctAnswer: "Will",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "will-future-ex-4",
              question: {
                en: "I think it ___ tomorrow.",
                km: "I think it ___ tomorrow."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "will rain",
                  km: "will rain"
                },
                {
                  en: "rains",
                  km: "rains"
                },
                {
                  en: "is raining",
                  km: "is raining"
                },
                {
                  en: "rained",
                  km: "rained"
                }
              ],
              correctAnswer: "will rain",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "will-future-ex-5",
              question: {
                en: "Choose correct:",
                km: "Choose correct:"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "I will help you.",
                  km: "I will help you."
                },
                {
                  en: "I will helping you.",
                  km: "I will helping you."
                },
                {
                  en: "I will to help you.",
                  km: "I will to help you."
                }
              ],
              correctAnswer: "I will help you.",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          homework: [
            {
              id: "will-future-hw-1",
              instruction: {
                en: "Write 3 promises and 3 decisions using will",
                km: "Write 3 promises and 3 decisions using will"
              }
            },
            {
              id: "will-future-hw-2",
              instruction: {
                en: "Make 3 predictions about technology",
                km: "Make 3 predictions about technology"
              }
            }
          ],
          quiz: [
            {
              id: "will-future-q-1",
              question: {
                en: "I ___ help you carry those bags.",
                km: "I ___ help you carry those bags."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "will",
                  km: "will"
                },
                {
                  en: "am",
                  km: "am"
                },
                {
                  en: "do",
                  km: "do"
                },
                {
                  en: "going",
                  km: "going"
                }
              ],
              correctAnswer: "will",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "will-future-q-2",
              question: {
                en: "Contraction of will not is:",
                km: "Contraction of will not is:"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "won't",
                  km: "won't"
                },
                {
                  en: "willn't",
                  km: "willn't"
                },
                {
                  en: "willnot",
                  km: "willnot"
                },
                {
                  en: "will'nt",
                  km: "will'nt"
                }
              ],
              correctAnswer: "won't",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "will-future-q-3",
              question: {
                en: "Don't worry, I ___ forget.",
                km: "Don't worry, I ___ forget."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "won't",
                  km: "won't"
                },
                {
                  en: "willn't",
                  km: "willn't"
                },
                {
                  en: "will not to",
                  km: "will not to"
                },
                {
                  en: "will'nt",
                  km: "will'nt"
                }
              ],
              correctAnswer: "won't",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          vocabularyIds: [
            "will",
            "wont",
            "promise",
            "decision",
            "offer",
            "prediction",
            "help",
            "rain",
            "call"
          ]
        }
      ]
    },
    {
      id: "ch-2-present-perfect",
      title: {
        en: "Present Perfect",
        km: "បច្ចុប្បន្នកាលល្អឥតខ្ចោះ"
      },
      lessons: [
        {
          id: "present-perfect",
          title: {
            en: "Present Perfect Tense",
            km: "បច្ចុប្បន្នកាលល្អឥតខ្ចោះ"
          },
          level: "intermediate",
          unitId: "unit-2",
          chapterId: "ch-2-present-perfect",
          order: 5,
          estimatedMinutes: 20,
          definition: {
            en: "Present Perfect connects past to now. have/has + past participle. Uses: experience (ever/never), unfinished (for/since), recent (just), completed (already/yet).",
            km: "ភ្ជាប់អតីតកាលទៅបច្ចុប្បន្ន។ have/has + V3"
          },
          forms: {
            affirmative: {
              structure: "S + have/has + V3",
              examples: [
                {
                  en: "I have visited Angkor Wat.",
                  km: "ខ្ញុំធ្លាប់ទៅលេងអង្គរវត្ត"
                },
                {
                  en: "She has eaten already.",
                  km: "នាងបានញ៉ាំរួច"
                },
                {
                  en: "They have lived here for 5 years.",
                  km: "ពួកគេរស់នៅទីនេះ៥ឆ្នាំ"
                },
                {
                  en: "He has just finished.",
                  km: "គាត់ទើបបញ្ចប់"
                },
                {
                  en: "I have never been to Japan.",
                  km: "ខ្ញុំមិនដែលទៅជប៉ុន"
                }
              ]
            },
            negative: {
              structure: "S + have/has + not + V3",
              examples: [
                {
                  en: "I have not visited.",
                  km: "ខ្ញុំមិនដែលទៅ"
                },
                {
                  en: "She has not eaten yet.",
                  km: "នាងមិនទាន់ញ៉ាំ"
                },
                {
                  en: "They have not lived here long.",
                  km: "ពួកគេមិនទាន់រស់នៅយូរ"
                }
              ]
            },
            question: {
              structure: "Have/Has + S + V3?",
              examples: [
                {
                  en: "Have you visited Angkor Wat?",
                  km: "តើអ្នកធ្លាប់ទៅអង្គរវត្តទេ?"
                },
                {
                  en: "Has she eaten yet?",
                  km: "តើនាងញ៉ាំហើយឬនៅ?"
                },
                {
                  en: "Have they lived here long?",
                  km: "តើពួកគេរស់នៅទីនេះយូរទេ?"
                }
              ]
            }
          },
          commonMistakes: [
            {
              mistake: "I have visit Angkor Wat",
              correction: "I have visited Angkor Wat",
              reason: {
                en: "Use past participle after have/has",
                km: ""
              }
            }
          ],
          exercises: [
            {
              id: "present-perfect-ex-1",
              question: {
                en: "She ___ her homework already.",
                km: "She ___ her homework already."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "has finished",
                  km: "has finished"
                },
                {
                  en: "finished",
                  km: "finished"
                },
                {
                  en: "have finished",
                  km: "have finished"
                },
                {
                  en: "finishes",
                  km: "finishes"
                }
              ],
              correctAnswer: "has finished",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "present-perfect-ex-2",
              question: {
                en: "They ___ here since 2020.",
                km: "They ___ here since 2020."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "have live",
                  km: "have live"
                },
                {
                  en: "have lived",
                  km: "have lived"
                },
                {
                  en: "have living",
                  km: "have living"
                },
                {
                  en: "lived",
                  km: "lived"
                }
              ],
              correctAnswer: "have lived",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "present-perfect-ex-3",
              question: {
                en: "I have seen that -> I ___ seen that (negative)",
                km: "I have seen that -> I ___ seen that (negative)"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "have not",
                  km: "have not"
                },
                {
                  en: "has not",
                  km: "has not"
                },
                {
                  en: "did not",
                  km: "did not"
                },
                {
                  en: "am not",
                  km: "am not"
                }
              ],
              correctAnswer: "have not",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "present-perfect-ex-4",
              question: {
                en: "___ you ever eaten Khmer food?",
                km: "___ you ever eaten Khmer food?"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "Have",
                  km: "Have"
                },
                {
                  en: "Has",
                  km: "Has"
                },
                {
                  en: "Do",
                  km: "Do"
                },
                {
                  en: "Did",
                  km: "Did"
                }
              ],
              correctAnswer: "Have",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "present-perfect-ex-5",
              question: {
                en: "I have ___ to the market.",
                km: "I have ___ to the market."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "went",
                  km: "went"
                },
                {
                  en: "gone",
                  km: "gone"
                },
                {
                  en: "go",
                  km: "go"
                },
                {
                  en: "going",
                  km: "going"
                }
              ],
              correctAnswer: "gone",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          homework: [
            {
              id: "present-perfect-hw-1",
              instruction: {
                en: "Write 5 sentences with ever/never/just/already/yet",
                km: "Write 5 sentences with ever/never/just/already/yet"
              }
            },
            {
              id: "present-perfect-hw-2",
              instruction: {
                en: "Ask 5 Have you ever... questions",
                km: "Ask 5 Have you ever... questions"
              }
            }
          ],
          quiz: [
            {
              id: "present-perfect-q-1",
              question: {
                en: "He ___ already finished.",
                km: "He ___ already finished."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "has",
                  km: "has"
                },
                {
                  en: "have",
                  km: "have"
                },
                {
                  en: "is",
                  km: "is"
                },
                {
                  en: "was",
                  km: "was"
                }
              ],
              correctAnswer: "has",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "present-perfect-q-2",
              question: {
                en: "I have ___ been to Korea.",
                km: "I have ___ been to Korea."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "never",
                  km: "never"
                },
                {
                  en: "ever",
                  km: "ever"
                },
                {
                  en: "yet",
                  km: "yet"
                },
                {
                  en: "just",
                  km: "just"
                }
              ],
              correctAnswer: "never",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "present-perfect-q-3",
              question: {
                en: "They have lived here ___ 2015.",
                km: "They have lived here ___ 2015."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "since",
                  km: "since"
                },
                {
                  en: "for",
                  km: "for"
                },
                {
                  en: "from",
                  km: "from"
                },
                {
                  en: "in",
                  km: "in"
                }
              ],
              correctAnswer: "since",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          vocabularyIds: [
            "present-perfect",
            "have",
            "has",
            "ever",
            "never",
            "just",
            "already",
            "yet",
            "for",
            "since"
          ]
        },
        {
          id: "present-perfect-vs-past-simple",
          title: {
            en: "Present Perfect vs Past Simple",
            km: "Present Perfect និង Past Simple"
          },
          level: "intermediate",
          unitId: "unit-2",
          chapterId: "ch-2-present-perfect",
          order: 6,
          estimatedMinutes: 20,
          definition: {
            en: "Past Simple = specific past time. Present Perfect = connection to now or unspecific time.",
            km: "Past Simple = ពេលជាក់លាក់កន្លងមក។ Present Perfect = មិនជាក់លាក់"
          },
          forms: {
            affirmative: {
              structure: "Past: S+V2 (specific) | PP: S+have/has+V3 (unspecific)",
              examples: [
                {
                  en: "I saw that yesterday.",
                  km: "ខ្ញុំបានមើលកាលពីម្សិលមិញ"
                },
                {
                  en: "I have seen it before.",
                  km: "ខ្ញុំធ្លាប់មើលពីមុន"
                },
                {
                  en: "She visited Paris last year.",
                  km: "នាងទៅលេងប៉ារីសឆ្នាំមុន"
                },
                {
                  en: "She has visited Paris twice.",
                  km: "នាងធ្លាប់ទៅប៉ារីសពីរដង"
                }
              ]
            },
            negative: {
              structure: "Past: S+did+not+V | PP: S+have/has+not+V3",
              examples: [
                {
                  en: "I did not see that yesterday.",
                  km: "ខ្ញុំមិនបានមើលម្សិលមិញ"
                },
                {
                  en: "I have not seen it.",
                  km: "ខ្ញុំមិនដែលមើល"
                },
                {
                  en: "She has not visited Paris.",
                  km: "នាងមិនដែលទៅប៉ារីស"
                }
              ]
            },
            question: {
              structure: "Past: Did+S+V? | PP: Have/Has+S+V3?",
              examples: [
                {
                  en: "Did you see that yesterday?",
                  km: "តើអ្នកបានមើលម្សិលមិញទេ?"
                },
                {
                  en: "Have you seen that movie?",
                  km: "តើអ្នកធ្លាប់មើលរឿងនោះទេ?"
                }
              ]
            }
          },
          commonMistakes: [
            {
              mistake: "I have seen that yesterday",
              correction: "I saw that yesterday",
              reason: {
                en: "Specific time = Past Simple",
                km: ""
              }
            }
          ],
          exercises: [
            {
              id: "pres-perf-vs-past-ex-1",
              question: {
                en: "I ___ my grandmother last Sunday.",
                km: "I ___ my grandmother last Sunday."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "visited",
                  km: "visited"
                },
                {
                  en: "have visited",
                  km: "have visited"
                },
                {
                  en: "visit",
                  km: "visit"
                },
                {
                  en: "visiting",
                  km: "visiting"
                }
              ],
              correctAnswer: "visited",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "pres-perf-vs-past-ex-2",
              question: {
                en: "She ___ never been to Cambodia.",
                km: "She ___ never been to Cambodia."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "has",
                  km: "has"
                },
                {
                  en: "have",
                  km: "have"
                },
                {
                  en: "did",
                  km: "did"
                },
                {
                  en: "was",
                  km: "was"
                }
              ],
              correctAnswer: "has",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "pres-perf-vs-past-ex-3",
              question: {
                en: "___ you eaten breakfast?",
                km: "___ you eaten breakfast?"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "Have",
                  km: "Have"
                },
                {
                  en: "Did",
                  km: "Did"
                },
                {
                  en: "Do",
                  km: "Do"
                },
                {
                  en: "Are",
                  km: "Are"
                }
              ],
              correctAnswer: "Have",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "pres-perf-vs-past-ex-4",
              question: {
                en: "They ___ to PP in 2019.",
                km: "They ___ to PP in 2019."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "moved",
                  km: "moved"
                },
                {
                  en: "have moved",
                  km: "have moved"
                },
                {
                  en: "move",
                  km: "move"
                },
                {
                  en: "moving",
                  km: "moving"
                }
              ],
              correctAnswer: "moved",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "pres-perf-vs-past-ex-5",
              question: {
                en: "I ___ not seen him since Monday.",
                km: "I ___ not seen him since Monday."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "have",
                  km: "have"
                },
                {
                  en: "did",
                  km: "did"
                },
                {
                  en: "do",
                  km: "do"
                },
                {
                  en: "am",
                  km: "am"
                }
              ],
              correctAnswer: "have",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          homework: [
            {
              id: "pres-perf-vs-past-hw-1",
              instruction: {
                en: "Write 5 pairs: Past Simple vs Present Perfect",
                km: "Write 5 pairs: Past Simple vs Present Perfect"
              }
            },
            {
              id: "pres-perf-vs-past-hw-2",
              instruction: {
                en: "Write about your experiences using PP",
                km: "Write about your experiences using PP"
              }
            }
          ],
          quiz: [
            {
              id: "pres-perf-vs-past-q-1",
              question: {
                en: "I ___ a good movie last night.",
                km: "I ___ a good movie last night."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "saw",
                  km: "saw"
                },
                {
                  en: "have seen",
                  km: "have seen"
                },
                {
                  en: "see",
                  km: "see"
                },
                {
                  en: "seeing",
                  km: "seeing"
                }
              ],
              correctAnswer: "saw",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "pres-perf-vs-past-q-2",
              question: {
                en: "They ___ in SR since 2018.",
                km: "They ___ in SR since 2018."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "have lived",
                  km: "have lived"
                },
                {
                  en: "lived",
                  km: "lived"
                },
                {
                  en: "live",
                  km: "live"
                },
                {
                  en: "are living",
                  km: "are living"
                }
              ],
              correctAnswer: "have lived",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "pres-perf-vs-past-q-3",
              question: {
                en: "She ___ not come to the party yesterday.",
                km: "She ___ not come to the party yesterday."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "did",
                  km: "did"
                },
                {
                  en: "has",
                  km: "has"
                },
                {
                  en: "does",
                  km: "does"
                },
                {
                  en: "is",
                  km: "is"
                }
              ],
              correctAnswer: "did",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          vocabularyIds: [
            "present-perfect",
            "past-simple",
            "specific-time",
            "experience",
            "yesterday",
            "for",
            "since"
          ]
        }
      ]
    },
    {
      id: "ch-2-modals-ability",
      title: {
        en: "Modals: Can, Could, Be able to",
        km: "កិរិយាស័ព្ទជំនួយ៖ Can, Could, Be able to"
      },
      lessons: [
        {
          id: "modals-ability",
          title: {
            en: "Can, Could, Be able to",
            km: "Can, Could, Be able to"
          },
          level: "intermediate",
          unitId: "unit-2",
          chapterId: "ch-2-modals-ability",
          order: 7,
          estimatedMinutes: 15,
          definition: {
            en: "Can = present ability. Could = past ability. Be able to = ability in any tense.",
            km: "Can = សមត្ថភាពបច្ចុប្បន្ន។ Could = អតីតកាល"
          },
          forms: {
            affirmative: {
              structure: "S + can/could + V | S + am/is/are/was/were + able to + V",
              examples: [
                {
                  en: "I can speak Khmer.",
                  km: "ខ្ញុំអាចនិយាយខ្មែរ"
                },
                {
                  en: "She could swim at 5.",
                  km: "នាងអាចហែលទឹកនៅអាយុ៥"
                },
                {
                  en: "He is able to drive.",
                  km: "គាត់អាចបើកឡាន"
                },
                {
                  en: "They will be able to come.",
                  km: "ពួកគេនឹងអាចមក"
                },
                {
                  en: "Can I open the window? (permission)",
                  km: "តើខ្ញុំអាចបើកបង្អួចបានទេ?"
                }
              ]
            },
            negative: {
              structure: "S + cannot/could not + V | S + be + not + able to + V",
              examples: [
                {
                  en: "I cannot speak Japanese.",
                  km: "ខ្ញុំមិនអាចនិយាយជប៉ុន"
                },
                {
                  en: "She could not swim.",
                  km: "នាងមិនអាចហែល"
                },
                {
                  en: "He is not able to drive.",
                  km: "គាត់មិនអាចបើកឡាន"
                }
              ]
            },
            question: {
              structure: "Can/Could + S + V? | Be + S + able to + V?",
              examples: [
                {
                  en: "Can you speak Khmer?",
                  km: "តើអ្នកអាចនិយាយខ្មែរបានទេ?"
                },
                {
                  en: "Could she swim?",
                  km: "តើនាងអាចហែលបានទេ?"
                },
                {
                  en: "Is he able to drive?",
                  km: "តើគាត់អាចបើកឡានបានទេ?"
                }
              ]
            }
          },
          commonMistakes: [
            {
              mistake: "He can to swim",
              correction: "He can swim",
              reason: {
                en: "No to after can",
                km: ""
              }
            }
          ],
          exercises: [
            {
              id: "modals-ability-ex-1",
              question: {
                en: "She ___ play guitar.",
                km: "She ___ play guitar."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "can",
                  km: "can"
                },
                {
                  en: "can to",
                  km: "can to"
                },
                {
                  en: "cans",
                  km: "cans"
                },
                {
                  en: "caning",
                  km: "caning"
                }
              ],
              correctAnswer: "can",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "modals-ability-ex-2",
              question: {
                en: "He ___ read when he was 3.",
                km: "He ___ read when he was 3."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "could",
                  km: "could"
                },
                {
                  en: "can",
                  km: "can"
                },
                {
                  en: "is able",
                  km: "is able"
                },
                {
                  en: "will can",
                  km: "will can"
                }
              ],
              correctAnswer: "could",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "modals-ability-ex-3",
              question: {
                en: "I can come -> I ___ come (negative)",
                km: "I can come -> I ___ come (negative)"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "cannot",
                  km: "cannot"
                },
                {
                  en: "can not to",
                  km: "can not to"
                },
                {
                  en: "dont can",
                  km: "dont can"
                },
                {
                  en: "am not",
                  km: "am not"
                }
              ],
              correctAnswer: "cannot",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "modals-ability-ex-4",
              question: {
                en: "___ you help me? (request)",
                km: "___ you help me? (request)"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "Can",
                  km: "Can"
                },
                {
                  en: "Will",
                  km: "Will"
                },
                {
                  en: "Are",
                  km: "Are"
                },
                {
                  en: "Do",
                  km: "Do"
                }
              ],
              correctAnswer: "Can",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "modals-ability-ex-5",
              question: {
                en: "She ___ attend tomorrow (future).",
                km: "She ___ attend tomorrow (future)."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "will be able to",
                  km: "will be able to"
                },
                {
                  en: "can",
                  km: "can"
                },
                {
                  en: "could",
                  km: "could"
                },
                {
                  en: "can to",
                  km: "can to"
                }
              ],
              correctAnswer: "will be able to",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          homework: [
            {
              id: "modals-ability-hw-1",
              instruction: {
                en: "Write 5 sentences about things you can/cannot do",
                km: "Write 5 sentences about things you can/cannot do"
              }
            },
            {
              id: "modals-ability-hw-2",
              instruction: {
                en: "Write 3 things you could do as a child",
                km: "Write 3 things you could do as a child"
              }
            }
          ],
          quiz: [
            {
              id: "modals-ability-q-1",
              question: {
                en: "I am from Cambodia. I ___ speak Khmer.",
                km: "I am from Cambodia. I ___ speak Khmer."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "can",
                  km: "can"
                },
                {
                  en: "can to",
                  km: "can to"
                },
                {
                  en: "must",
                  km: "must"
                },
                {
                  en: "was",
                  km: "was"
                }
              ],
              correctAnswer: "can",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "modals-ability-q-2",
              question: {
                en: "My grandfather ___ run fast when young.",
                km: "My grandfather ___ run fast when young."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "could",
                  km: "could"
                },
                {
                  en: "can",
                  km: "can"
                },
                {
                  en: "must",
                  km: "must"
                },
                {
                  en: "will",
                  km: "will"
                }
              ],
              correctAnswer: "could",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "modals-ability-q-3",
              question: {
                en: "___ I borrow your pen?",
                km: "___ I borrow your pen?"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "Can",
                  km: "Can"
                },
                {
                  en: "Do",
                  km: "Do"
                },
                {
                  en: "Am",
                  km: "Am"
                },
                {
                  en: "Have",
                  km: "Have"
                }
              ],
              correctAnswer: "Can",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          vocabularyIds: [
            "can",
            "could",
            "be-able-to",
            "ability",
            "permission",
            "speak",
            "swim",
            "drive"
          ]
        }
      ]
    },
    {
      id: "ch-2-modals-obligation",
      title: {
        en: "Modals: Must, Have to, Should",
        km: "កិរិយាស័ព្ទជំនួយ៖ Must, Have to, Should"
      },
      lessons: [
        {
          id: "modals-obligation",
          title: {
            en: "Must, Have to, Should",
            km: "Must, Have to, Should"
          },
          level: "intermediate",
          unitId: "unit-2",
          chapterId: "ch-2-modals-obligation",
          order: 8,
          estimatedMinutes: 15,
          definition: {
            en: "Must = strong obligation. Have to = external. Should = advice. Mustn't = prohibition. Don't have to = no necessity.",
            km: "Must = កាតព្វកិច្ចខ្លាំង។ Have to = ខាងក្រៅ។ Should = ដំបូន្មាន"
          },
          forms: {
            affirmative: {
              structure: "S + must/have to/should + V",
              examples: [
                {
                  en: "I must finish today.",
                  km: "ខ្ញុំត្រូវបញ្ចប់ថ្ងៃនេះ"
                },
                {
                  en: "She has to wear a uniform.",
                  km: "នាងត្រូវស្លៀកឯកសណ្ឋាន"
                },
                {
                  en: "You should eat vegetables.",
                  km: "អ្នកគួរញ៉ាំបន្លែ"
                },
                {
                  en: "We must be on time.",
                  km: "យើងត្រូវមកទាន់ពេល"
                },
                {
                  en: "He has to work Saturdays.",
                  km: "គាត់ត្រូវធ្វើការសៅរ៍"
                }
              ]
            },
            negative: {
              structure: "S + must not/don't have to/should not + V",
              examples: [
                {
                  en: "You must not smoke here.",
                  km: "អ្នកមិនត្រូវជក់បារី"
                },
                {
                  en: "She does not have to wear a suit.",
                  km: "នាងមិនចាំបាច់ស្លៀកឈុត"
                },
                {
                  en: "You should not eat too much sugar.",
                  km: "អ្នកមិនគួរញ៉ាំស្ករច្រើន"
                }
              ]
            },
            question: {
              structure: "Must/Should + S + V? Do + S + have to + V?",
              examples: [
                {
                  en: "Must I finish today?",
                  km: "តើខ្ញុំត្រូវបញ្ចប់ថ្ងៃនេះទេ?"
                },
                {
                  en: "Does she have to work?",
                  km: "តើនាងត្រូវធ្វើការទេ?"
                },
                {
                  en: "Should I eat more?",
                  km: "តើខ្ញុំគួរញ៉ាំច្រើនទេ?"
                }
              ]
            }
          },
          commonMistakes: [
            {
              mistake: "He musts go",
              correction: "He must go",
              reason: {
                en: "No s after must",
                km: ""
              }
            }
          ],
          exercises: [
            {
              id: "modals-obligation-ex-1",
              question: {
                en: "You ___ stop at the red light.",
                km: "You ___ stop at the red light."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "must",
                  km: "must"
                },
                {
                  en: "have",
                  km: "have"
                },
                {
                  en: "should",
                  km: "should"
                },
                {
                  en: "can",
                  km: "can"
                }
              ],
              correctAnswer: "must",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "modals-obligation-ex-2",
              question: {
                en: "She ___ wear a helmet - it's law.",
                km: "She ___ wear a helmet - it's law."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "has to",
                  km: "has to"
                },
                {
                  en: "musts",
                  km: "musts"
                },
                {
                  en: "must to",
                  km: "must to"
                },
                {
                  en: "have to",
                  km: "have to"
                }
              ],
              correctAnswer: "has to",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "modals-obligation-ex-3",
              question: {
                en: "You ___ try this dish (recommendation).",
                km: "You ___ try this dish (recommendation)."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "should",
                  km: "should"
                },
                {
                  en: "must",
                  km: "must"
                },
                {
                  en: "can",
                  km: "can"
                },
                {
                  en: "have to",
                  km: "have to"
                }
              ],
              correctAnswer: "should",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "modals-obligation-ex-4",
              question: {
                en: "We ___ wear a tie. It's optional.",
                km: "We ___ wear a tie. It's optional."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "don't have to",
                  km: "don't have to"
                },
                {
                  en: "mustn't",
                  km: "mustn't"
                },
                {
                  en: "shouldn't",
                  km: "shouldn't"
                },
                {
                  en: "can't",
                  km: "can't"
                }
              ],
              correctAnswer: "don't have to",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "modals-obligation-ex-5",
              question: {
                en: "You ___ park here. It's forbidden.",
                km: "You ___ park here. It's forbidden."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "mustn't",
                  km: "mustn't"
                },
                {
                  en: "don't have to",
                  km: "don't have to"
                },
                {
                  en: "shouldn't",
                  km: "shouldn't"
                },
                {
                  en: "can't",
                  km: "can't"
                }
              ],
              correctAnswer: "mustn't",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          homework: [
            {
              id: "modals-obligation-hw-1",
              instruction: {
                en: "Write 5 rules using must/mustn't/have to",
                km: "Write 5 rules using must/mustn't/have to"
              }
            },
            {
              id: "modals-obligation-hw-2",
              instruction: {
                en: "Write 3 advice to a visitor using should",
                km: "Write 3 advice to a visitor using should"
              }
            }
          ],
          quiz: [
            {
              id: "modals-obligation-q-1",
              question: {
                en: "You ___ brush your teeth (advice).",
                km: "You ___ brush your teeth (advice)."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "should",
                  km: "should"
                },
                {
                  en: "must",
                  km: "must"
                },
                {
                  en: "can",
                  km: "can"
                },
                {
                  en: "have",
                  km: "have"
                }
              ],
              correctAnswer: "should",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "modals-obligation-q-2",
              question: {
                en: "Children ___ go to school by law.",
                km: "Children ___ go to school by law."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "have to",
                  km: "have to"
                },
                {
                  en: "must",
                  km: "must"
                },
                {
                  en: "should",
                  km: "should"
                },
                {
                  en: "can",
                  km: "can"
                }
              ],
              correctAnswer: "have to",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "modals-obligation-q-3",
              question: {
                en: "You ___ tell lies - it's wrong.",
                km: "You ___ tell lies - it's wrong."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "mustn't",
                  km: "mustn't"
                },
                {
                  en: "don't have to",
                  km: "don't have to"
                },
                {
                  en: "shouldn't",
                  km: "shouldn't"
                },
                {
                  en: "can't",
                  km: "can't"
                }
              ],
              correctAnswer: "mustn't",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          vocabularyIds: [
            "must",
            "have-to",
            "should",
            "obligation",
            "advice",
            "prohibition"
          ]
        }
      ]
    },
    {
      id: "ch-2-gerunds-infinitives",
      title: {
        en: "Gerunds & Infinitives",
        km: "Gerund និង Infinitive"
      },
      lessons: [
        {
          id: "gerunds",
          title: {
            en: "Verb + Gerund",
            km: "កិរិយាស័ព្ទ + Gerund"
          },
          level: "intermediate",
          unitId: "unit-2",
          chapterId: "ch-2-gerunds-infinitives",
          order: 9,
          estimatedMinutes: 15,
          definition: {
            en: "Some verbs take gerund (-ing): enjoy, avoid, suggest, finish, practice, mind, consider, recommend.",
            km: "កិរិយាស័ព្ទខ្លះត្រូវការ gerund (-ing)"
          },
          forms: {
            affirmative: {
              structure: "S + V + gerund (-ing)",
              examples: [
                {
                  en: "I enjoy learning English.",
                  km: "ខ្ញុំចូលចិត្តរៀនអង់គ្លេស"
                },
                {
                  en: "She avoids eating junk food.",
                  km: "នាងចៀសវាងញ៉ាំអាហារឥតប្រយោជន៍"
                },
                {
                  en: "He suggested going to the park.",
                  km: "គាត់ស្នើទៅសួន"
                },
                {
                  en: "They finished working at 5.",
                  km: "ពួកគេបានបញ្ចប់ការងារ"
                },
                {
                  en: "Do you mind opening the window?",
                  km: "តើអ្នកយល់ទេបើខ្ញុំបើកបង្អួច?"
                }
              ]
            },
            negative: {
              structure: "S + V + not + gerund",
              examples: [
                {
                  en: "Do you mind not smoking?",
                  km: "តើអ្នកយល់ទេបើមិនជក់បារី"
                },
                {
                  en: "She avoids not being prepared.",
                  km: "នាងចៀសវាងមិនត្រៀមខ្លួន"
                }
              ]
            },
            question: {
              structure: "Aux + S + V + gerund?",
              examples: [
                {
                  en: "Do you enjoy learning English?",
                  km: "តើអ្នកចូលចិត្តរៀនអង់គ្លេសទេ?"
                },
                {
                  en: "Did he suggest going?",
                  km: "តើគាត់ស្នើទៅទេ?"
                }
              ]
            }
          },
          commonMistakes: [
            {
              mistake: "I enjoy to learn English",
              correction: "I enjoy learning English",
              reason: {
                en: "Enjoy takes gerund, not infinitive",
                km: ""
              }
            }
          ],
          exercises: [
            {
              id: "gerunds-ex-1",
              question: {
                en: "I enjoy ___ swimming.",
                km: "I enjoy ___ swimming."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "to swim",
                  km: "to swim"
                },
                {
                  en: "swimming",
                  km: "swimming"
                },
                {
                  en: "swim",
                  km: "swim"
                },
                {
                  en: "swam",
                  km: "swam"
                }
              ],
              correctAnswer: "swimming",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "gerunds-ex-2",
              question: {
                en: "She suggested ___ to the cinema.",
                km: "She suggested ___ to the cinema."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "to go",
                  km: "to go"
                },
                {
                  en: "going",
                  km: "going"
                },
                {
                  en: "go",
                  km: "go"
                },
                {
                  en: "went",
                  km: "went"
                }
              ],
              correctAnswer: "going",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "gerunds-ex-3",
              question: {
                en: "Do you mind ___ for a moment?",
                km: "Do you mind ___ for a moment?"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "to wait",
                  km: "to wait"
                },
                {
                  en: "waiting",
                  km: "waiting"
                },
                {
                  en: "wait",
                  km: "wait"
                },
                {
                  en: "waited",
                  km: "waited"
                }
              ],
              correctAnswer: "waiting",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "gerunds-ex-4",
              question: {
                en: "He avoids ___ spicy food.",
                km: "He avoids ___ spicy food."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "to eat",
                  km: "to eat"
                },
                {
                  en: "eating",
                  km: "eating"
                },
                {
                  en: "eat",
                  km: "eat"
                },
                {
                  en: "ate",
                  km: "ate"
                }
              ],
              correctAnswer: "eating",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "gerunds-ex-5",
              question: {
                en: "They finished ___ the house.",
                km: "They finished ___ the house."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "to build",
                  km: "to build"
                },
                {
                  en: "building",
                  km: "building"
                },
                {
                  en: "build",
                  km: "build"
                },
                {
                  en: "built",
                  km: "built"
                }
              ],
              correctAnswer: "building",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          homework: [
            {
              id: "gerunds-hw-1",
              instruction: {
                en: "Write 5 sentences using verbs that take gerund",
                km: "Write 5 sentences using verbs that take gerund"
              }
            },
            {
              id: "gerunds-hw-2",
              instruction: {
                en: "Write 3 Do you mind + gerund questions",
                km: "Write 3 Do you mind + gerund questions"
              }
            }
          ],
          quiz: [
            {
              id: "gerunds-q-1",
              question: {
                en: "I enjoy ___ Khmer literature.",
                km: "I enjoy ___ Khmer literature."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "to read",
                  km: "to read"
                },
                {
                  en: "reading",
                  km: "reading"
                },
                {
                  en: "read",
                  km: "read"
                },
                {
                  en: "reads",
                  km: "reads"
                }
              ],
              correctAnswer: "reading",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "gerunds-q-2",
              question: {
                en: "She avoided ___ the question.",
                km: "She avoided ___ the question."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "to answer",
                  km: "to answer"
                },
                {
                  en: "answering",
                  km: "answering"
                },
                {
                  en: "answer",
                  km: "answer"
                },
                {
                  en: "answered",
                  km: "answered"
                }
              ],
              correctAnswer: "answering",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          vocabularyIds: [
            "gerund",
            "-ing",
            "enjoy",
            "avoid",
            "suggest",
            "finish",
            "mind"
          ]
        },
        {
          id: "infinitives",
          title: {
            en: "Verb + To-Infinitive",
            km: "កិរិយាស័ព្ទ + To-Infinitive"
          },
          level: "intermediate",
          unitId: "unit-2",
          chapterId: "ch-2-gerunds-infinitives",
          order: 10,
          estimatedMinutes: 15,
          definition: {
            en: "Some verbs take to-infinitive: want, need, hope, plan, decide, promise, agree, refuse, learn.",
            km: "កិរិយាស័ព្ទខ្លះត្រូវការ to-infinitive"
          },
          forms: {
            affirmative: {
              structure: "S + V + to-infinitive",
              examples: [
                {
                  en: "I want to learn Khmer.",
                  km: "ខ្ញុំចង់រៀនខ្មែរ"
                },
                {
                  en: "She needs to buy groceries.",
                  km: "នាងត្រូវការទិញគ្រឿងទេស"
                },
                {
                  en: "They hope to visit Angkor Wat.",
                  km: "ពួកគេសង្ឃឹមទៅលេងអង្គរវត្ត"
                },
                {
                  en: "He decided to move to PP.",
                  km: "គាត់សម្រេចចិត្តផ្លាស់ទៅភ្នំពេញ"
                },
                {
                  en: "We plan to travel next month.",
                  km: "យើងគ្រោងធ្វើដំណើរខែក្រោយ"
                }
              ]
            },
            negative: {
              structure: "S + V + not + to-infinitive",
              examples: [
                {
                  en: "I decided not to go.",
                  km: "ខ្ញុំសម្រេចចិត្តមិនទៅ"
                },
                {
                  en: "He refused to help.",
                  km: "គាត់បដិសេធមិនជួយ"
                },
                {
                  en: "She promised not to tell.",
                  km: "នាងសន្យាមិនប្រាប់"
                }
              ]
            },
            question: {
              structure: "Aux + S + V + to-infinitive?",
              examples: [
                {
                  en: "Do you want to learn Khmer?",
                  km: "តើអ្នកចង់រៀនខ្មែរទេ?"
                },
                {
                  en: "Does she need to go?",
                  km: "តើនាងត្រូវការទៅទេ?"
                },
                {
                  en: "What do you hope to do?",
                  km: "តើអ្នកសង្ឃឹមធ្វើអ្វី?"
                }
              ]
            }
          },
          commonMistakes: [
            {
              mistake: "I want learning Khmer",
              correction: "I want to learn Khmer",
              reason: {
                en: "Want takes to-infinitive",
                km: ""
              }
            }
          ],
          exercises: [
            {
              id: "infinitives-ex-1",
              question: {
                en: "I want ___ Khmer.",
                km: "I want ___ Khmer."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "to learn",
                  km: "to learn"
                },
                {
                  en: "learning",
                  km: "learning"
                },
                {
                  en: "learn",
                  km: "learn"
                },
                {
                  en: "learned",
                  km: "learned"
                }
              ],
              correctAnswer: "to learn",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "infinitives-ex-2",
              question: {
                en: "She decided ___ to PP.",
                km: "She decided ___ to PP."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "to move",
                  km: "to move"
                },
                {
                  en: "moving",
                  km: "moving"
                },
                {
                  en: "move",
                  km: "move"
                },
                {
                  en: "moved",
                  km: "moved"
                }
              ],
              correctAnswer: "to move",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "infinitives-ex-3",
              question: {
                en: "He refused ___ us.",
                km: "He refused ___ us."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "to help",
                  km: "to help"
                },
                {
                  en: "helping",
                  km: "helping"
                },
                {
                  en: "help",
                  km: "help"
                },
                {
                  en: "helped",
                  km: "helped"
                }
              ],
              correctAnswer: "to help",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "infinitives-ex-4",
              question: {
                en: "They agreed ___ early.",
                km: "They agreed ___ early."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "to come",
                  km: "to come"
                },
                {
                  en: "coming",
                  km: "coming"
                },
                {
                  en: "come",
                  km: "come"
                },
                {
                  en: "came",
                  km: "came"
                }
              ],
              correctAnswer: "to come",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "infinitives-ex-5",
              question: {
                en: "I hope ___ you again.",
                km: "I hope ___ you again."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "to see",
                  km: "to see"
                },
                {
                  en: "seeing",
                  km: "seeing"
                },
                {
                  en: "see",
                  km: "see"
                },
                {
                  en: "saw",
                  km: "saw"
                }
              ],
              correctAnswer: "to see",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          homework: [
            {
              id: "infinitives-hw-1",
              instruction: {
                en: "Write 5 sentences using want/need/hope/plan + to-infinitive",
                km: "Write 5 sentences using want/need/hope/plan + to-infinitive"
              }
            },
            {
              id: "infinitives-hw-2",
              instruction: {
                en: "Write 3 negative sentences with not to",
                km: "Write 3 negative sentences with not to"
              }
            }
          ],
          quiz: [
            {
              id: "infinitives-q-1",
              question: {
                en: "I need ___ some rice.",
                km: "I need ___ some rice."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "to buy",
                  km: "to buy"
                },
                {
                  en: "buying",
                  km: "buying"
                },
                {
                  en: "buy",
                  km: "buy"
                },
                {
                  en: "bought",
                  km: "bought"
                }
              ],
              correctAnswer: "to buy",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "infinitives-q-2",
              question: {
                en: "They plan ___ SR next year.",
                km: "They plan ___ SR next year."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "to visit",
                  km: "to visit"
                },
                {
                  en: "visiting",
                  km: "visiting"
                },
                {
                  en: "visit",
                  km: "visit"
                },
                {
                  en: "visited",
                  km: "visited"
                }
              ],
              correctAnswer: "to visit",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "infinitives-q-3",
              question: {
                en: "She promised ___ tell anyone.",
                km: "She promised ___ tell anyone."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "not to",
                  km: "not to"
                },
                {
                  en: "to not",
                  km: "to not"
                },
                {
                  en: "not telling",
                  km: "not telling"
                },
                {
                  en: "not tell",
                  km: "not tell"
                }
              ],
              correctAnswer: "not to",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          vocabularyIds: [
            "to-infinitive",
            "want",
            "need",
            "hope",
            "plan",
            "decide",
            "promise"
          ]
        }
      ]
    },
    {
      id: "ch-2-conditionals",
      title: {
        en: "Conditionals",
        km: "លក្ខខ័ណ្ឌ"
      },
      lessons: [
        {
          id: "zero-first-conditional",
          title: {
            en: "Zero & First Conditional",
            km: "លក្ខខ័ណ្ឌទីសូន្យ និងទីមួយ"
          },
          level: "intermediate",
          unitId: "unit-2",
          chapterId: "ch-2-conditionals",
          order: 11,
          estimatedMinutes: 20,
          definition: {
            en: "Zero: if + present, present (general truth). First: if + present, will + V (real possibility).",
            km: "Zero: if + បច្ចុប្បន្ន, បច្ចុប្បន្ន (ការពិត)។ First: if + បច្ចុប្បន្ន, will + V (លទ្ធភាព)"
          },
          forms: {
            affirmative: {
              structure: "Zero: if+presents, present | First: if+present, will+V",
              examples: [
                {
                  en: "If you heat ice, it melts.",
                  km: "បើកម្តៅទឹកកក វារលាយ"
                },
                {
                  en: "If it rains, the ground gets wet.",
                  km: "បើភ្លៀង ដីសើម"
                },
                {
                  en: "If I study, I will pass.",
                  km: "បើខ្ញុំរៀន ខ្ញុំនឹងប្រលងជាប់"
                },
                {
                  en: "If she calls, I will tell her.",
                  km: "បើនាងទូរស័ព្ទ ខ្ញុំនឹងប្រាប់"
                },
                {
                  en: "If you don't hurry, you will miss the bus.",
                  km: "បើមិនប្រញាប់ អ្នកនឹងខកឡានក្រុង"
                }
              ]
            },
            negative: {
              structure: "Zero: if+present negative | First: if+present+not, won't+V",
              examples: [
                {
                  en: "If you don't heat ice, it doesn't melt.",
                  km: "បើមិនកម្តៅ វាមិនរលាយ"
                },
                {
                  en: "If I don't study, I will not pass.",
                  km: "បើមិនរៀន ខ្ញុំនឹងមិនជាប់"
                },
                {
                  en: "If she doesn't call, I won't tell her.",
                  km: "បើនាងមិនទូរស័ព្ទ ខ្ញុំនឹងមិនប្រាប់"
                }
              ]
            },
            question: {
              structure: "If+present, will+S+V?",
              examples: [
                {
                  en: "What happens if you heat ice?",
                  km: "តើមានអ្វីកើតឡើងបើកម្តៅទឹកកក?"
                },
                {
                  en: "If I study, will I pass?",
                  km: "បើខ្ញុំរៀន តើខ្ញុំនឹងជាប់ទេ?"
                },
                {
                  en: "What will you do if it rains?",
                  km: "តើអ្នកនឹងធ្វើអ្វីបើភ្លៀង?"
                }
              ]
            }
          },
          commonMistakes: [
            {
              mistake: "If I will study, I will pass",
              correction: "If I study, I will pass",
              reason: {
                en: "No will after if in condition clause",
                km: ""
              }
            }
          ],
          exercises: [
            {
              id: "zero-first-ex-1",
              question: {
                en: "If you ___ water to 100C it boils.",
                km: "If you ___ water to 100C it boils."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "heat",
                  km: "heat"
                },
                {
                  en: "will heat",
                  km: "will heat"
                },
                {
                  en: "heated",
                  km: "heated"
                },
                {
                  en: "heating",
                  km: "heating"
                }
              ],
              correctAnswer: "heat",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "zero-first-ex-2",
              question: {
                en: "If it rains, I ___ home.",
                km: "If it rains, I ___ home."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "stay",
                  km: "stay"
                },
                {
                  en: "will stay",
                  km: "will stay"
                },
                {
                  en: "stayed",
                  km: "stayed"
                },
                {
                  en: "am staying",
                  km: "am staying"
                }
              ],
              correctAnswer: "will stay",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "zero-first-ex-3",
              question: {
                en: "If she doesn't hurry, she ___ miss the bus.",
                km: "If she doesn't hurry, she ___ miss the bus."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "will",
                  km: "will"
                },
                {
                  en: "misses",
                  km: "misses"
                },
                {
                  en: "missed",
                  km: "missed"
                },
                {
                  en: "is missing",
                  km: "is missing"
                }
              ],
              correctAnswer: "will",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "zero-first-ex-4",
              question: {
                en: "If you ___ water plants, they die.",
                km: "If you ___ water plants, they die."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "don't",
                  km: "don't"
                },
                {
                  en: "won't",
                  km: "won't"
                },
                {
                  en: "didn't",
                  km: "didn't"
                },
                {
                  en: "aren't",
                  km: "aren't"
                }
              ],
              correctAnswer: "don't",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "zero-first-ex-5",
              question: {
                en: "___ you study, you will fail.",
                km: "___ you study, you will fail."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "If",
                  km: "If"
                },
                {
                  en: "Unless",
                  km: "Unless"
                },
                {
                  en: "Because",
                  km: "Because"
                },
                {
                  en: "When",
                  km: "When"
                }
              ],
              correctAnswer: "If",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          homework: [
            {
              id: "zero-first-hw-1",
              instruction: {
                en: "Write 3 zero conditional sentences about scientific facts",
                km: "Write 3 zero conditional sentences about scientific facts"
              }
            },
            {
              id: "zero-first-hw-2",
              instruction: {
                en: "Write 3 first conditional about future plans",
                km: "Write 3 first conditional about future plans"
              }
            }
          ],
          quiz: [
            {
              id: "zero-first-q-1",
              question: {
                en: "Zero conditional describes:",
                km: "Zero conditional describes:"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "general truths",
                  km: "general truths"
                },
                {
                  en: "imaginary situations",
                  km: "imaginary situations"
                },
                {
                  en: "past events",
                  km: "past events"
                },
                {
                  en: "polite requests",
                  km: "polite requests"
                }
              ],
              correctAnswer: "general truths",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "zero-first-q-2",
              question: {
                en: "If I ___ time, I will help you.",
                km: "If I ___ time, I will help you."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "have",
                  km: "have"
                },
                {
                  en: "will have",
                  km: "will have"
                },
                {
                  en: "had",
                  km: "had"
                },
                {
                  en: "having",
                  km: "having"
                }
              ],
              correctAnswer: "have",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "zero-first-q-3",
              question: {
                en: "If you heat ice, it ___.",
                km: "If you heat ice, it ___."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "melts",
                  km: "melts"
                },
                {
                  en: "will melt",
                  km: "will melt"
                },
                {
                  en: "melted",
                  km: "melted"
                },
                {
                  en: "is melting",
                  km: "is melting"
                }
              ],
              correctAnswer: "melts",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          vocabularyIds: [
            "zero-conditional",
            "first-conditional",
            "if",
            "unless",
            "general-truth",
            "future"
          ]
        },
        {
          id: "second-third-conditional",
          title: {
            en: "Second & Third Conditional",
            km: "លក្ខខ័ណ្ឌទីពីរ និងទីបី"
          },
          level: "intermediate",
          unitId: "unit-2",
          chapterId: "ch-2-conditionals",
          order: 12,
          estimatedMinutes: 20,
          definition: {
            en: "Second: if + past, would + V (unreal present/future). Third: if + past perfect, would have + V3 (unreal past).",
            km: "Second: if + past, would + V (មិនពិតបច្ចុប្បន្ន)។ Third: if + past perfect, would have + V3 (មិនពិតអតីតកាល)"
          },
          forms: {
            affirmative: {
              structure: "Second: if+past, would+V | Third: if+past perfect, would have+V3",
              examples: [
                {
                  en: "If I had a car, I would drive.",
                  km: "បើខ្ញុំមានឡាន ខ្ញុំនឹងបើក"
                },
                {
                  en: "If I were rich, I would travel.",
                  km: "បើខ្ញុំមានលុយច្រើន ខ្ញុំនឹងធ្វើដំណើរ"
                },
                {
                  en: "If I had studied, I would have passed.",
                  km: "បើខ្ញុំបានរៀន ខ្ញុំនឹងបានជាប់"
                },
                {
                  en: "If she had called, I would have come.",
                  km: "បើនាងបានទូរស័ព្ទ ខ្ញុំនឹងបានមក"
                }
              ]
            },
            negative: {
              structure: "Second: if+past, wouldn't+V | Third: if+past perfect, wouldn't have+V3",
              examples: [
                {
                  en: "If I didn't have a car, I wouldn't drive.",
                  km: "បើខ្ញុំគ្មានឡាន ខ្ញុំនឹងមិនបើក"
                },
                {
                  en: "If I hadn't studied, I wouldn't have passed.",
                  km: "បើខ្ញុំមិនបានរៀន ខ្ញុំនឹងមិនបានជាប់"
                }
              ]
            },
            question: {
              structure: "Would+S+V if? / Would+S+have+V3 if?",
              examples: [
                {
                  en: "If you had a car, would you drive?",
                  km: "បើអ្នកមានឡាន តើនឹងបើកទេ?"
                },
                {
                  en: "If you had studied, would you have passed?",
                  km: "បើអ្នកបានរៀន តើនឹងបានជាប់ទេ?"
                }
              ]
            }
          },
          commonMistakes: [
            {
              mistake: "If I would have a car, I would drive",
              correction: "If I had a car, I would drive",
              reason: {
                en: "No would after if",
                km: ""
              }
            }
          ],
          exercises: [
            {
              id: "second-third-ex-1",
              question: {
                en: "If I ___ a million dollars, I would buy a house.",
                km: "If I ___ a million dollars, I would buy a house."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "had",
                  km: "had"
                },
                {
                  en: "would have",
                  km: "would have"
                },
                {
                  en: "have",
                  km: "have"
                },
                {
                  en: "having",
                  km: "having"
                }
              ],
              correctAnswer: "had",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "second-third-ex-2",
              question: {
                en: "If she ___ harder, she would have passed.",
                km: "If she ___ harder, she would have passed."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "had studied",
                  km: "had studied"
                },
                {
                  en: "studied",
                  km: "studied"
                },
                {
                  en: "has studied",
                  km: "has studied"
                },
                {
                  en: "would study",
                  km: "would study"
                }
              ],
              correctAnswer: "had studied",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "second-third-ex-3",
              question: {
                en: "If I were you, I ___ accept the offer.",
                km: "If I were you, I ___ accept the offer."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "would",
                  km: "would"
                },
                {
                  en: "accepted",
                  km: "accepted"
                },
                {
                  en: "accept",
                  km: "accept"
                },
                {
                  en: "am accepting",
                  km: "am accepting"
                }
              ],
              correctAnswer: "would",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "second-third-ex-4",
              question: {
                en: "If they ___ earlier, they would have caught it.",
                km: "If they ___ earlier, they would have caught it."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "had left",
                  km: "had left"
                },
                {
                  en: "left",
                  km: "left"
                },
                {
                  en: "have left",
                  km: "have left"
                },
                {
                  en: "would leave",
                  km: "would leave"
                }
              ],
              correctAnswer: "had left",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "second-third-ex-5",
              question: {
                en: "If I had known, I ___ come.",
                km: "If I had known, I ___ come."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "would have",
                  km: "would have"
                },
                {
                  en: "would",
                  km: "would"
                },
                {
                  en: "came",
                  km: "came"
                },
                {
                  en: "had come",
                  km: "had come"
                }
              ],
              correctAnswer: "would have",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          homework: [
            {
              id: "second-third-hw-1",
              instruction: {
                en: "Write 3 second conditional about imaginary situations",
                km: "Write 3 second conditional about imaginary situations"
              }
            },
            {
              id: "second-third-hw-2",
              instruction: {
                en: "Write 3 third conditional about past regrets",
                km: "Write 3 third conditional about past regrets"
              }
            }
          ],
          quiz: [
            {
              id: "second-third-q-1",
              question: {
                en: "If I ___ a bird, I would fly.",
                km: "If I ___ a bird, I would fly."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "were",
                  km: "were"
                },
                {
                  en: "am",
                  km: "am"
                },
                {
                  en: "was",
                  km: "was"
                },
                {
                  en: "be",
                  km: "be"
                }
              ],
              correctAnswer: "were",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "second-third-q-2",
              question: {
                en: "If you had told me, I ___ helped.",
                km: "If you had told me, I ___ helped."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "would have",
                  km: "would have"
                },
                {
                  en: "would",
                  km: "would"
                },
                {
                  en: "help",
                  km: "help"
                },
                {
                  en: "had",
                  km: "had"
                }
              ],
              correctAnswer: "would have",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "second-third-q-3",
              question: {
                en: "If I ___ about the party, I would have gone.",
                km: "If I ___ about the party, I would have gone."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "had known",
                  km: "had known"
                },
                {
                  en: "knew",
                  km: "knew"
                },
                {
                  en: "know",
                  km: "know"
                },
                {
                  en: "have known",
                  km: "have known"
                }
              ],
              correctAnswer: "had known",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          vocabularyIds: [
            "second-conditional",
            "third-conditional",
            "unreal",
            "imaginary",
            "would",
            "had"
          ]
        }
      ]
    },
    {
      id: "ch-2-passive",
      title: {
        en: "Passive Voice",
        km: "សំឡេងកម្មករិតៈ"
      },
      lessons: [
        {
          id: "passive-present-past",
          title: {
            en: "Passive: Present & Past",
            km: "សំឡេងកម្មករិតៈ៖ បច្ចុប្បន្ន និងអតីតកាល"
          },
          level: "intermediate",
          unitId: "unit-2",
          chapterId: "ch-2-passive",
          order: 13,
          estimatedMinutes: 20,
          definition: {
            en: "Passive = S + be + V3. Present: am/is/are + V3. Past: was/were + V3. By + agent (optional).",
            km: "Passive = S + be + V3។ បច្ចុប្បន្ន៖ am/is/are + V3។ អតីតកាល៖ was/were + V3"
          },
          forms: {
            affirmative: {
              structure: "Present: S+am/is/are+V3 | Past: S+was/were+V3",
              examples: [
                {
                  en: "English is spoken in Cambodia.",
                  km: "អង់គ្លេសត្រូវបានគេនិយាយនៅកម្ពុជា"
                },
                {
                  en: "Rice is grown in SR.",
                  km: "ស្រូវត្រូវបានដាំនៅសៀមរាប"
                },
                {
                  en: "Angkor Wat was built in 12th century.",
                  km: "អង្គរវត្តត្រូវបានសាងសង់ក្នុងសតវត្សទី១២"
                },
                {
                  en: "The window was broken.",
                  km: "បង្អួចត្រូវបានបាក់"
                },
                {
                  en: "These are made in Cambodia.",
                  km: "ទាំងនេះផលិតនៅកម្ពុជា"
                }
              ]
            },
            negative: {
              structure: "Present: S+am/is/are+not+V3 | Past: S+was/were+not+V3",
              examples: [
                {
                  en: "English is not spoken here.",
                  km: "អង់គ្លេសមិនត្រូវបានគេនិយាយទីនេះ"
                },
                {
                  en: "It was not broken.",
                  km: "វាមិនត្រូវបានបាក់"
                },
                {
                  en: "They are not invited.",
                  km: "ពួកគេមិនត្រូវបានអញ្ជើញ"
                }
              ]
            },
            question: {
              structure: "Am/Is/Are+S+V3? | Was/Were+S+V3?",
              examples: [
                {
                  en: "Is English spoken here?",
                  km: "តើអង់គ្លេសត្រូវបានគេនិយាយទីនេះទេ?"
                },
                {
                  en: "Was it built in 1100?",
                  km: "តើវាត្រូវបានសាងសង់ក្នុងឆ្នាំ១១០០ទេ?"
                },
                {
                  en: "Are these made here?",
                  km: "តើទាំងនេះផលិតនៅទីនេះទេ?"
                }
              ]
            }
          },
          commonMistakes: [
            {
              mistake: "The window was broke",
              correction: "The window was broken",
              reason: {
                en: "Use past participle (V3)",
                km: ""
              }
            }
          ],
          exercises: [
            {
              id: "passive-pres-past-ex-1",
              question: {
                en: "Coffee ___ in Vietnam.",
                km: "Coffee ___ in Vietnam."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "is grown",
                  km: "is grown"
                },
                {
                  en: "grows",
                  km: "grows"
                },
                {
                  en: "grew",
                  km: "grew"
                },
                {
                  en: "is growing",
                  km: "is growing"
                }
              ],
              correctAnswer: "is grown",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "passive-pres-past-ex-2",
              question: {
                en: "The car ___ yesterday.",
                km: "The car ___ yesterday."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "was repaired",
                  km: "was repaired"
                },
                {
                  en: "was repair",
                  km: "was repair"
                },
                {
                  en: "repaired",
                  km: "repaired"
                },
                {
                  en: "is repaired",
                  km: "is repaired"
                }
              ],
              correctAnswer: "was repaired",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "passive-pres-past-ex-3",
              question: {
                en: "These books ___ in Khmer.",
                km: "These books ___ in Khmer."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "are written",
                  km: "are written"
                },
                {
                  en: "are write",
                  km: "are write"
                },
                {
                  en: "write",
                  km: "write"
                },
                {
                  en: "wrote",
                  km: "wrote"
                }
              ],
              correctAnswer: "are written",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "passive-pres-past-ex-4",
              question: {
                en: "The letter ___ last week.",
                km: "The letter ___ last week."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "was sent",
                  km: "was sent"
                },
                {
                  en: "sent",
                  km: "sent"
                },
                {
                  en: "is sent",
                  km: "is sent"
                },
                {
                  en: "sends",
                  km: "sends"
                }
              ],
              correctAnswer: "was sent",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "passive-pres-past-ex-5",
              question: {
                en: "___ English taught at your school?",
                km: "___ English taught at your school?"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "Is",
                  km: "Is"
                },
                {
                  en: "Does",
                  km: "Does"
                },
                {
                  en: "Do",
                  km: "Do"
                },
                {
                  en: "Are",
                  km: "Are"
                }
              ],
              correctAnswer: "Is",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          homework: [
            {
              id: "passive-pres-past-hw-1",
              instruction: {
                en: "Rewrite 5 active sentences to passive",
                km: "Rewrite 5 active sentences to passive"
              }
            },
            {
              id: "passive-pres-past-hw-2",
              instruction: {
                en: "Describe how things are made in passive",
                km: "Describe how things are made in passive"
              }
            }
          ],
          quiz: [
            {
              id: "passive-pres-past-q-1",
              question: {
                en: "Active: chef cooks. Passive: Dinner ___ by chef.",
                km: "Active: chef cooks. Passive: Dinner ___ by chef."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "is cooked",
                  km: "is cooked"
                },
                {
                  en: "cooks",
                  km: "cooks"
                },
                {
                  en: "was cooked",
                  km: "was cooked"
                },
                {
                  en: "is cooking",
                  km: "is cooking"
                }
              ],
              correctAnswer: "is cooked",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "passive-pres-past-q-2",
              question: {
                en: "The temple ___ in 1100.",
                km: "The temple ___ in 1100."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "was built",
                  km: "was built"
                },
                {
                  en: "was build",
                  km: "was build"
                },
                {
                  en: "built",
                  km: "built"
                },
                {
                  en: "builded",
                  km: "builded"
                }
              ],
              correctAnswer: "was built",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "passive-pres-past-q-3",
              question: {
                en: "These shirts ___ in Cambodia.",
                km: "These shirts ___ in Cambodia."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "are made",
                  km: "are made"
                },
                {
                  en: "are making",
                  km: "are making"
                },
                {
                  en: "make",
                  km: "make"
                },
                {
                  en: "made",
                  km: "made"
                }
              ],
              correctAnswer: "are made",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          vocabularyIds: [
            "passive-voice",
            "present-passive",
            "past-passive",
            "be",
            "past-participle"
          ]
        },
        {
          id: "passive-future-perfect",
          title: {
            en: "Passive: Future & Present Perfect",
            km: "សំឡេងកម្មករិតៈ៖ អនាគត និង Present Perfect"
          },
          level: "intermediate",
          unitId: "unit-2",
          chapterId: "ch-2-passive",
          order: 14,
          estimatedMinutes: 20,
          definition: {
            en: "Future passive: will be + V3. Present perfect passive: have/has been + V3.",
            km: "Future passive: will be + V3។ Present perfect passive: have/has been + V3"
          },
          forms: {
            affirmative: {
              structure: "Future: will be + V3 | PP: have/has been + V3",
              examples: [
                {
                  en: "The meeting will be held next week.",
                  km: "កិច្ចប្រជុំនឹងត្រូវបានប្រារព្ធ"
                },
                {
                  en: "The report will be finished by Friday.",
                  km: "របាយការណ៍នឹងត្រូវបានបញ្ចប់"
                },
                {
                  en: "Angkor Wat has been visited by millions.",
                  km: "អង្គរវត្តត្រូវបានទស្សនា"
                },
                {
                  en: "The work has been completed.",
                  km: "ការងារត្រូវបានបញ្ចប់"
                },
                {
                  en: "The bridge will be opened next year.",
                  km: "ស្ពាននឹងត្រូវបានបើក"
                }
              ]
            },
            negative: {
              structure: "Future: won't be + V3 | PP: have/has not been + V3",
              examples: [
                {
                  en: "The meeting will not be held.",
                  km: "កិច្ចប្រជុំនឹងមិនត្រូវបានប្រារព្ធ"
                },
                {
                  en: "The work has not been completed.",
                  km: "ការងារមិនទាន់ត្រូវបានបញ្ចប់"
                }
              ]
            },
            question: {
              structure: "Will+S+be+V3? | Have/Has+S+been+V3?",
              examples: [
                {
                  en: "Will the meeting be held?",
                  km: "តើកិច្ចប្រជុំនឹងត្រូវបានប្រារព្ធទេ?"
                },
                {
                  en: "Has the work been completed?",
                  km: "តើការងារត្រូវបានបញ្ចប់ហើយឬនៅ?"
                }
              ]
            }
          },
          commonMistakes: [
            {
              mistake: "The report will finished",
              correction: "The report will be finished",
              reason: {
                en: "Include be in future passive",
                km: ""
              }
            }
          ],
          exercises: [
            {
              id: "passive-future-ex-1",
              question: {
                en: "The school ___ built next year.",
                km: "The school ___ built next year."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "will be",
                  km: "will be"
                },
                {
                  en: "will",
                  km: "will"
                },
                {
                  en: "is",
                  km: "is"
                },
                {
                  en: "was",
                  km: "was"
                }
              ],
              correctAnswer: "will be",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "passive-future-ex-2",
              question: {
                en: "The exam ___ been finished already.",
                km: "The exam ___ been finished already."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "has",
                  km: "has"
                },
                {
                  en: "have",
                  km: "have"
                },
                {
                  en: "was",
                  km: "was"
                },
                {
                  en: "will be",
                  km: "will be"
                }
              ],
              correctAnswer: "has",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "passive-future-ex-3",
              question: {
                en: "All tickets ___ been sold.",
                km: "All tickets ___ been sold."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "have",
                  km: "have"
                },
                {
                  en: "has",
                  km: "has"
                },
                {
                  en: "are",
                  km: "are"
                },
                {
                  en: "were",
                  km: "were"
                }
              ],
              correctAnswer: "have",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "passive-future-ex-4",
              question: {
                en: "Docs ___ sent tomorrow.",
                km: "Docs ___ sent tomorrow."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "will be",
                  km: "will be"
                },
                {
                  en: "will be send",
                  km: "will be send"
                },
                {
                  en: "will send",
                  km: "will send"
                },
                {
                  en: "are sent",
                  km: "are sent"
                }
              ],
              correctAnswer: "will be",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "passive-future-ex-5",
              question: {
                en: "___ the package been delivered?",
                km: "___ the package been delivered?"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "Has",
                  km: "Has"
                },
                {
                  en: "Have",
                  km: "Have"
                },
                {
                  en: "Is",
                  km: "Is"
                },
                {
                  en: "Was",
                  km: "Was"
                }
              ],
              correctAnswer: "Has",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          homework: [
            {
              id: "passive-future-hw-1",
              instruction: {
                en: "Write 3 future passive and 3 present perfect passive",
                km: "Write 3 future passive and 3 present perfect passive"
              }
            },
            {
              id: "passive-future-hw-2",
              instruction: {
                en: "Change 5 active to passive all tenses",
                km: "Change 5 active to passive all tenses"
              }
            }
          ],
          quiz: [
            {
              id: "passive-future-q-1",
              question: {
                en: "Active: They will open. Passive: It ___ be opened.",
                km: "Active: They will open. Passive: It ___ be opened."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "will",
                  km: "will"
                },
                {
                  en: "is",
                  km: "is"
                },
                {
                  en: "has",
                  km: "has"
                },
                {
                  en: "was",
                  km: "was"
                }
              ],
              correctAnswer: "will",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "passive-future-q-2",
              question: {
                en: "The app ___ been approved.",
                km: "The app ___ been approved."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "has",
                  km: "has"
                },
                {
                  en: "have",
                  km: "have"
                },
                {
                  en: "is",
                  km: "is"
                },
                {
                  en: "was",
                  km: "was"
                }
              ],
              correctAnswer: "has",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "passive-future-q-3",
              question: {
                en: "This movie has ___ seen by millions.",
                km: "This movie has ___ seen by millions."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "been",
                  km: "been"
                },
                {
                  en: "being",
                  km: "being"
                },
                {
                  en: "be",
                  km: "be"
                },
                {
                  en: "was",
                  km: "was"
                }
              ],
              correctAnswer: "been",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          vocabularyIds: [
            "passive-voice",
            "future-passive",
            "present-perfect-passive",
            "will-be",
            "has-been",
            "have-been"
          ]
        }
      ]
    },
    {
      id: "ch-2-reported-speech",
      title: {
        en: "Reported Speech",
        km: "សម្តីរាយការណ៍"
      },
      lessons: [
        {
          id: "reported-speech-statements",
          title: {
            en: "Reported Speech: Statements",
            km: "សម្តីរាយការណ៍៖ ប្រយោគផ្តើម"
          },
          level: "intermediate",
          unitId: "unit-2",
          chapterId: "ch-2-reported-speech",
          order: 15,
          estimatedMinutes: 20,
          definition: {
            en: "Reported speech: said + (that) + clause. Tense shifts back: present -> past, will -> would, etc.",
            km: "សម្តីរាយការណ៍៖ រាយការណ៍អ្វីដែលគេនិយាយ។ កាលប្តូរថយក្រោយ"
          },
          forms: {
            affirmative: {
              structure: "S + said + (that) + S + past verb",
              examples: [
                {
                  en: "\"I work here\" -> He said he worked there.",
                  km: "គាត់បាននិយាយថាគាត់ធ្វើការនៅទីនោះ"
                },
                {
                  en: "\"I am watching TV\" -> She said she was watching.",
                  km: "នាងបាននិយាយថានាងកំពុងមើលទូរទស្សន៍"
                },
                {
                  en: "\"I have finished\" -> He said he had finished.",
                  km: "គាត់បាននិយាយថាគាត់បានបញ្ចប់"
                },
                {
                  en: "\"I will call you\" -> She said she would call me.",
                  km: "នាងបាននិយាយថានាងនឹងទូរស័ព្ទមក"
                },
                {
                  en: "\"I went to SR\" -> He said he had gone to SR.",
                  km: "គាត់បាននិយាយថាគាត់បានទៅសៀមរាប"
                }
              ]
            },
            negative: {
              structure: "S + said + (that) + S + did not/would not/had not + V",
              examples: [
                {
                  en: "\"I don't work here\" -> He said he didn't work there.",
                  km: "គាត់បាននិយាយថាគាត់មិនធ្វើការទីនោះ"
                },
                {
                  en: "\"I haven't finished\" -> He said he hadn't finished.",
                  km: "គាត់បាននិយាយថាគាត់មិនទាន់បញ្ចប់"
                }
              ]
            },
            question: {
              structure: "What did S say?",
              examples: [
                {
                  en: "What did he say?",
                  km: "តើគាត់និយាយអ្វី?"
                },
                {
                  en: "Where did she say she worked?",
                  km: "តើនាងនិយាយថានាងធ្វើការនៅឯណា?"
                }
              ]
            }
          },
          commonMistakes: [
            {
              mistake: "He said he works here",
              correction: "He said he worked there",
              reason: {
                en: "Shift tense back",
                km: ""
              }
            }
          ],
          exercises: [
            {
              id: "reported-statements-ex-1",
              question: {
                en: "\"I like coffee\" -> He said he ___ coffee.",
                km: "\"I like coffee\" -> He said he ___ coffee."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "liked",
                  km: "liked"
                },
                {
                  en: "likes",
                  km: "likes"
                },
                {
                  en: "is liking",
                  km: "is liking"
                },
                {
                  en: "had liked",
                  km: "had liked"
                }
              ],
              correctAnswer: "liked",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "reported-statements-ex-2",
              question: {
                en: "\"I am leaving\" -> She said she ___ leaving.",
                km: "\"I am leaving\" -> She said she ___ leaving."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "was",
                  km: "was"
                },
                {
                  en: "is",
                  km: "is"
                },
                {
                  en: "had been",
                  km: "had been"
                },
                {
                  en: "would be",
                  km: "would be"
                }
              ],
              correctAnswer: "was",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "reported-statements-ex-3",
              question: {
                en: "\"I will help\" -> He said he ___ help me.",
                km: "\"I will help\" -> He said he ___ help me."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "would",
                  km: "would"
                },
                {
                  en: "will",
                  km: "will"
                },
                {
                  en: "had",
                  km: "had"
                },
                {
                  en: "was",
                  km: "was"
                }
              ],
              correctAnswer: "would",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "reported-statements-ex-4",
              question: {
                en: "\"I have seen\" -> She said she ___ seen.",
                km: "\"I have seen\" -> She said she ___ seen."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "had",
                  km: "had"
                },
                {
                  en: "has",
                  km: "has"
                },
                {
                  en: "saw",
                  km: "saw"
                },
                {
                  en: "seen",
                  km: "seen"
                }
              ],
              correctAnswer: "had",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "reported-statements-ex-5",
              question: {
                en: "\"I work here\" -> He said he worked ___.",
                km: "\"I work here\" -> He said he worked ___."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "there",
                  km: "there"
                },
                {
                  en: "here",
                  km: "here"
                },
                {
                  en: "that",
                  km: "that"
                },
                {
                  en: "now",
                  km: "now"
                }
              ],
              correctAnswer: "there",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          homework: [
            {
              id: "reported-statements-hw-1",
              instruction: {
                en: "Convert 5 direct statements to reported speech",
                km: "Convert 5 direct statements to reported speech"
              }
            },
            {
              id: "reported-statements-hw-2",
              instruction: {
                en: "Report what 3 friends said yesterday",
                km: "Report what 3 friends said yesterday"
              }
            }
          ],
          quiz: [
            {
              id: "reported-statements-q-1",
              question: {
                en: "\"I am tired\" -> He said he ___ tired.",
                km: "\"I am tired\" -> He said he ___ tired."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "was",
                  km: "was"
                },
                {
                  en: "is",
                  km: "is"
                },
                {
                  en: "had been",
                  km: "had been"
                },
                {
                  en: "would be",
                  km: "would be"
                }
              ],
              correctAnswer: "was",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "reported-statements-q-2",
              question: {
                en: "\"I will come\" -> She said she ___ come.",
                km: "\"I will come\" -> She said she ___ come."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "would",
                  km: "would"
                },
                {
                  en: "will",
                  km: "will"
                },
                {
                  en: "had",
                  km: "had"
                },
                {
                  en: "was",
                  km: "was"
                }
              ],
              correctAnswer: "would",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "reported-statements-q-3",
              question: {
                en: "\"I have finished\" -> He said he ___ finished.",
                km: "\"I have finished\" -> He said he ___ finished."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "had",
                  km: "had"
                },
                {
                  en: "has",
                  km: "has"
                },
                {
                  en: "have",
                  km: "have"
                },
                {
                  en: "would have",
                  km: "would have"
                }
              ],
              correctAnswer: "had",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          vocabularyIds: [
            "reported-speech",
            "indirect-speech",
            "said",
            "tense-shift",
            "would",
            "had"
          ]
        },
        {
          id: "reported-speech-questions",
          title: {
            en: "Reported Speech: Questions & Commands",
            km: "សម្តីរាយការណ៍៖ សំណួរ និងបង្គាប់"
          },
          level: "intermediate",
          unitId: "unit-2",
          chapterId: "ch-2-reported-speech",
          order: 16,
          estimatedMinutes: 20,
          definition: {
            en: "Yes/No questions: asked if + S + V. Wh questions: asked + wh-word + S + V. Commands: told + O + to V.",
            km: "Yes/No: asked if/ whether។ Wh: asked+wh-word។ Commands: told+O+to V"
          },
          forms: {
            affirmative: {
              structure: "Yes/No: asked if+S+V | Wh: asked+wh-word+S+V | Commands: told+O+to V",
              examples: [
                {
                  en: "\"Do you like coffee?\" -> He asked if I liked coffee.",
                  km: "គាត់សួរថាតើខ្ញុំចូលចិត្តកាហ្វេទេ"
                },
                {
                  en: "\"Where do you work?\" -> She asked where I worked.",
                  km: "នាងសួរថាតើខ្ញុំធ្វើការនៅឯណា"
                },
                {
                  en: "\"Close the door\" -> She told me to close the door.",
                  km: "នាងប្រាប់ខ្ញុំឲ្យបិទទ្វារ"
                },
                {
                  en: "\"Don't be late\" -> He told us not to be late.",
                  km: "គាត់ប្រាប់យើងកុំមកយឺត"
                }
              ]
            },
            negative: {
              structure: "Commands: told+O+not+to V",
              examples: [
                {
                  en: "\"Don't go\" -> He told me not to go.",
                  km: "គាត់ប្រាប់ខ្ញុំកុំទៅ"
                }
              ]
            },
            question: {
              structure: "What did he ask/tell?",
              examples: [
                {
                  en: "What did he ask?",
                  km: "តើគាត់សួរអ្វី?"
                },
                {
                  en: "What did she tell you?",
                  km: "តើនាងប្រាប់អ្នកឲ្យធ្វើអ្វី?"
                }
              ]
            }
          },
          commonMistakes: [
            {
              mistake: "He asked where do I work",
              correction: "He asked where I worked",
              reason: {
                en: "No question inversion",
                km: ""
              }
            }
          ],
          exercises: [
            {
              id: "reported-questions-ex-1",
              question: {
                en: "\"Do you like coffee?\" -> He asked ___ I liked.",
                km: "\"Do you like coffee?\" -> He asked ___ I liked."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "if",
                  km: "if"
                },
                {
                  en: "that",
                  km: "that"
                },
                {
                  en: "what",
                  km: "what"
                },
                {
                  en: "where",
                  km: "where"
                }
              ],
              correctAnswer: "if",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "reported-questions-ex-2",
              question: {
                en: "\"Where do you live?\" -> She asked where I ___.",
                km: "\"Where do you live?\" -> She asked where I ___."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "lived",
                  km: "lived"
                },
                {
                  en: "live",
                  km: "live"
                },
                {
                  en: "do I live",
                  km: "do I live"
                },
                {
                  en: "did I live",
                  km: "did I live"
                }
              ],
              correctAnswer: "lived",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "reported-questions-ex-3",
              question: {
                en: "\"Close the door\" -> He told me ___ the door.",
                km: "\"Close the door\" -> He told me ___ the door."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "to close",
                  km: "to close"
                },
                {
                  en: "close",
                  km: "close"
                },
                {
                  en: "closing",
                  km: "closing"
                },
                {
                  en: "closed",
                  km: "closed"
                }
              ],
              correctAnswer: "to close",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "reported-questions-ex-4",
              question: {
                en: "\"Don't run\" -> She told us ___ run.",
                km: "\"Don't run\" -> She told us ___ run."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "not to",
                  km: "not to"
                },
                {
                  en: "don't",
                  km: "don't"
                },
                {
                  en: "to not",
                  km: "to not"
                },
                {
                  en: "not",
                  km: "not"
                }
              ],
              correctAnswer: "not to",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "reported-questions-ex-5",
              question: {
                en: "\"Are you hungry?\" -> He asked if I ___ hungry.",
                km: "\"Are you hungry?\" -> He asked if I ___ hungry."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "was",
                  km: "was"
                },
                {
                  en: "am",
                  km: "am"
                },
                {
                  en: "were",
                  km: "were"
                },
                {
                  en: "are",
                  km: "are"
                }
              ],
              correctAnswer: "was",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          homework: [
            {
              id: "reported-questions-hw-1",
              instruction: {
                en: "Convert 3 wh-questions and 3 yes/no to reported",
                km: "Convert 3 wh-questions and 3 yes/no to reported"
              }
            },
            {
              id: "reported-questions-hw-2",
              instruction: {
                en: "Write 3 reported commands and requests",
                km: "Write 3 reported commands and requests"
              }
            }
          ],
          quiz: [
            {
              id: "reported-questions-q-1",
              question: {
                en: "\"Do you speak English?\" -> He asked if I ___.",
                km: "\"Do you speak English?\" -> He asked if I ___."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "spoke",
                  km: "spoke"
                },
                {
                  en: "speak",
                  km: "speak"
                },
                {
                  en: "do speak",
                  km: "do speak"
                },
                {
                  en: "speaking",
                  km: "speaking"
                }
              ],
              correctAnswer: "spoke",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "reported-questions-q-2",
              question: {
                en: "\"Sit down\" -> He told me ___ down.",
                km: "\"Sit down\" -> He told me ___ down."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "to sit",
                  km: "to sit"
                },
                {
                  en: "sit",
                  km: "sit"
                },
                {
                  en: "sitting",
                  km: "sitting"
                },
                {
                  en: "sat",
                  km: "sat"
                }
              ],
              correctAnswer: "to sit",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "reported-questions-q-3",
              question: {
                en: "\"What time is it?\" -> She asked what time ___.",
                km: "\"What time is it?\" -> She asked what time ___."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "it was",
                  km: "it was"
                },
                {
                  en: "is it",
                  km: "is it"
                },
                {
                  en: "it is",
                  km: "it is"
                },
                {
                  en: "was it",
                  km: "was it"
                }
              ],
              correctAnswer: "it was",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          vocabularyIds: [
            "reported-questions",
            "reported-commands",
            "if",
            "whether",
            "told",
            "asked"
          ]
        }
      ]
    },
{
  id: "ch-2-relative-clauses",
  title: {
    en: "Relative Clauses",
    km: "ស្ងៀងសន្នត្កាន្ង៓កាយទេក"
  },
  lessons: [
    {
      id: "defining-relative-clauses",
      title: {
        en: "Defining Relative Clauses",
        km: "ស្ងៀងសន្នត្កាន្ង៓កាយទេក"
      },
      level: "intermediate",
      unitId: "unit-2",
      chapterId: "ch-2-relative-clauses",
      order: 17,
      estimatedMinutes: 15,
      definition: {
        en: "Defining relative clauses give essential info. Who/that = people. Which/that = things. Where = places. When = times. Whose = possession.",
        km: "ផ្ធ្ល្កព៓ស្រកមត៍ខារក្ន្ងៃយេស្វាមស្ម្ទាបនាម"
      },
      forms: {
        affirmative: {
          structure: "Noun + who/which/that/where/when/whose + clause",
          examples: [
            {
              en: "The man who lives next door is a teacher.",
              km: "បុរខៀយរស្នេន់ជា​​ឭ​បរប្រាយបុក្បកៀយបានាបវ្វាយ​"
            },
            {
              en: "The book which I read was good.",
              km: "សៀវ្បេកអត៊ខ្លែងអានក្បេស​​​"
            },
            {
              en: "The restaurant where we ate is famous.",
              km: "ភោជនីយអត៊ព្លាងញ្នាយក្បោស​​"
            },
            {
              en: "The year when I moved was 2020.",
              km: "ឆ្រៀនផ្លាស់មក​ប្រាយតេ​2​0​2​0"
            },
            {
              en: "The woman whose car was stolen called police.",
              km: "ស្រៀអត៊កេកាល់បានទិសក្បេន​"
            }
          ]
        },
        negative: {
          structure: "Noun + negative clause",
          examples: [
            {
              en: "The man who does not work here left.",
              km: ""
            },
            {
              en: "The book which I did not read is on the shelf.",
              km: ""
            },
            {
              en: "The place where we did not go was far.",
              km: ""
            }
          ]
        },
        question: {
          structure: "Do you know + noun + relative clause?",
          examples: [
            {
              en: "Do you know the man who lives next door?",
              km: ""
            },
            {
              en: "Is this the book which you read?",
              km: ""
            },
            {
              en: "Where is the place where you work?",
              km: ""
            }
          ]
        }
      },
      commonMistakes: [
        {
          mistake: "The man which lives next door",
          correction: "The man who lives next door",
          reason: {
            en: "Use who for people",
            km: ""
          }
        },
        {
          mistake: "The book who I read",
          correction: "The book which I read",
          reason: {
            en: "Use which for things",
            km: ""
          }
        },
        {
          mistake: "The man lives next door is a teacher",
          correction: "The man who lives next door is a teacher",
          reason: {
            en: "Include relative pronoun",
            km: ""
          }
        }
      ],
      exercises: [
        {
          id: "defining-relative-ex-1",
          question: {
            en: "The woman ___ called is my sister.",
            km: "The woman ___ called is my sister."
          },
          type: "multiple-choice",
          options: [
            {
              en: "who",
              km: "who"
            },
            {
              en: "which",
              km: "which"
            },
            {
              en: "where",
              km: "where"
            },
            {
              en: "whose",
              km: "whose"
            }
          ],
          correctAnswer: "who",
          explanation: {
            en: "",
            km: ""
          }
        },
        {
          id: "defining-relative-ex-2",
          question: {
            en: "The car ___ I bought is red.",
            km: "The car ___ I bought is red."
          },
          type: "multiple-choice",
          options: [
            {
              en: "that",
              km: "that"
            },
            {
              en: "who",
              km: "who"
            },
            {
              en: "where",
              km: "where"
            },
            {
              en: "whose",
              km: "whose"
            }
          ],
          correctAnswer: "that",
          explanation: {
            en: "",
            km: ""
          }
        },
        {
          id: "defining-relative-ex-3",
          question: {
            en: "The place ___ we met is special.",
            km: "The place ___ we met is special."
          },
          type: "multiple-choice",
          options: [
            {
              en: "where",
              km: "where"
            },
            {
              en: "when",
              km: "when"
            },
            {
              en: "who",
              km: "who"
            },
            {
              en: "which",
              km: "which"
            }
          ],
          correctAnswer: "where",
          explanation: {
            en: "",
            km: ""
          }
        },
        {
          id: "defining-relative-ex-4",
          question: {
            en: "The man ___ wallet was stolen called police.",
            km: "The man ___ wallet was stolen called police."
          },
          type: "multiple-choice",
          options: [
            {
              en: "whose",
              km: "whose"
            },
            {
              en: "who",
              km: "who"
            },
            {
              en: "which",
              km: "which"
            },
            {
              en: "that",
              km: "that"
            }
          ],
          correctAnswer: "whose",
          explanation: {
            en: "",
            km: ""
          }
        },
        {
          id: "defining-relative-ex-5",
          question: {
            en: "The day ___ I was born was rainy.",
            km: "The day ___ I was born was rainy."
          },
          type: "multiple-choice",
          options: [
            {
              en: "when",
              km: "when"
            },
            {
              en: "where",
              km: "where"
            },
            {
              en: "who",
              km: "who"
            },
            {
              en: "which",
              km: "which"
            }
          ],
          correctAnswer: "when",
          explanation: {
            en: "",
            km: ""
          }
        }
      ],
      homework: [
        {
          id: "defining-relative-hw-1",
          instruction: {
            en: "Write 5 defining relative clauses about people and places",
            km: "Write 5 defining relative clauses about people and places"
          }
        },
        {
          id: "defining-relative-hw-2",
          instruction: {
            en: "Describe your hometown using 3 relative clauses",
            km: "Describe your hometown using 3 relative clauses"
          }
        }
      ],
      quiz: [
        {
          id: "defining-relative-q-1",
          question: {
            en: "The teacher ___ taught me is from Cambodia.",
            km: "The teacher ___ taught me is from Cambodia."
          },
          type: "multiple-choice",
          options: [
            {
              en: "who",
              km: "who"
            },
            {
              en: "which",
              km: "which"
            },
            {
              en: "where",
              km: "where"
            },
            {
              en: "when",
              km: "when"
            }
          ],
          correctAnswer: "who",
          explanation: {
            en: "",
            km: ""
          }
        },
        {
          id: "defining-relative-q-2",
          question: {
            en: "The house ___ I live is big.",
            km: "The house ___ I live is big."
          },
          type: "multiple-choice",
          options: [
            {
              en: "which",
              km: "which"
            },
            {
              en: "where",
              km: "where"
            },
            {
              en: "who",
              km: "who"
            },
            {
              en: "whose",
              km: "whose"
            }
          ],
          correctAnswer: "which",
          explanation: {
            en: "",
            km: ""
          }
        },
        {
          id: "defining-relative-q-3",
          question: {
            en: "Do you remember the time ___ we first met?",
            km: "Do you remember the time ___ we first met?"
          },
          type: "multiple-choice",
          options: [
            {
              en: "when",
              km: "when"
            },
            {
              en: "where",
              km: "where"
            },
            {
              en: "who",
              km: "who"
            },
            {
              en: "which",
              km: "which"
            }
          ],
          correctAnswer: "when",
          explanation: {
            en: "",
            km: ""
          }
        }
      ],
      vocabularyIds: [
        "relative-clauses",
        "defining",
        "who",
        "which",
        "that",
        "where",
        "when",
        "whose"
      ]
    },
    {
      id: "non-defining-relative-clauses",
      title: {
        en: "Non-defining Relative Clauses",
        km: "ស្ងៀងសន្នត្កាន្ង៓ម្នាក្ង៓កាយទេក"
      },
      level: "intermediate",
      unitId: "unit-2",
      chapterId: "ch-2-relative-clauses",
      order: 18,
      estimatedMinutes: 15,
      definition: {
        en: "Non-defining relative clauses give extra info. Always enclosed in commas. Cannot use that.",
        km: "ផ្ធ្ល្កព៓ស្រកមត៍បន្តៀមបន្តៀម太​ត្រែន់太ក្បូស​ម្នានាបាបរេស​​​"
      },
      forms: {
        affirmative: {
          structure: "Noun + , + who/which + V + , + V",
          examples: [
            {
              en: "My father, who is 50, works in a bank.",
              km: "អប្បុអទែការ៓អប្ទេ័អប្វែហឹសអ្ប្ងៃលអ្បេកអ្បុអ្បែកអ្បូក​"
            },
            {
              en: "Angkor Wat, which is in SR, is famous.",
              km: "អប្បុអទែអប្បុអទែអប្វែអប្បុអ្បេកអ្បុអ្បូក​"
            },
            {
              en: "Phnom Penh, where I was born, is capital.",
              km: "អប្បុអទែអប្បុអទែអប្បុអ្បេកអ្បុអ្បូក​"
            },
            {
              en: "My boss, whose office is on 5th, is on leave.",
              km: "អប្បុអទែអប្បុអទែអប្បុអ្បេកអ្បុអ្បូក​"
            }
          ]
        },
        negative: {
          structure: "Noun + , + negative clause + , + V",
          examples: [
            {
              en: "My father, who does not smoke, is healthy.",
              km: ""
            },
            {
              en: "The book, which is not long, was interesting.",
              km: ""
            }
          ]
        },
        question: {
          structure: ", clause, ...?",
          examples: [
            {
              en: "Do you know my father, who is 50?",
              km: ""
            },
            {
              en: "Have you been to Angkor Wat, which is in SR?",
              km: ""
            }
          ]
        }
      },
      commonMistakes: [
        {
          mistake: "My father which is 50",
          correction: "My father, who is 50",
          reason: {
            en: "Use who for people, commas required",
            km: ""
          }
        }
      ],
      exercises: [
        {
          id: "non-defining-ex-1",
          question: {
            en: "My mother, ___ is a nurse, works hard.",
            km: "My mother, ___ is a nurse, works hard."
          },
          type: "multiple-choice",
          options: [
            {
              en: "who",
              km: "who"
            },
            {
              en: "which",
              km: "which"
            },
            {
              en: "that",
              km: "that"
            },
            {
              en: "where",
              km: "where"
            }
          ],
          correctAnswer: "who",
          explanation: {
            en: "",
            km: ""
          }
        },
        {
          id: "non-defining-ex-2",
          question: {
            en: "SR, ___ is in Cambodia, is beautiful.",
            km: "SR, ___ is in Cambodia, is beautiful."
          },
          type: "multiple-choice",
          options: [
            {
              en: "which",
              km: "which"
            },
            {
              en: "where",
              km: "where"
            },
            {
              en: "who",
              km: "who"
            },
            {
              en: "whose",
              km: "whose"
            }
          ],
          correctAnswer: "which",
          explanation: {
            en: "",
            km: ""
          }
        },
        {
          id: "non-defining-ex-3",
          question: {
            en: "Mr. Chen, ___ son is my classmate, is a doctor.",
            km: "Mr. Chen, ___ son is my classmate, is a doctor."
          },
          type: "multiple-choice",
          options: [
            {
              en: "whose",
              km: "whose"
            },
            {
              en: "who",
              km: "who"
            },
            {
              en: "which",
              km: "which"
            },
            {
              en: "that",
              km: "that"
            }
          ],
          correctAnswer: "whose",
          explanation: {
            en: "",
            km: ""
          }
        },
        {
          id: "non-defining-ex-4",
          question: {
            en: "The river, ___ flows through the city, is polluted.",
            km: "The river, ___ flows through the city, is polluted."
          },
          type: "multiple-choice",
          options: [
            {
              en: "which",
              km: "which"
            },
            {
              en: "who",
              km: "who"
            },
            {
              en: "where",
              km: "where"
            },
            {
              en: "whose",
              km: "whose"
            }
          ],
          correctAnswer: "which",
          explanation: {
            en: "",
            km: ""
          }
        },
        {
          id: "non-defining-ex-5",
          question: {
            en: "My grandmother, ___ is 90, still cooks.",
            km: "My grandmother, ___ is 90, still cooks."
          },
          type: "multiple-choice",
          options: [
            {
              en: "who",
              km: "who"
            },
            {
              en: "which",
              km: "which"
            },
            {
              en: "that",
              km: "that"
            },
            {
              en: "where",
              km: "where"
            }
          ],
          correctAnswer: "who",
          explanation: {
            en: "",
            km: ""
          }
        }
      ],
      homework: [
        {
          id: "non-defining-hw-1",
          instruction: {
            en: "Write 5 non-defining about family members",
            km: "Write 5 non-defining about family members"
          }
        },
        {
          id: "non-defining-hw-2",
          instruction: {
            en: "Write 3 non-defining about Cambodia places",
            km: "Write 3 non-defining about Cambodia places"
          }
        }
      ],
      quiz: [
        {
          id: "non-defining-q-1",
          question: {
            en: "My car, ___ is blue, is parked outside.",
            km: "My car, ___ is blue, is parked outside."
          },
          type: "multiple-choice",
          options: [
            {
              en: "which",
              km: "which"
            },
            {
              en: "that",
              km: "that"
            },
            {
              en: "who",
              km: "who"
            },
            {
              en: "where",
              km: "where"
            }
          ],
          correctAnswer: "which",
          explanation: {
            en: "",
            km: ""
          }
        },
        {
          id: "non-defining-q-2",
          question: {
            en: "My father, ___ is a teacher, speaks English.",
            km: "My father, ___ is a teacher, speaks English."
          },
          type: "multiple-choice",
          options: [
            {
              en: "who",
              km: "who"
            },
            {
              en: "which",
              km: "which"
            },
            {
              en: "that",
              km: "that"
            },
            {
              en: "what",
              km: "what"
            }
          ],
          correctAnswer: "who",
          explanation: {
            en: "",
            km: ""
          }
        },
        {
          id: "non-defining-q-3",
          question: {
            en: "Do non-defining clauses use commas?",
            km: "Do non-defining clauses use commas?"
          },
          type: "multiple-choice",
          options: [
            {
              en: "Yes, always",
              km: "Yes, always"
            },
            {
              en: "No, never",
              km: "No, never"
            },
            {
              en: "Sometimes",
              km: "Sometimes"
            },
            {
              en: "Only with people",
              km: "Only with people"
            }
          ],
          correctAnswer: "Yes, always",
          explanation: {
            en: "",
            km: ""
          }
        }
      ],
      vocabularyIds: [
        "relative-clauses",
        "non-defining",
        "commas",
        "extra-information",
        "who",
        "which",
        "whose"
      ]
    }
  ]
}
,
    {
      id: "ch-2-phrasal-verbs",
      title: {
        en: "Phrasal Verbs",
        km: "Phrasal Verbs"
      },
      lessons: [
        {
          id: "separable-phrasal-verbs",
          title: {
            en: "Separable Phrasal Verbs",
            km: "Phrasal Verbs ដែលអាចញែកបាន"
          },
          level: "intermediate",
          unitId: "unit-2",
          chapterId: "ch-2-phrasal-verbs",
          order: 18,
          estimatedMinutes: 15,
          definition: {
            en: "Separable: object goes between verb+particle or after. Pronoun goes between.",
            km: "អាចញែកបាន៖ កម្មវត្ថុអាចនៅចន្លោះ ឬក្រោយ particle"
          },
          forms: {
            affirmative: {
              structure: "V + O + particle OR V + particle + O",
              examples: [
                {
                  en: "Turn off the light. / Turn the light off.",
                  km: "បិទភ្លើង"
                },
                {
                  en: "Pick up your sister. / Pick your sister up.",
                  km: "ទៅយកប្អូនស្រី"
                },
                {
                  en: "Put on your jacket. / Put your jacket on.",
                  km: "ពាក់អាវ"
                },
                {
                  en: "Take off your shoes. / Take your shoes off.",
                  km: "ដោះស្បែកជើង"
                },
                {
                  en: "Clean up the room. / Clean the room up.",
                  km: "សម្អាតបន្ទប់"
                }
              ]
            },
            negative: {
              structure: "Pronoun: V + pronoun + particle",
              examples: [
                {
                  en: "Don't turn on the TV.",
                  km: "កុំបើកទូរទស្សន៍"
                },
                {
                  en: "Don't pick up the kids.",
                  km: "កុំទៅយកក្មេងៗ"
                }
              ]
            },
            question: {
              structure: "Question with verb + O + particle?",
              examples: [
                {
                  en: "Did you turn off the light?",
                  km: "តើអ្នកបានបិទភ្លើងទេ?"
                },
                {
                  en: "Did you put on your jacket?",
                  km: "តើអ្នកបានពាក់អាវទេ?"
                }
              ]
            }
          },
          commonMistakes: [
            {
              mistake: "Turn off it",
              correction: "Turn it off",
              reason: {
                en: "Pronoun goes between verb and particle",
                km: ""
              }
            }
          ],
          exercises: [
            {
              id: "separable-phrasal-ex-1",
              question: {
                en: "Please turn ___ light / the light ___.",
                km: "Please turn ___ light / the light ___."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "off the / off",
                  km: "off the / off"
                },
                {
                  en: "the / off",
                  km: "the / off"
                },
                {
                  en: "off / on",
                  km: "off / on"
                },
                {
                  en: "on / off",
                  km: "on / off"
                }
              ],
              correctAnswer: "off the / off",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "separable-phrasal-ex-2",
              question: {
                en: "Please pick ___ me / me ___.",
                km: "Please pick ___ me / me ___."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "up / up",
                  km: "up / up"
                },
                {
                  en: "up / -",
                  km: "up / -"
                },
                {
                  en: "- / up",
                  km: "- / up"
                },
                {
                  en: "to / up",
                  km: "to / up"
                }
              ],
              correctAnswer: "up / up",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "separable-phrasal-ex-3",
              question: {
                en: "Take ___ your hat / your hat ___.",
                km: "Take ___ your hat / your hat ___."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "off / off",
                  km: "off / off"
                },
                {
                  en: "on / on",
                  km: "on / on"
                },
                {
                  en: "off / on",
                  km: "off / on"
                },
                {
                  en: "on / off",
                  km: "on / off"
                }
              ],
              correctAnswer: "off / off",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "separable-phrasal-ex-4",
              question: {
                en: "I need to clean ___ the kitchen / the kitchen ___.",
                km: "I need to clean ___ the kitchen / the kitchen ___."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "up / up",
                  km: "up / up"
                },
                {
                  en: "up / -",
                  km: "up / -"
                },
                {
                  en: "- / up",
                  km: "- / up"
                },
                {
                  en: "out / out",
                  km: "out / out"
                }
              ],
              correctAnswer: "up / up",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "separable-phrasal-ex-5",
              question: {
                en: "Please pick me ___ after school.",
                km: "Please pick me ___ after school."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "up",
                  km: "up"
                },
                {
                  en: "off",
                  km: "off"
                },
                {
                  en: "on",
                  km: "on"
                },
                {
                  en: "out",
                  km: "out"
                }
              ],
              correctAnswer: "up",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          homework: [
            {
              id: "separable-phrasal-hw-1",
              instruction: {
                en: "Write 5 separable phrasal verbs with nouns and pronouns",
                km: "Write 5 separable phrasal verbs with nouns and pronouns"
              }
            },
            {
              id: "separable-phrasal-hw-2",
              instruction: {
                en: "Write instructions using separable phrasal verbs",
                km: "Write instructions using separable phrasal verbs"
              }
            }
          ],
          quiz: [
            {
              id: "separable-phrasal-q-1",
              question: {
                en: "Correct: \"turn off ___\" (which can follow \"off\")?",
                km: "Correct: \"turn off ___\" (which can follow \"off\")?"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "the light",
                  km: "the light"
                },
                {
                  en: "it",
                  km: "it"
                },
                {
                  en: "them",
                  km: "them"
                },
                {
                  en: "him",
                  km: "him"
                }
              ],
              correctAnswer: "the light",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "separable-phrasal-q-2",
              question: {
                en: "\"Pick ___ (up her / her up) after school.\"",
                km: "\"Pick ___ (up her / her up) after school.\""
              },
              type: "multiple-choice",
              options: [
                {
                  en: "up her / up her",
                  km: "up her / up her"
                },
                {
                  en: "her up / her up",
                  km: "her up / her up"
                },
                {
                  en: "she up / she up",
                  km: "she up / she up"
                },
                {
                  en: "up she / up she",
                  km: "up she / up she"
                }
              ],
              correctAnswer: "her up / her up",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "separable-phrasal-q-3",
              question: {
                en: "\"Put on your coat\" -> with pronoun: \"Put ___\"",
                km: "\"Put on your coat\" -> with pronoun: \"Put ___\""
              },
              type: "multiple-choice",
              options: [
                {
                  en: "it on",
                  km: "it on"
                },
                {
                  en: "on it",
                  km: "on it"
                },
                {
                  en: "your it on",
                  km: "your it on"
                },
                {
                  en: "on your it",
                  km: "on your it"
                }
              ],
              correctAnswer: "it on",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          vocabularyIds: [
            "phrasal-verbs",
            "separable",
            "turn-off",
            "put-on",
            "take-off",
            "pick-up",
            "clean-up"
          ]
        },
        {
          id: "inseparable-phrasal-verbs",
          title: {
            en: "Inseparable Phrasal Verbs",
            km: "Phrasal Verbs ដែលមិនអាចញែកបាន"
          },
          level: "intermediate",
          unitId: "unit-2",
          chapterId: "ch-2-phrasal-verbs",
          order: 19,
          estimatedMinutes: 15,
          definition: {
            en: "Inseparable: object always after particle. Look after, run into, get along with, take care of, put up with.",
            km: "មិនអាចញែកបាន៖ កម្មវត្ថុតែងតែក្រោយ particle"
          },
          forms: {
            affirmative: {
              structure: "V + particle + O (always together)",
              examples: [
                {
                  en: "She looks after her brother.",
                  km: "នាងមើលថែប្អូនប្រុស"
                },
                {
                  en: "I ran into an old friend.",
                  km: "ខ្ញុំជួបមិត្តចាស់ដោយចៃដន្យ"
                },
                {
                  en: "He takes care of his parents.",
                  km: "គាត់មើលថែឪពុកម្តាយ"
                },
                {
                  en: "I can't put up with this noise.",
                  km: "ខ្ញុំមិនអាចទ្រាំបានទេ"
                },
                {
                  en: "She gets along with everyone.",
                  km: "នាងចុះសម្រុងជាមួយមនុស្សគ្រប់ៗ"
                }
              ]
            },
            negative: {
              structure: "V + not + particle + O",
              examples: [
                {
                  en: "She does not look after him.",
                  km: "នាងមិនមើលថែគាត់"
                },
                {
                  en: "I didn't run into anyone.",
                  km: "ខ្ញុំមិនបានជួបនរណាទេ"
                }
              ]
            },
            question: {
              structure: "Did + S + V + particle + O?",
              examples: [
                {
                  en: "Does she look after her brother?",
                  km: "តើនាងមើលថែប្អូនប្រុសទេ?"
                },
                {
                  en: "Did you run into anyone?",
                  km: "តើអ្នកបានជួបនរណាទេ?"
                }
              ]
            }
          },
          commonMistakes: [
            {
              mistake: "She looks her brother after",
              correction: "She looks after her brother",
              reason: {
                en: "Inseparable - particle cannot move",
                km: ""
              }
            }
          ],
          exercises: [
            {
              id: "inseparable-phrasal-ex-1",
              question: {
                en: "She ___ (looks after / looks after) her grandmother.",
                km: "She ___ (looks after / looks after) her grandmother."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "looks after",
                  km: "looks after"
                },
                {
                  en: "looks",
                  km: "looks"
                },
                {
                  en: "after",
                  km: "after"
                },
                {
                  en: "looks for",
                  km: "looks for"
                }
              ],
              correctAnswer: "looks after",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "inseparable-phrasal-ex-2",
              question: {
                en: "I ___ into my teacher at the market.",
                km: "I ___ into my teacher at the market."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "ran",
                  km: "ran"
                },
                {
                  en: "run",
                  km: "run"
                },
                {
                  en: "ran into",
                  km: "ran into"
                },
                {
                  en: "ran to",
                  km: "ran to"
                }
              ],
              correctAnswer: "ran",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "inseparable-phrasal-ex-3",
              question: {
                en: "He gets along ___ his classmates.",
                km: "He gets along ___ his classmates."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "with",
                  km: "with"
                },
                {
                  en: "to",
                  km: "to"
                },
                {
                  en: "from",
                  km: "from"
                },
                {
                  en: "at",
                  km: "at"
                }
              ],
              correctAnswer: "with",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "inseparable-phrasal-ex-4",
              question: {
                en: "I can't put up ___ this noise.",
                km: "I can't put up ___ this noise."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "with",
                  km: "with"
                },
                {
                  en: "to",
                  km: "to"
                },
                {
                  en: "for",
                  km: "for"
                },
                {
                  en: "at",
                  km: "at"
                }
              ],
              correctAnswer: "with",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "inseparable-phrasal-ex-5",
              question: {
                en: "Please look ___ my cat while away.",
                km: "Please look ___ my cat while away."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "after",
                  km: "after"
                },
                {
                  en: "for",
                  km: "for"
                },
                {
                  en: "at",
                  km: "at"
                },
                {
                  en: "up",
                  km: "up"
                }
              ],
              correctAnswer: "after",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          homework: [
            {
              id: "inseparable-phrasal-hw-1",
              instruction: {
                en: "Write 5 sentences with inseparable phrasal verbs",
                km: "Write 5 sentences with inseparable phrasal verbs"
              }
            },
            {
              id: "inseparable-phrasal-hw-2",
              instruction: {
                en: "Write about daily routine using 3 separable + 3 inseparable",
                km: "Write about daily routine using 3 separable + 3 inseparable"
              }
            }
          ],
          quiz: [
            {
              id: "inseparable-phrasal-q-1",
              question: {
                en: "\"Look after\" is:",
                km: "\"Look after\" is:"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "inseparable",
                  km: "inseparable"
                },
                {
                  en: "separable",
                  km: "separable"
                },
                {
                  en: "always with pronoun",
                  km: "always with pronoun"
                },
                {
                  en: "can be both",
                  km: "can be both"
                }
              ],
              correctAnswer: "inseparable",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "inseparable-phrasal-q-2",
              question: {
                en: "I ran ___ into my friend / my friend into.",
                km: "I ran ___ into my friend / my friend into."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "into my friend / into my friend",
                  km: "into my friend / into my friend"
                },
                {
                  en: "my friend into / my friend into",
                  km: "my friend into / my friend into"
                },
                {
                  en: "into my friend / into my friend",
                  km: "into my friend / into my friend"
                }
              ],
              correctAnswer: "into my friend / into my friend",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "inseparable-phrasal-q-3",
              question: {
                en: "She gets along ___ everyone.",
                km: "She gets along ___ everyone."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "with",
                  km: "with"
                },
                {
                  en: "to",
                  km: "to"
                },
                {
                  en: "from",
                  km: "from"
                },
                {
                  en: "at",
                  km: "at"
                }
              ],
              correctAnswer: "with",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          vocabularyIds: [
            "phrasal-verbs",
            "inseparable",
            "look-after",
            "run-into",
            "get-along-with",
            "take-care-of",
            "put-up-with"
          ]
        }
      ]
    },
    {
      id: "ch-2-comparatives",
      title: {
        en: "Comparatives & Superlatives",
        km: "ថ្នាក់ប្រៀបធៀប និងឧត្តម"
      },
      lessons: [
        {
          id: "comparatives",
          title: {
            en: "Comparatives",
            km: "ថ្នាក់ប្រៀបធៀប"
          },
          level: "intermediate",
          unitId: "unit-2",
          chapterId: "ch-2-comparatives",
          order: 20,
          estimatedMinutes: 15,
          definition: {
            en: "Comparatives: adj-er + than (short adj) OR more + adj + than (long). Irregular: good > better, bad > worse.",
            km: "ប្រៀបធៀបរឿងពីរ។ ខ្លី៖ -er ។ វែង៖ more ។ មិនទៀងទាត់៖ better/worse"
          },
          forms: {
            affirmative: {
              structure: "Short: adj-er + than | Long: more + adj + than",
              examples: [
                {
                  en: "PP is bigger than SR.",
                  km: "ភ្នំពេញធំជាងសៀមរាប"
                },
                {
                  en: "English is easier than Chinese.",
                  km: "អង់គ្លេសងាយជាងចិន"
                },
                {
                  en: "This is more interesting.",
                  km: "នេះគួរឲ្យចាប់អារម្មណ៍ជាង"
                },
                {
                  en: "She is taller than me.",
                  km: "នាងខ្ពស់ជាងខ្ញុំ"
                },
                {
                  en: "This coffee is better.",
                  km: "កាហ្វេនេះល្អជាង"
                }
              ]
            },
            negative: {
              structure: "S + V + less + adj + than | not as + adj + as",
              examples: [
                {
                  en: "PP is not bigger.",
                  km: "ភ្នំពេញមិនធំជាង"
                },
                {
                  en: "This is less interesting.",
                  km: "នេះគួរឲ្យចាប់អារម្មណ៍តិចជាង"
                },
                {
                  en: "Not as difficult as.",
                  km: "មិនពិបាកដូច"
                }
              ]
            },
            question: {
              structure: "Is + S + comparative than O?",
              examples: [
                {
                  en: "Is PP bigger than SR?",
                  km: "តើភ្នំពេញធំជាងសៀមរាបទេ?"
                },
                {
                  en: "Who is taller?",
                  km: "តើអ្នកណាខ្ពស់ជាង?"
                },
                {
                  en: "Which is better?",
                  km: "តើមួយណាល្អជាង?"
                }
              ]
            }
          },
          commonMistakes: [
            {
              mistake: "This book more interesting than that",
              correction: "This book is more interesting than that one",
              reason: {
                en: "Include be verb",
                km: ""
              }
            }
          ],
          exercises: [
            {
              id: "comparatives-ex-1",
              question: {
                en: "SR is ___ than PP.",
                km: "SR is ___ than PP."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "smaller",
                  km: "smaller"
                },
                {
                  en: "more small",
                  km: "more small"
                },
                {
                  en: "small",
                  km: "small"
                },
                {
                  en: "smallest",
                  km: "smallest"
                }
              ],
              correctAnswer: "smaller",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "comparatives-ex-2",
              question: {
                en: "This movie is ___ interesting.",
                km: "This movie is ___ interesting."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "more",
                  km: "more"
                },
                {
                  en: "-er",
                  km: "-er"
                },
                {
                  en: "most",
                  km: "most"
                },
                {
                  en: "much",
                  km: "much"
                }
              ],
              correctAnswer: "more",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "comparatives-ex-3",
              question: {
                en: "My English is ___ than yours.",
                km: "My English is ___ than yours."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "worse",
                  km: "worse"
                },
                {
                  en: "badder",
                  km: "badder"
                },
                {
                  en: "more bad",
                  km: "more bad"
                },
                {
                  en: "worst",
                  km: "worst"
                }
              ],
              correctAnswer: "worse",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "comparatives-ex-4",
              question: {
                en: "She is ___ than her brother.",
                km: "She is ___ than her brother."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "taller",
                  km: "taller"
                },
                {
                  en: "more tall",
                  km: "more tall"
                },
                {
                  en: "tall",
                  km: "tall"
                },
                {
                  en: "tallest",
                  km: "tallest"
                }
              ],
              correctAnswer: "taller",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "comparatives-ex-5",
              question: {
                en: "This bag is more ___ than that.",
                km: "This bag is more ___ than that."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "expensive",
                  km: "expensive"
                },
                {
                  en: "expensiver",
                  km: "expensiver"
                },
                {
                  en: "expensive more",
                  km: "expensive more"
                },
                {
                  en: "most expensive",
                  km: "most expensive"
                }
              ],
              correctAnswer: "expensive",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          homework: [
            {
              id: "comparatives-hw-1",
              instruction: {
                en: "Write 5 comparative sentences about two cities",
                km: "Write 5 comparative sentences about two cities"
              }
            },
            {
              id: "comparatives-hw-2",
              instruction: {
                en: "Compare yourself to a friend using 5 sentences",
                km: "Compare yourself to a friend using 5 sentences"
              }
            }
          ],
          quiz: [
            {
              id: "comparatives-q-1",
              question: {
                en: "She is ___ (happy) than before.",
                km: "She is ___ (happy) than before."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "happier",
                  km: "happier"
                },
                {
                  en: "more happy",
                  km: "more happy"
                },
                {
                  en: "happyer",
                  km: "happyer"
                },
                {
                  en: "most happy",
                  km: "most happy"
                }
              ],
              correctAnswer: "happier",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "comparatives-q-2",
              question: {
                en: "Irregular comparative of good:",
                km: "Irregular comparative of good:"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "better",
                  km: "better"
                },
                {
                  en: "gooder",
                  km: "gooder"
                },
                {
                  en: "more good",
                  km: "more good"
                },
                {
                  en: "best",
                  km: "best"
                }
              ],
              correctAnswer: "better",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "comparatives-q-3",
              question: {
                en: "He runs ___ (fast) than me.",
                km: "He runs ___ (fast) than me."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "faster",
                  km: "faster"
                },
                {
                  en: "more fast",
                  km: "more fast"
                },
                {
                  en: "fastest",
                  km: "fastest"
                },
                {
                  en: "fast",
                  km: "fast"
                }
              ],
              correctAnswer: "faster",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          vocabularyIds: [
            "comparatives",
            "than",
            "-er",
            "more",
            "better",
            "worse"
          ]
        },
        {
          id: "superlatives",
          title: {
            en: "Superlatives",
            km: "ថ្នាក់ឧត្តម"
          },
          level: "intermediate",
          unitId: "unit-2",
          chapterId: "ch-2-comparatives",
          order: 21,
          estimatedMinutes: 15,
          definition: {
            en: "Superlatives: the + adj-est (short) OR the most + adj (long). Irregular: the best, the worst, the farthest.",
            km: "ឧត្តម៖ the + -est ឬ the most + adj ។ មិនទៀងទាត់៖ best/worst/farthest"
          },
          forms: {
            affirmative: {
              structure: "Short: the + adj-est | Long: the most + adj | Irreg: best/worst",
              examples: [
                {
                  en: "PP is the biggest city in Cambodia.",
                  km: "ភ្នំពេញធំជាងគេ"
                },
                {
                  en: "This is the most interesting book.",
                  km: "នេះគួរឲ្យចាប់អារម្មណ៍ជាងគេ"
                },
                {
                  en: "She is the best student.",
                  km: "នាងពូកែជាងគេ"
                },
                {
                  en: "That was the worst movie.",
                  km: "នោះអាក្រក់ជាងគេ"
                },
                {
                  en: "This is the easiest exercise.",
                  km: "នេះងាយស្រួលជាងគេ"
                }
              ]
            },
            negative: {
              structure: "S + V + not + the + superlative",
              examples: [
                {
                  en: "PP is not the biggest in Asia.",
                  km: "ភ្នំពេញមិនមែនធំជាងគេ"
                },
                {
                  en: "This is not the most expensive.",
                  km: "នេះមិនមែនថ្លៃជាងគេ"
                }
              ]
            },
            question: {
              structure: "Is + S + the + superlative?",
              examples: [
                {
                  en: "Is PP the biggest?",
                  km: "តើភ្នំពេញធំជាងគេទេ?"
                },
                {
                  en: "What is the most interesting book?",
                  km: "តើសៀវភៅគួរឲ្យចាប់អារម្មណ៍ជាងគេមួយណា?"
                },
                {
                  en: "Who is the best?",
                  km: "តើអ្នកណាពូកែជាងគេ?"
                }
              ]
            }
          },
          commonMistakes: [
            {
              mistake: "She is the most cleverest girl",
              correction: "She is the cleverest girl",
              reason: {
                en: "Use -est or most, not both",
                km: ""
              }
            }
          ],
          exercises: [
            {
              id: "superlatives-ex-1",
              question: {
                en: "Everest is the ___ mountain.",
                km: "Everest is the ___ mountain."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "tallest",
                  km: "tallest"
                },
                {
                  en: "most tall",
                  km: "most tall"
                },
                {
                  en: "taller",
                  km: "taller"
                },
                {
                  en: "more tall",
                  km: "more tall"
                }
              ],
              correctAnswer: "tallest",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "superlatives-ex-2",
              question: {
                en: "This is the ___ restaurant in town.",
                km: "This is the ___ restaurant in town."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "best",
                  km: "best"
                },
                {
                  en: "most good",
                  km: "most good"
                },
                {
                  en: "goodest",
                  km: "goodest"
                },
                {
                  en: "better",
                  km: "better"
                }
              ],
              correctAnswer: "best",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "superlatives-ex-3",
              question: {
                en: "She is the most ___ girl.",
                km: "She is the most ___ girl."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "beautiful",
                  km: "beautiful"
                },
                {
                  en: "beautifulest",
                  km: "beautifulest"
                },
                {
                  en: "beautifuler",
                  km: "beautifuler"
                },
                {
                  en: "more beautiful",
                  km: "more beautiful"
                }
              ],
              correctAnswer: "beautiful",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "superlatives-ex-4",
              question: {
                en: "He is the ___ singer I know.",
                km: "He is the ___ singer I know."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "worst",
                  km: "worst"
                },
                {
                  en: "wost",
                  km: "wost"
                },
                {
                  en: "baddest",
                  km: "baddest"
                },
                {
                  en: "most bad",
                  km: "most bad"
                }
              ],
              correctAnswer: "worst",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "superlatives-ex-5",
              question: {
                en: "This is the ___ phone in the store.",
                km: "This is the ___ phone in the store."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "cheapest",
                  km: "cheapest"
                },
                {
                  en: "most cheap",
                  km: "most cheap"
                },
                {
                  en: "cheaper",
                  km: "cheaper"
                },
                {
                  en: "more cheap",
                  km: "more cheap"
                }
              ],
              correctAnswer: "cheapest",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          homework: [
            {
              id: "superlatives-hw-1",
              instruction: {
                en: "Write 5 superlative sentences about places in your country",
                km: "Write 5 superlative sentences about places in your country"
              }
            },
            {
              id: "superlatives-hw-2",
              instruction: {
                en: "Write 5 about best/worst in your life",
                km: "Write 5 about best/worst in your life"
              }
            }
          ],
          quiz: [
            {
              id: "superlatives-q-1",
              question: {
                en: "This is ___ car (cheap).",
                km: "This is ___ car (cheap)."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "the cheapest",
                  km: "the cheapest"
                },
                {
                  en: "the most cheap",
                  km: "the most cheap"
                },
                {
                  en: "cheapest",
                  km: "cheapest"
                },
                {
                  en: "the cheaper",
                  km: "the cheaper"
                }
              ],
              correctAnswer: "the cheapest",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "superlatives-q-2",
              question: {
                en: "Irregular superlative of bad:",
                km: "Irregular superlative of bad:"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "the worst",
                  km: "the worst"
                },
                {
                  en: "the baddest",
                  km: "the baddest"
                },
                {
                  en: "the most bad",
                  km: "the most bad"
                },
                {
                  en: "worse",
                  km: "worse"
                }
              ],
              correctAnswer: "the worst",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "superlatives-q-3",
              question: {
                en: "She is the most ___ person (intelligent).",
                km: "She is the most ___ person (intelligent)."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "intelligent",
                  km: "intelligent"
                },
                {
                  en: "intelligentest",
                  km: "intelligentest"
                },
                {
                  en: "more intelligent",
                  km: "more intelligent"
                },
                {
                  en: "intelligenter",
                  km: "intelligenter"
                }
              ],
              correctAnswer: "intelligent",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          vocabularyIds: [
            "superlatives",
            "the",
            "-est",
            "most",
            "best",
            "worst"
          ]
        }
      ]
    },
    {
      id: "ch-2-collocations",
      title: {
        en: "Common Collocations",
        km: "Collocations ទូទៅ"
      },
      lessons: [
        {
          id: "common-collocations",
          title: {
            en: "Common Collocations",
            km: "Collocations ទូទៅ"
          },
          level: "intermediate",
          unitId: "unit-2",
          chapterId: "ch-2-collocations",
          order: 22,
          estimatedMinutes: 15,
          definition: {
            en: "Collocations: words that naturally go together. make/do/take + noun. strong + coffee. highly + recommended.",
            km: "Collocations៖ ពាក្យដែលទៅជាមួយគ្នាដោយធម្មជាតិ"
          },
          forms: {
            affirmative: {
              structure: "make/do/take + noun | adj + noun | adv + adj + noun",
              examples: [
                {
                  en: "Make a decision (not do)",
                  km: "ធ្វើការសម្រេចចិត្ត"
                },
                {
                  en: "Take a break (not get)",
                  km: "សម្រាក"
                },
                {
                  en: "Strong coffee (not powerful)",
                  km: "កាហ្វេខ្លាំង"
                },
                {
                  en: "Highly recommended (not strongly)",
                  km: "ណែនាំខ្លាំង"
                },
                {
                  en: "Believe in ghosts (not believe ghosts)",
                  km: "ជឿលើខ្មោច"
                }
              ]
            },
            negative: {
              structure: "V + not + collocation",
              examples: [
                {
                  en: "Don't make a wrong decision.",
                  km: "កុំធ្វើការសម្រេចចិត្តខុស"
                },
                {
                  en: "She didn't take a break.",
                  km: "នាងមិនបានសម្រាក"
                },
                {
                  en: "This is not strong coffee.",
                  km: "នេះមិនមែនកាហ្វេខ្លាំង"
                }
              ]
            },
            question: {
              structure: "Aux + S + collocation?",
              examples: [
                {
                  en: "Did you make a decision?",
                  km: "តើអ្នកបានធ្វើការសម្រេចចិត្តទេ?"
                },
                {
                  en: "Did you take a break?",
                  km: "តើអ្នកបានសម្រាកទេ?"
                },
                {
                  en: "Is this strong coffee?",
                  km: "តើនេះកាហ្វេខ្លាំងទេ?"
                }
              ]
            }
          },
          commonMistakes: [
            {
              mistake: "Do a decision",
              correction: "Make a decision",
              reason: {
                en: "Collocation: make a decision not do",
                km: ""
              }
            }
          ],
          exercises: [
            {
              id: "collocations-ex-1",
              question: {
                en: "I need to ___ a decision.",
                km: "I need to ___ a decision."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "make",
                  km: "make"
                },
                {
                  en: "do",
                  km: "do"
                },
                {
                  en: "take",
                  km: "take"
                },
                {
                  en: "get",
                  km: "get"
                }
              ],
              correctAnswer: "make",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "collocations-ex-2",
              question: {
                en: "You should ___ a break.",
                km: "You should ___ a break."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "take",
                  km: "take"
                },
                {
                  en: "make",
                  km: "make"
                },
                {
                  en: "do",
                  km: "do"
                },
                {
                  en: "get",
                  km: "get"
                }
              ],
              correctAnswer: "take",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "collocations-ex-3",
              question: {
                en: "I ___ a mistake on the test.",
                km: "I ___ a mistake on the test."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "made",
                  km: "made"
                },
                {
                  en: "did",
                  km: "did"
                },
                {
                  en: "took",
                  km: "took"
                },
                {
                  en: "got",
                  km: "got"
                }
              ],
              correctAnswer: "made",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "collocations-ex-4",
              question: {
                en: "This is ___ coffee.",
                km: "This is ___ coffee."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "strong",
                  km: "strong"
                },
                {
                  en: "powerful",
                  km: "powerful"
                },
                {
                  en: "big",
                  km: "big"
                },
                {
                  en: "hard",
                  km: "hard"
                }
              ],
              correctAnswer: "strong",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "collocations-ex-5",
              question: {
                en: "The movie was highly ___.",
                km: "The movie was highly ___."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "recommended",
                  km: "recommended"
                },
                {
                  en: "recommend",
                  km: "recommend"
                },
                {
                  en: "recommending",
                  km: "recommending"
                },
                {
                  en: "recommends",
                  km: "recommends"
                }
              ],
              correctAnswer: "recommended",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          homework: [
            {
              id: "collocations-hw-1",
              instruction: {
                en: "Write 10 common collocations (make/take/have/do + noun)",
                km: "Write 10 common collocations (make/take/have/do + noun)"
              }
            },
            {
              id: "collocations-hw-2",
              instruction: {
                en: "Write a paragraph using 5 collocations",
                km: "Write a paragraph using 5 collocations"
              }
            }
          ],
          quiz: [
            {
              id: "collocations-q-1",
              question: {
                en: "___ your homework.",
                km: "___ your homework."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "Do",
                  km: "Do"
                },
                {
                  en: "Make",
                  km: "Make"
                },
                {
                  en: "Take",
                  km: "Take"
                },
                {
                  en: "Get",
                  km: "Get"
                }
              ],
              correctAnswer: "Do",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "collocations-q-2",
              question: {
                en: "I need to ___ a shower.",
                km: "I need to ___ a shower."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "take",
                  km: "take"
                },
                {
                  en: "have",
                  km: "have"
                },
                {
                  en: "make",
                  km: "make"
                },
                {
                  en: "do",
                  km: "do"
                }
              ],
              correctAnswer: "take",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "collocations-q-3",
              question: {
                en: "She ___ a phone call.",
                km: "She ___ a phone call."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "made",
                  km: "made"
                },
                {
                  en: "did",
                  km: "did"
                },
                {
                  en: "took",
                  km: "took"
                },
                {
                  en: "had",
                  km: "had"
                }
              ],
              correctAnswer: "made",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          vocabularyIds: [
            "collocations",
            "make",
            "do",
            "take",
            "have",
            "strong",
            "highly",
            "decision",
            "break",
            "mistake"
          ]
        }
      ]
    },
    {
      id: "ch-2-past-perfect",
      title: {
        en: "Past Perfect & Past Perfect Continuous",
        km: "អតីតកាលល្អឥតខ្ចោះ"
      },
      lessons: [
        {
          id: "past-perfect",
          title: {
            en: "Past Perfect",
            km: "អតីតកាលល្អឥតខ្ចោះ"
          },
          level: "intermediate",
          unitId: "unit-2",
          chapterId: "ch-2-past-perfect",
          order: 23,
          estimatedMinutes: 15,
          definition: {
            en: "Past Perfect: had + V3. Shows which past action happened first. Used with already, just, never, after, before.",
            km: "had + V3។ បង្ហាញសកម្មភាពមួយណាកើតឡើងមុន"
          },
          forms: {
            affirmative: {
              structure: "S + had + V3",
              examples: [
                {
                  en: "When I arrived, she had left.",
                  km: "ពេលខ្ញុំមកដល់ នាងបានចាកចេញ"
                },
                {
                  en: "I had finished before dinner.",
                  km: "ខ្ញុំបានបញ្ចប់មុនអាហារពេលល្ងាច"
                },
                {
                  en: "She had never flown before.",
                  km: "នាងមិនដែលហោះហើរពីមុន"
                },
                {
                  en: "They had just eaten when we called.",
                  km: "ពួកគេទើបញ៉ាំរួចពេលយើងទូរស័ព្ទ"
                },
                {
                  en: "By the time I woke, he had gone.",
                  km: "ពេលខ្ញុំភ្ញាក់ គាត់បានទៅ"
                }
              ]
            },
            negative: {
              structure: "S + had + not + V3",
              examples: [
                {
                  en: "She had not left when I arrived.",
                  km: "នាងមិនទាន់ចាកចេញពេលខ្ញុំមកដល់"
                },
                {
                  en: "I had not finished.",
                  km: "ខ្ញុំមិនទាន់បានបញ្ចប់"
                }
              ]
            },
            question: {
              structure: "Had + S + V3?",
              examples: [
                {
                  en: "Had she left when you arrived?",
                  km: "តើនាងបានចាកចេញពេលអ្នកមកដល់ទេ?"
                },
                {
                  en: "Had you finished?",
                  km: "តើអ្នកបានបញ្ចប់ហើយឬនៅ?"
                }
              ]
            }
          },
          commonMistakes: [
            {
              mistake: "I have finished before dinner (past)",
              correction: "I had finished before dinner",
              reason: {
                en: "Use had for past before past",
                km: ""
              }
            }
          ],
          exercises: [
            {
              id: "past-perfect-ex-1",
              question: {
                en: "By the time we arrived, the movie ___ started.",
                km: "By the time we arrived, the movie ___ started."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "had",
                  km: "had"
                },
                {
                  en: "has",
                  km: "has"
                },
                {
                  en: "was",
                  km: "was"
                },
                {
                  en: "did",
                  km: "did"
                }
              ],
              correctAnswer: "had",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "past-perfect-ex-2",
              question: {
                en: "She ___ eaten before I came.",
                km: "She ___ eaten before I came."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "had",
                  km: "had"
                },
                {
                  en: "has",
                  km: "has"
                },
                {
                  en: "was",
                  km: "was"
                },
                {
                  en: "did",
                  km: "did"
                }
              ],
              correctAnswer: "had",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "past-perfect-ex-3",
              question: {
                en: "I ___ never seen Angkor Wat before.",
                km: "I ___ never seen Angkor Wat before."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "had",
                  km: "had"
                },
                {
                  en: "have",
                  km: "have"
                },
                {
                  en: "was",
                  km: "was"
                },
                {
                  en: "did",
                  km: "did"
                }
              ],
              correctAnswer: "had",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "past-perfect-ex-4",
              question: {
                en: "After she ___ finished, she left.",
                km: "After she ___ finished, she left."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "had",
                  km: "had"
                },
                {
                  en: "has",
                  km: "has"
                },
                {
                  en: "was",
                  km: "was"
                },
                {
                  en: "did",
                  km: "did"
                }
              ],
              correctAnswer: "had",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "past-perfect-ex-5",
              question: {
                en: "___ you seen the movie before?",
                km: "___ you seen the movie before?"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "Had",
                  km: "Had"
                },
                {
                  en: "Have",
                  km: "Have"
                },
                {
                  en: "Did",
                  km: "Did"
                },
                {
                  en: "Do",
                  km: "Do"
                }
              ],
              correctAnswer: "Had",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          homework: [
            {
              id: "past-perfect-hw-1",
              instruction: {
                en: "Write 5 sentences with Past Perfect using before/after/by the time",
                km: "Write 5 sentences with Past Perfect using before/after/by the time"
              }
            },
            {
              id: "past-perfect-hw-2",
              instruction: {
                en: "Write a story using Past Simple + Past Perfect",
                km: "Write a story using Past Simple + Past Perfect"
              }
            }
          ],
          quiz: [
            {
              id: "past-perfect-q-1",
              question: {
                en: "Before he came, I ___ dinner.",
                km: "Before he came, I ___ dinner."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "had prepared",
                  km: "had prepared"
                },
                {
                  en: "prepared",
                  km: "prepared"
                },
                {
                  en: "prepare",
                  km: "prepare"
                },
                {
                  en: "has prepared",
                  km: "has prepared"
                }
              ],
              correctAnswer: "had prepared",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "past-perfect-q-2",
              question: {
                en: "She ___ never been to a concert before.",
                km: "She ___ never been to a concert before."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "had",
                  km: "had"
                },
                {
                  en: "never had",
                  km: "never had"
                },
                {
                  en: "has never",
                  km: "has never"
                },
                {
                  en: "never has",
                  km: "never has"
                }
              ],
              correctAnswer: "had",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "past-perfect-q-3",
              question: {
                en: "When we arrived, they ___ already left.",
                km: "When we arrived, they ___ already left."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "had",
                  km: "had"
                },
                {
                  en: "have",
                  km: "have"
                },
                {
                  en: "already had",
                  km: "already had"
                },
                {
                  en: "were",
                  km: "were"
                }
              ],
              correctAnswer: "had",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          vocabularyIds: [
            "past-perfect",
            "had",
            "past-participle",
            "before",
            "after",
            "already",
            "just",
            "never"
          ]
        },
        {
          id: "past-perfect-continuous",
          title: {
            en: "Past Perfect Continuous",
            km: "អតីតកាលល្អឥតខ្ចោះកំពុងបន្ត"
          },
          level: "intermediate",
          unitId: "unit-2",
          chapterId: "ch-2-past-perfect",
          order: 24,
          estimatedMinutes: 15,
          definition: {
            en: "P Past Continuous: had been + V-ing. For duration before another past action.",
            km: "had been + V-ing។ សម្រាប់រយៈពេលមុនសកម្មភាពអតីតកាល"
          },
          forms: {
            affirmative: {
              structure: "S + had been + V-ing",
              examples: [
                {
                  en: "I had been waiting for an hour when she arrived.",
                  km: "ខ្ញុំបានរង់ចាំមួយម៉ោងពេលនាងមក"
                },
                {
                  en: "She had been working for 10 years before she quit.",
                  km: "នាងបានធ្វើការ១០ឆ្នាំមុនឈប់"
                },
                {
                  en: "They had been traveling all day.",
                  km: "ពួកគេបានធ្វើដំណើរពេញមួយថ្ងៃ"
                },
                {
                  en: "He had been studying for 2 years before moving.",
                  km: "គាត់បានរៀន២ឆ្នាំមុនផ្លាស់ទៅ"
                }
              ]
            },
            negative: {
              structure: "S + had not been + V-ing",
              examples: [
                {
                  en: "I had not been waiting long.",
                  km: "ខ្ញុំមិនទាន់រង់ចាំយូរ"
                },
                {
                  en: "She had not been working long.",
                  km: "នាងមិនទាន់ធ្វើការយូរ"
                }
              ]
            },
            question: {
              structure: "Had + S + been + V-ing?",
              examples: [
                {
                  en: "Had you been waiting long?",
                  km: "តើអ្នករង់ចាំយូរទេ?"
                },
                {
                  en: "How long had she been working?",
                  km: "តើនាងបានធ្វើការយូរប៉ុណ្ណា?"
                }
              ]
            }
          },
          commonMistakes: [
            {
              mistake: "I had been wait for an hour",
              correction: "I had been waiting for an hour",
              reason: {
                en: "Use V-ing after had been",
                km: ""
              }
            }
          ],
          exercises: [
            {
              id: "past-perfect-cont-ex-1",
              question: {
                en: "She ___ studying for 3 hours when I called.",
                km: "She ___ studying for 3 hours when I called."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "had been",
                  km: "had been"
                },
                {
                  en: "had",
                  km: "had"
                },
                {
                  en: "was",
                  km: "was"
                },
                {
                  en: "has been",
                  km: "has been"
                }
              ],
              correctAnswer: "had been",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "past-perfect-cont-ex-2",
              question: {
                en: "We ___ waiting for 20 minutes when the bus came.",
                km: "We ___ waiting for 20 minutes when the bus came."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "had been",
                  km: "had been"
                },
                {
                  en: "waited",
                  km: "waited"
                },
                {
                  en: "were",
                  km: "were"
                },
                {
                  en: "have been",
                  km: "have been"
                }
              ],
              correctAnswer: "had been",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "past-perfect-cont-ex-3",
              question: {
                en: "He felt tired because he ___ been running.",
                km: "He felt tired because he ___ been running."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "had",
                  km: "had"
                },
                {
                  en: "has",
                  km: "has"
                },
                {
                  en: "was",
                  km: "was"
                },
                {
                  en: "is",
                  km: "is"
                }
              ],
              correctAnswer: "had",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "past-perfect-cont-ex-4",
              question: {
                en: "I ___ working there for 5 years before I quit.",
                km: "I ___ working there for 5 years before I quit."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "had been",
                  km: "had been"
                },
                {
                  en: "had",
                  km: "had"
                },
                {
                  en: "worked",
                  km: "worked"
                },
                {
                  en: "was working",
                  km: "was working"
                }
              ],
              correctAnswer: "had been",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "past-perfect-cont-ex-5",
              question: {
                en: "___ they been driving long?",
                km: "___ they been driving long?"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "Had",
                  km: "Had"
                },
                {
                  en: "Have",
                  km: "Have"
                },
                {
                  en: "Were",
                  km: "Were"
                },
                {
                  en: "Did",
                  km: "Did"
                }
              ],
              correctAnswer: "Had",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          homework: [
            {
              id: "past-perfect-cont-hw-1",
              instruction: {
                en: "Write 5 sentences with had been + V-ing + for",
                km: "Write 5 sentences with had been + V-ing + for"
              }
            },
            {
              id: "past-perfect-cont-hw-2",
              instruction: {
                en: "Describe what you had been doing before an event",
                km: "Describe what you had been doing before an event"
              }
            }
          ],
          quiz: [
            {
              id: "past-perfect-cont-q-1",
              question: {
                en: "I ___ studying for 2 hours before she came.",
                km: "I ___ studying for 2 hours before she came."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "had been",
                  km: "had been"
                },
                {
                  en: "studied",
                  km: "studied"
                },
                {
                  en: "was studying",
                  km: "was studying"
                },
                {
                  en: "have studied",
                  km: "have studied"
                }
              ],
              correctAnswer: "had been",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "past-perfect-cont-q-2",
              question: {
                en: "She was tired because she ___ working all day.",
                km: "She was tired because she ___ working all day."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "had been",
                  km: "had been"
                },
                {
                  en: "had",
                  km: "had"
                },
                {
                  en: "worked",
                  km: "worked"
                },
                {
                  en: "was",
                  km: "was"
                }
              ],
              correctAnswer: "had been",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "past-perfect-cont-q-3",
              question: {
                en: "They ___ traveling for 5 hours when they stopped.",
                km: "They ___ traveling for 5 hours when they stopped."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "had been",
                  km: "had been"
                },
                {
                  en: "traveled",
                  km: "traveled"
                },
                {
                  en: "were traveling",
                  km: "were traveling"
                },
                {
                  en: "have traveled",
                  km: "have traveled"
                }
              ],
              correctAnswer: "had been",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          vocabularyIds: [
            "past-perfect-continuous",
            "had-been",
            "duration",
            "before",
            "for"
          ]
        }
      ]
    },
    {
      id: "ch-2-future-perfect",
      title: {
        en: "Future Continuous & Perfect",
        km: "អនាគតកាលកំពុងបន្ត និងល្អឥតខ្ចោះ"
      },
      lessons: [
        {
          id: "future-continuous",
          title: {
            en: "Future Continuous",
            km: "អនាគតកាលកំពុងបន្ត"
          },
          level: "intermediate",
          unitId: "unit-2",
          chapterId: "ch-2-future-perfect",
          order: 25,
          estimatedMinutes: 15,
          definition: {
            en: "Future Continuous: will be + V-ing. For actions in progress at a specific future time.",
            km: "will be + V-ing ។ សម្រាប់សកម្មភាពកំពុងកើតឡើងនៅពេលអនាគតជាក់លាក់"
          },
          forms: {
            affirmative: {
              structure: "S + will be + V-ing",
              examples: [
                {
                  en: "I will be working at 9 AM tomorrow.",
                  km: "ខ្ញុំនឹងកំពុងធ្វើការនៅម៉ោង ៩ ព្រឹក"
                },
                {
                  en: "She will be traveling next week.",
                  km: "នាងនឹងកំពុងធ្វើដំណើរសប្តាហ៍ក្រោយ"
                },
                {
                  en: "At this time tomorrow, I will be flying.",
                  km: "នៅម៉ោងនេះថ្ងៃស្អែក ខ្ញុំនឹងកំពុងហោះហើរ"
                },
                {
                  en: "They will be having dinner at 7.",
                  km: "ពួកគេនឹងកំពុងញ៉ាំអាហារពេលល្ងាច"
                },
                {
                  en: "He will be waiting at the airport.",
                  km: "គាត់នឹងកំពុងរង់ចាំនៅព្រលាន"
                }
              ]
            },
            negative: {
              structure: "S + won't be + V-ing",
              examples: [
                {
                  en: "I will not be working tomorrow.",
                  km: "ខ្ញុំនឹងមិនកំពុងធ្វើការថ្ងៃស្អែក"
                },
                {
                  en: "She won't be traveling.",
                  km: "នាងនឹងមិនកំពុងធ្វើដំណើរ"
                }
              ]
            },
            question: {
              structure: "Will + S + be + V-ing?",
              examples: [
                {
                  en: "Will you be working at 9 AM?",
                  km: "តើអ្នកនឹងកំពុងធ្វើការនៅម៉ោង ៩ ព្រឹកទេ?"
                },
                {
                  en: "What will you be doing at 8 PM?",
                  km: "តើអ្នកនឹងកំពុងធ្វើអ្វីនៅម៉ោង ៨ យប់?"
                }
              ]
            }
          },
          commonMistakes: [
            {
              mistake: "I will working at 9 AM",
              correction: "I will be working at 9 AM",
              reason: {
                en: "Include be after will",
                km: ""
              }
            }
          ],
          exercises: [
            {
              id: "future-continuous-ex-1",
              question: {
                en: "This time next week I ___ relaxing.",
                km: "This time next week I ___ relaxing."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "will be",
                  km: "will be"
                },
                {
                  en: "will",
                  km: "will"
                },
                {
                  en: "am",
                  km: "am"
                },
                {
                  en: "will relaxing",
                  km: "will relaxing"
                }
              ],
              correctAnswer: "will be",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "future-continuous-ex-2",
              question: {
                en: "At 10 AM she ___ having a meeting.",
                km: "At 10 AM she ___ having a meeting."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "will be",
                  km: "will be"
                },
                {
                  en: "will have",
                  km: "will have"
                },
                {
                  en: "is having",
                  km: "is having"
                },
                {
                  en: "will having",
                  km: "will having"
                }
              ],
              correctAnswer: "will be",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "future-continuous-ex-3",
              question: {
                en: "___ you be working at 8 PM?",
                km: "___ you be working at 8 PM?"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "Will",
                  km: "Will"
                },
                {
                  en: "Are",
                  km: "Are"
                },
                {
                  en: "Do",
                  km: "Do"
                },
                {
                  en: "Were",
                  km: "Were"
                }
              ],
              correctAnswer: "Will",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "future-continuous-ex-4",
              question: {
                en: "They won't ___ flying tomorrow.",
                km: "They won't ___ flying tomorrow."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "be",
                  km: "be"
                },
                {
                  en: "are",
                  km: "are"
                },
                {
                  en: "will",
                  km: "will"
                },
                {
                  en: "have",
                  km: "have"
                }
              ],
              correctAnswer: "be",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "future-continuous-ex-5",
              question: {
                en: "I will be ___ tonight at 9 PM.",
                km: "I will be ___ tonight at 9 PM."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "studying",
                  km: "studying"
                },
                {
                  en: "study",
                  km: "study"
                },
                {
                  en: "am studying",
                  km: "am studying"
                },
                {
                  en: "will studying",
                  km: "will studying"
                }
              ],
              correctAnswer: "studying",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          homework: [
            {
              id: "future-continuous-hw-1",
              instruction: {
                en: "Write 5 about what you will be doing at specific times tomorrow",
                km: "Write 5 about what you will be doing at specific times tomorrow"
              }
            },
            {
              id: "future-continuous-hw-2",
              instruction: {
                en: "Ask 3 Future Continuous questions about friends plans",
                km: "Ask 3 Future Continuous questions about friends plans"
              }
            }
          ],
          quiz: [
            {
              id: "future-continuous-q-1",
              question: {
                en: "This time tomorrow I ___ sitting in a cafe.",
                km: "This time tomorrow I ___ sitting in a cafe."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "will be",
                  km: "will be"
                },
                {
                  en: "will",
                  km: "will"
                },
                {
                  en: "am",
                  km: "am"
                },
                {
                  en: "will sitting",
                  km: "will sitting"
                }
              ],
              correctAnswer: "will be",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "future-continuous-q-2",
              question: {
                en: "___ you be coming to the party?",
                km: "___ you be coming to the party?"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "Will",
                  km: "Will"
                },
                {
                  en: "Are",
                  km: "Are"
                },
                {
                  en: "Do",
                  km: "Do"
                },
                {
                  en: "Were",
                  km: "Were"
                }
              ],
              correctAnswer: "Will",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "future-continuous-q-3",
              question: {
                en: "Don't call at 7 - we ___ having dinner.",
                km: "Don't call at 7 - we ___ having dinner."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "will be",
                  km: "will be"
                },
                {
                  en: "will have",
                  km: "will have"
                },
                {
                  en: "are having",
                  km: "are having"
                },
                {
                  en: "will having",
                  km: "will having"
                }
              ],
              correctAnswer: "will be",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          vocabularyIds: [
            "future-continuous",
            "will-be",
            "verb-ing",
            "specific-time",
            "future"
          ]
        },
        {
          id: "future-perfect",
          title: {
            en: "Future Perfect",
            km: "អនាគតកាលល្អឥតខ្ចោះ"
          },
          level: "intermediate",
          unitId: "unit-2",
          chapterId: "ch-2-future-perfect",
          order: 26,
          estimatedMinutes: 15,
          definition: {
            en: "Future Perfect: will have + V3. For actions completed before a specific future time. Often with by, by the time, before.",
            km: "will have + V3 ។ សម្រាប់សកម្មភាពនឹងបានបញ្ចប់មុនពេលអនាគត"
          },
          forms: {
            affirmative: {
              structure: "S + will have + V3",
              examples: [
                {
                  en: "By 8 PM I will have finished.",
                  km: "ត្រឹមម៉ោង ៨ ខ្ញុំនឹងបានបញ្ចប់"
                },
                {
                  en: "She will have left by the time we arrive.",
                  km: "នាងនឹងបានចាកចេញមុនយើងមក"
                },
                {
                  en: "By next year I will have saved enough.",
                  km: "ត្រឹមឆ្នាំក្រោយ ខ្ញុំនឹងបានសន្សំគ្រប់"
                },
                {
                  en: "They will have built the bridge by 2026.",
                  km: "ពួកគេនឹងបានសាងសង់ស្ពានត្រឹម២០២៦"
                }
              ]
            },
            negative: {
              structure: "S + will not have + V3",
              examples: [
                {
                  en: "By 8 PM I will not have finished.",
                  km: "ត្រឹមម៉ោង ៨ ខ្ញុំនឹងមិនទាន់បញ្ចប់"
                },
                {
                  en: "She will not have left.",
                  km: "នាងនឹងមិនទាន់ចាកចេញ"
                }
              ]
            },
            question: {
              structure: "Will + S + have + V3?",
              examples: [
                {
                  en: "Will you have finished by 8 PM?",
                  km: "តើអ្នកនឹងបានបញ្ចប់ត្រឹមម៉ោង ៨ ទេ?"
                },
                {
                  en: "Will she have left by then?",
                  km: "តើនាងនឹងបានចាកចេញទេ?"
                }
              ]
            }
          },
          commonMistakes: [
            {
              mistake: "I will have finish by 8 PM",
              correction: "I will have finished by 8 PM",
              reason: {
                en: "Use past participle after will have",
                km: ""
              }
            }
          ],
          exercises: [
            {
              id: "future-perfect-ex-1",
              question: {
                en: "By 2027 she ___ graduated.",
                km: "By 2027 she ___ graduated."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "will have",
                  km: "will have"
                },
                {
                  en: "will",
                  km: "will"
                },
                {
                  en: "has",
                  km: "has"
                },
                {
                  en: "is",
                  km: "is"
                }
              ],
              correctAnswer: "will have",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "future-perfect-ex-2",
              question: {
                en: "I ___ booked the tickets by tonight.",
                km: "I ___ booked the tickets by tonight."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "will have",
                  km: "will have"
                },
                {
                  en: "will book",
                  km: "will book"
                },
                {
                  en: "book",
                  km: "book"
                },
                {
                  en: "will be booking",
                  km: "will be booking"
                }
              ],
              correctAnswer: "will have",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "future-perfect-ex-3",
              question: {
                en: "___ you have finished by Monday?",
                km: "___ you have finished by Monday?"
              },
              type: "multiple-choice",
              options: [
                {
                  en: "Will",
                  km: "Will"
                },
                {
                  en: "Have",
                  km: "Have"
                },
                {
                  en: "Are",
                  km: "Are"
                },
                {
                  en: "Do",
                  km: "Do"
                }
              ],
              correctAnswer: "Will",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "future-perfect-ex-4",
              question: {
                en: "They won't ___ completed by Friday.",
                km: "They won't ___ completed by Friday."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "have",
                  km: "have"
                },
                {
                  en: "be",
                  km: "be"
                },
                {
                  en: "has",
                  km: "has"
                },
                {
                  en: "having",
                  km: "having"
                }
              ],
              correctAnswer: "have",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "future-perfect-ex-5",
              question: {
                en: "By the time you arrive, I ___ prepared everything.",
                km: "By the time you arrive, I ___ prepared everything."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "will have",
                  km: "will have"
                },
                {
                  en: "will",
                  km: "will"
                },
                {
                  en: "have",
                  km: "have"
                },
                {
                  en: "had",
                  km: "had"
                }
              ],
              correctAnswer: "will have",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          homework: [
            {
              id: "future-perfect-hw-1",
              instruction: {
                en: "Write 5 future perfect sentences about goals",
                km: "Write 5 future perfect sentences about goals"
              }
            },
            {
              id: "future-perfect-hw-2",
              instruction: {
                en: "Predict what you will have accomplished in 5 years",
                km: "Predict what you will have accomplished in 5 years"
              }
            }
          ],
          quiz: [
            {
              id: "future-perfect-q-1",
              question: {
                en: "By 8 PM I ___ finished dinner.",
                km: "By 8 PM I ___ finished dinner."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "will have",
                  km: "will have"
                },
                {
                  en: "will",
                  km: "will"
                },
                {
                  en: "have",
                  km: "have"
                },
                {
                  en: "had",
                  km: "had"
                }
              ],
              correctAnswer: "will have",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "future-perfect-q-2",
              question: {
                en: "She ___ have left by Monday.",
                km: "She ___ have left by Monday."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "will",
                  km: "will"
                },
                {
                  en: "has",
                  km: "has"
                },
                {
                  en: "had",
                  km: "had"
                },
                {
                  en: "is",
                  km: "is"
                }
              ],
              correctAnswer: "will",
              explanation: {
                en: "",
                km: ""
              }
            },
            {
              id: "future-perfect-q-3",
              question: {
                en: "They will ___ built the house by next year.",
                km: "They will ___ built the house by next year."
              },
              type: "multiple-choice",
              options: [
                {
                  en: "have",
                  km: "have"
                },
                {
                  en: "has",
                  km: "has"
                },
                {
                  en: "had",
                  km: "had"
                },
                {
                  en: "be",
                  km: "be"
                }
              ],
              correctAnswer: "have",
              explanation: {
                en: "",
                km: ""
              }
            }
          ],
          vocabularyIds: [
            "future-perfect",
            "will-have",
            "completed",
            "by-the-time",
            "before"
          ]
        }
      ]
    }
  ]
}
];
