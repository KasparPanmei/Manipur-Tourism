import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TelemetryBar from '../components/home/TelemetryBar.jsx';
const circuits = [
    {
        id: 'cir-01',
        category: 'ramsar',
        district: 'Bishnupur',
        duration: 'short',
        permit: 'special',
        name: 'Keibul Lamjao Floating Biosphere Loktak Lake',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOxDIcEb9RlNpZjqIq8Q5OtyeuAO18Kose8nMcW8VAu88NJr1pl8tLFmjh2-bImtsrA0sgmMIFpDrIDRUzGn1EI4WNnA5gGgfL9ftUZ1b0IGFacM72OhVtjo2HW7g-sC07VX-RfQXORCmu9QwQ1d3jmkvMmW6VLfCzm25DxqWWU_9dOlsb-lV7xJANYuBDjY5wBJonOaQS9d8mfY1itzgZBVB88AAijcRdeinz0mDXbBaDu7uyPFUXIA',
        alt: 'Expansive panoramic view of Loktak Lake in Manipur with circular natural floating islands called phumdis on calm green waters under warm morning sunlight with mist and distant hills.',
        badge: 'CIR-01 • RAMSAR',
        tone: 'primary',
        rating: '★ 4.98 Ecological Score',
        location: 'Bishnupur District • 48 km from Imphal',
        title: 'Keibul Lamjao & Loktak Floating Biosphere',
        description: "The world's only floating national park on ancient circular phumdis , harboring the critically endangered Sangai brow-antlered deer and endemic water birds.",
        tags: [
            '2D / 1N Expedition',
            'Special Eco-Permit',
            'Capacity: 72% Available',
        ],
        action: ['event_seat', 'Book Naturalist'],
    },
    {
        id: 'cir-02',
        category: 'heritage',
        district: 'Imphal West',
        duration: 'day',
        permit: 'standard',
        name: 'Kangla Royal Citadel Nupi Lan Trail',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbGD-yJqBmaIVX_U6mbX1ftSCOGBxA1qsH9ZW6LNqZeL1nHXAzb2a8hGwpxXO_Fm67pLikecfBywIFbjUbZInW5CpBwltKNyI8R5Dc7FIIUqxfuO8VcW2hm3_MVggpo7CEUdLH7MkOETJtZyS1oFqDJGL2mZ5gKJGfCmypz1QHq41JkTF-J5d0qCz1s6RuPRZ_HQ5pFA3QI0sdYj3l2ebt5L8zxXih3Wx4FDAdPL6ocehp2KZudvK07g',
        alt: 'Majestic entrance gate and sacred royal moat of historic Kangla Fort in Imphal, surrounded by pristine green lawns and regal brick ramparts under soft afternoon lighting.',
        badge: 'CIR-02 • CITADEL',
        tone: 'primary',
        rating: '★ 4.90 Rating',
        location: 'Imphal West • Central Capital Node',
        title: 'Kangla Citadel & Nupi Lan Matriarch Trail',
        description: "The 2,000-year seat of Meitei royalty featuring the sacred Kangla Sha dragons, ancient moats, Govindaji ruins, and historical landmarks commemorating the women's uprisings.",
        tags: ['1 Full Day', 'Standard e-ILP', 'Heritage Archeologist Led'],
        action: ['confirmation_number', 'Citadel Pass'],
    },
    {
        id: 'cir-03',
        category: 'peaks',
        district: 'Ukhrul',
        duration: 'short',
        permit: 'guide',
        name: 'Shirui Kashong Peak Lilium Sanctuary',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnN9qNUp1gwjOx7nvmbVxjPuns0Kc5YBhbOXqF8n8b_affr10AoTAsh3WlXchiMbUYwQmE661feNgq74yy3VKB4gNqMWWARY7XRIQhvwnL7um1joUQwbBYy1auFoWt2P8BemQvLYqW1MasYJXxq2Bi0adHaYQzndx0vfAB-DR-jj3sDQ8fhCnEqyVORUIc1KVR5nmSjfKQ-75aAb2jy-Mszz496ysnW77IS6U3TLNBB5Ha9DQqqMb8nw',
        alt: 'Misty mountain summit of Shirui Peak in Ukhrul Manipur with delicate pink Shirui Lily flowers blooming amid green grasses against soft cloud formations.',
        badge: 'CIR-03 • HIGH PEAK',
        tone: 'secondary',
        rating: '★ 4.96 High Fragility',
        location: 'Ukhrul District • 98 km from Imphal',
        title: 'Shirui Kashong Peak & Lilium Sanctuary',
        description: 'High-altitude alpine habitat (2,835m) of the endemic Lilium mackliniae . Strictly supervised trekking route to protect delicate sub-alpine soil beds and endemic avifauna.',
        tags: [
            '3D / 2N Alpine Trek',
            'Guide Mandatory',
            'Carrying Cap: 85 Slots/Day',
        ],
        action: ['hiking', 'Book Mountain Scout'],
    },
    {
        id: 'cir-04',
        category: 'heritage',
        district: 'Bishnupur',
        duration: 'day',
        permit: 'standard',
        name: 'INA Memorial Red Hill Peace Circuit Moirang Maibam',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5_CkOalIPP_DlJ_7TqbCC_rg9T6NJ5CFHmxwgoyp85Uzmfy5b-mQ0eK2K_m9gNeDSXwxbvnpfmSkLDPlEkViaQ2JHQXhTqfh9YdLRQ_p1wgrOjU1C37a1zx1VQ_boVKaDT5lwb9NE9lIAD_imTqh_Pa2RyJnR43U7GWsGSx2lMvPLt-twCDhmU5NmiYImqyjv_enDS4FChgyr0l08vlh75-WydobaGENG8rDbQs2QNTk62ArxmJDeKw',
        alt: 'INA Memorial complex in Moirang Manipur with bronze statue of Netaji Subhas Chandra Bose and solemn World War II India Peace Memorial gardens under pristine blue skies.',
        badge: 'CIR-04 • WWII PEACE',
        tone: 'primary',
        rating: '★ 4.88 Rating',
        location: 'Moirang & Bishnupur • 45 km',
        title: 'INA Memorial & Red Hill Peace Corridor',
        description: 'The sacred soil where the Indian National Army first hoisted the Tricolour in 1944, linked with the historic Battle of Imphal sites and the Indo-Japanese Peace Memorial at Maibam Lokpa Ching.',
        tags: [
            '1 Full Day Circuit',
            'Open Access (e-ILP)',
            'War Historian Available',
        ],
        action: ['local_activity', 'Reserve Tour'],
    },
    {
        id: 'cir-05',
        category: 'ramsar',
        district: 'Tamenglong',
        duration: 'short',
        permit: 'special',
        name: 'Zeilad Lake Waterfalls Reserve Tamenglong Hornbill',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIl9Ocqiyb_7hoO_JnrFSUMyvfuBE25egbZMwhb66-FB3NFG1BKviWygcf_IWXKVMwDM68VjVB26zzJVYEBea9Ytj7rWIlzSZQe19NGCEwtVQqKCiF1W1CNsbEYJFG1vzYcStiAITdxVcfY5RmFcSmyqVtYZW6Lwd7GGdKTmhKquFdDIw90vgLDDoRwMI46hQmVUP3qdsncBQd2SYRR9-B5LSWbFu-uAWXxwFQWARobAl7DrTe5vEo3g',
        alt: 'Dense emerald tropical rainforest surrounding tranquil Zeilad Lake in Tamenglong Manipur, featuring rocky natural waterfall cascading into turquoise river pool.',
        badge: 'CIR-05 • BIOSPHERE',
        tone: 'primary',
        rating: '★ 4.95 Pristine',
        location: 'Tamenglong • 145 km from Imphal',
        title: 'Zeilad Lake & Waterfalls Sanctuary',
        description: 'Seven interconnected pristine highland lakes surrounded by virgin sub-tropical rainforest. Key sanctuary for wintering Amur Falcons and rare Great Hornbills.',
        tags: [
            '3D / 2N Rainforest Camp',
            'Eco-Sanctuary Pass',
            'Max 40 Trekkers/Wk',
        ],
        action: ['forest', 'Request Eco-Permit'],
    },
    {
        id: 'cir-06',
        category: 'caves',
        district: 'Tamenglong',
        duration: 'short',
        permit: 'guide',
        name: 'Tharon Karst Cave System Tamenglong Speleology',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFc6qnYw3eu7UtGTHYbflB3PywVBJJwuukY2GVNq0qhBCFIbrNtqyWZPJpPa2S6q6LYhbss-aZSkz8kCD7zTJUuOkvRHehGXPPVX5TJPFk924f2nPaWJQvkuYfGxULYb1Xth9a0-WCUWg5qIkSW1mr5JlB_siCSnIfS7CgA9zgoVCHdoJMlJIL9BiYtJ7JtTIx78K_yu-tJ3Po9xO4mj66Vmi1tovzgJLbnNba-yxSO5sR_kwLFJqUDw',
        alt: 'Dramatic interior of Tharon limestone cave in Tamenglong Manipur showing ancient stalactite formations, damp stone arches, and natural shaft of golden sunlight entering from a karst crevice.',
        badge: 'CIR-06 • SPELEOLOGY',
        tone: 'secondary',
        rating: '★ 4.87 Rating',
        location: 'Tamenglong District • 160 km',
        title: 'Tharon Karst Cave Prehistoric System',
        description: '655-meter limestone cavern labyrinth linked to the 900 CE Hoabinhian stone-tool culture, featuring carved subterranean pathways and active bat colonies.',
        tags: [
            '2D / 1N Caving Expedition',
            'Rongmei Guide Req.',
            'Helmet & Headlamp Std',
        ],
        action: ['explore', 'Book Speleo-Guide'],
    },
    {
        id: 'cir-07',
        category: 'peaks',
        district: 'Ukhrul',
        duration: 'extended',
        permit: 'special',
        name: 'Khayang Peak Waterfall Indo Myanmar Cloud Ridge Ukhrul',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpwfGmzLrfKcpTpckW_2OpOqiv3ft7nvfmc-zAFeOb84X34PzC6nsdTmHbQnliAYMIvLurgoX4JgS0tpPOrpnEXH-J1DalX_cERFtNrifo9YCkKQAaNL2URVjkK0AEQi3fd3SLtlNph0xg771qEwwMByuSOG6xyTQOfkY-IPDHEHDHq8IOdswNLoR09Ne9rbftuWzSRWHBO71VoRTK8vfPoIrFht5ucahE4kkzckMY-YuUWuaixo1b6Q',
        alt: 'Spectacular high-altitude cloud ridges along Khayang Peak on the Indo-Myanmar border in Manipur, with plunging waterfalls over dramatic green gorges.',
        badge: 'CIR-07 • ALPINE BORDER',
        tone: 'secondary',
        rating: '★ 4.97 Demanding',
        location: 'Eastern Ukhrul • 130 km from Imphal',
        title: 'Khayang Peak & Waterfall Corridor',
        description: "Manipur's most secluded cloud trek tracing the Indo-Myanmar frontier ridge (3,114m), cascading into the 754-foot Khayang water cataract and virgin pine forests.",
        tags: [
            '4D / 3N Wilderness Trek',
            'Border Eco-Clearance',
            'Tangkhul Porters Req.',
        ],
        action: ['altitude', 'Apply Expedition'],
    },
    {
        id: 'cir-08',
        category: 'tribal',
        district: 'Imphal East',
        duration: 'day',
        permit: 'standard',
        name: 'Andro Ancient Earthen Pottery Sacred Fire Imphal East',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZoXgnkM4kpR6_2KX-omWmqzHj3_pvBuBvYWOrAM3gUade7HqjDGVgOq82mwo3yD7qXdKtzRR2oHIZuhLbNNq6Mc9X3ZLNA11U-WFxzWxCJePlDcGYCNn4-0kiKy4UcO7UhRywQ-mXsK22yR4FfTKFylFFAi4nSbfdsX37-ileN3j_gO7WJyCJCHhl1I6P9BVqRs4XsTaJFUze-hQqdL4rYQJT1dSBPFPhU2ASmKgY7M3rkb8HVFryXg',
        alt: 'Traditional wood-and-stone shrine building in Andro village Manipur, housing the centuries-old sacred flame with handcrafted terracotta vessels arranged outside in afternoon light.',
        badge: 'CIR-08 • INDIGENOUS',
        tone: 'primary',
        rating: '★ 4.92 Living Cult',
        location: 'Imphal East • 26 km from Capital',
        title: 'Andro Sacred Fire & Earthen Pottery',
        description: 'Home to the 1,000-year continuous undying sacred flame tended by rotating families, and ancient coil-pottery techniques practiced exclusively by married women without wheels.',
        tags: ['Half Day / Excursion', 'Standard e-ILP', 'Pottery Workshop Avail.'],
        action: ['palette', 'Cultural Day Pass'],
    },
    {
        id: 'cir-09',
        category: 'peaks',
        district: 'Senapati',
        duration: 'short',
        permit: 'special',
        name: 'Dzukou Valley Alpine Ridge Senapati Border Zero Plastic',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwiUUt8Gy3J_FkFQNGNA80GrezlMzWVBiWeZ6Lv1hzNHBK_F0lN959itCS5Lp9oEwBGWxaAPEGRagLLAuCdE_xhGSaH3Ym59xvtVdNCasUUQjLHd3Y12grV5wJ2gLz2a1Fh8R-AHpUR25jRWPJJGnLv6IItSIUCYOpw2uUfD7F8azIQD5iPjCn0BjrRHmyRykji59geo6qO950zK2SC3banmmTEeCxbAt9ZzG1O3wfPjflblz8q7HYCA',
        alt: 'Expansive scenic valley of Dzukou on Manipur Senapati border with undulating hills of dwarf bamboo carpets, meandering crystalline mountain streams, and wispy clouds.',
        badge: 'CIR-09 • ZERO PLASTIC',
        tone: 'primary',
        rating: '★ 4.99 Eco Icon',
        location: 'Senapati District Border • 90 km',
        title: 'Dzükou Valley South Alpine Corridor',
        description: 'The high-altitude valley of flowers (2,452m) carpeted in dwarf bamboo, seasonal rhododendrons, and rare white Dzükou lilies with strict zero-waste entry protocols.',
        tags: [
            '3D / 2N Alpine Trek',
            'Trash Security Deposit',
            'Capacity: 60 Trekkers/Day',
        ],
        action: ['shield_with_heart', 'Reserve Eco-Slot'],
    },
    {
        id: 'cir-10',
        category: 'ramsar',
        district: 'Tengnoupal',
        duration: 'short',
        permit: 'special',
        name: 'Yangoupokpi Lokchao Wildlife Sanctuary Moreh Border',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_ohWNluNLlBOiatLjTAaUpLKoTq_KdAySsMhbzNcOct-duuvNGg-ihOvCVyjg66BqDgMdk8frHNsD98mUdoFeawJBr6jkt2mao_c3KbXo4VKMVpYOLV5Prtn9UGpheqwb7V7f3AMSvx_T5etvGNHnG93tCD1Bo4rH4AnF8i-G_-mesGTUtKbDhKD8uXetaEkQRiBlNcP630gNANeCLiTdgdQyfPPolOaxf4QwupcFGucRC0qYUSMf2g',
        alt: 'Thick sub-tropical forest canopy of Lokchao Wildlife Sanctuary in Tengnoupal Manipur with rays of light penetrating green trees and bamboo groves along a tranquil jungle stream.',
        badge: 'CIR-10 • BIODIVERSITY',
        tone: 'primary',
        rating: '★ 4.86 Rating',
        location: 'Tengnoupal / Moreh • 110 km',
        title: 'Yangoupokpi Lokchao Sanctuary',
        description: 'The southernmost biological conduit connecting Indo-Burma ecosystems; home to Malayan sun bears, serow, slow loris, and diverse cross-border migratory birds.',
        tags: [
            '2D / 1N Wildlife Trail',
            'Wildlife Division Pass',
            'Armed Forest Escort',
        ],
        action: ['pets', 'Forest Safari Pass'],
    },
    {
        id: 'cir-11',
        category: 'tribal',
        district: 'Ukhrul',
        duration: 'day',
        permit: 'standard',
        name: 'Longpi Serpentine Stone Pottery Village Ukhrul Nungbi',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKKbcVSI1ZBCa4SR_ReNumOO0BORSFRWbI4NTN5O8CPFauODBjt5qCRQlWyAM6ROnab4kT2amwbntnpTf2WZ2iMrQJqmkvG_s0BySge0OrLfeZ8dmE5K4CVuxQLBJAtRC5AMADQ3AngwV0lRnplNM1yxK-tjtVct0H6OEbODorul4NBJDmZUmahNVF-RxasQSsUIEwS3iJAoV2TufLVPCUmd314biAPcWDLX-qg7Z-43wkO3uBhlm5nw',
        alt: 'Artisanal black stone pottery vessels crafted from serpentine rock and weathered clay drying outside a traditional Tangkhul wooden home in Longpi village Manipur under soft sunlight.',
        badge: 'CIR-11 • CRAFT RESERVE',
        tone: 'primary',
        rating: '★ 4.93 Heritage',
        location: 'Ukhrul District • 120 km from Imphal',
        title: 'Longpi (Nungbi) Serpentine Pottery Corridor',
        description: "The Neolithic craft sanctuary of Tangkhul Naga masters who hand-mold lustrous black cookware using pulverized serpentine stone and river clay without a potter's wheel.",
        tags: [
            '1 Day Cultural Excursion',
            'Standard e-ILP',
            'Master Artisan Studio Tour',
        ],
        action: ['carpenter', 'Book Craft Residency'],
    },
    {
        id: 'cir-12',
        category: 'peaks',
        district: 'Tamenglong',
        duration: 'short',
        permit: 'special',
        name: 'Bunning Ecological Meadow Grasslands Tamenglong Orchid',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAP5JtacehtzLL7_1y8M66GCXPo7vkBAygMi6tDGGu_9c8PKALPIfjPul0l3QvCpL2kC9PP-ixVcTzjE-GaJog2_Q_RPxP4hjXJy51F-B2WrbOtVjI7Dm4bgpxFnQLc3v9sS83ft8PQWGCzEii9W1QZO5Gtyhv69uJOCZ6gKowIVKb3pH-u41Q-rY-KhIR1-tI9GuLW2iW0Owrefne8cSAAZA5Yxw_GzTwoLSd_GHFrLmnjlPxmVEc2Lw',
        alt: 'Undulating green alpine hills and grassy knolls of Bunning meadow in Tamenglong Manipur, dotted with wild orchids and wild mountain blooms under soft overcast skies.',
        badge: 'CIR-12 • MEADOW',
        tone: 'primary',
        rating: '★ 4.91 Rating',
        location: 'Western Tamenglong • 155 km',
        title: 'Bunning Meadow & Wild Orchid Grasslands',
        description: 'Vast undulating emerald grassy mounds evoking Scottish moors, blooming with thousands of wild epiphytic orchids, lilies, and rare alpine butterflies during post-monsoon.',
        tags: ['2D / 1N Eco-Camp', 'Eco-Camp Permit', 'Leave-No-Trace Zone'],
        action: ['nature', 'Camp Registration'],
    },
    {
        id: 'cir-13',
        category: 'caves',
        district: 'Noney',
        duration: 'short',
        permit: 'guide',
        name: 'Brok Khoupum Valley Waterfall Trail Noney Ronmei',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCs-ZI1GxCQ9JmwhyCT-9RbX_Ii3XAfwEzUgIwicUdykBAkSizNXQzHkvhTSYbOC7UMhNV6PIaOEPU8vA4eB5XbxlXLIQPM1E0-xFrDl0Y07i6nULcUTEzbSZOApR5nXX0biBVROZZrEY5q04HEVUBM0g5zrOIw7atI3sBKu3MrBFkVrHcbDxvcM1kVZkQyV-3s7u8yTg0UIUsAHD00mhVAbxsHqeZYn-dg36RrnZgmdprtmnIOLjEWMA',
        alt: 'Picturesque Khoupum valley in Noney Manipur featuring ancient bamboo suspension footbridge spanning a clear jade river near deep forested gorges and hidden water falls.',
        badge: 'CIR-13 • GORGE TRAIL',
        tone: 'primary',
        rating: '★ 4.89 Rating',
        location: 'Noney District • 82 km from Imphal',
        title: 'Khoupum Valley & Brok Water Cataracts',
        description: 'Secluded Ronmei tribal river valley framed by deep karst rock ravines, pristine stepped waterfalls, and historic earthen irrigation dams engineered centuries ago.',
        tags: [
            '2D / 1N River Valley',
            'Tribal Guide Protocol',
            'Village Homestay Certified',
        ],
        action: ['cabin', 'Homestay & Guide'],
    },
    {
        id: 'cir-14',
        category: 'heritage',
        district: 'Senapati',
        duration: 'day',
        permit: 'standard',
        name: 'Willong Khullen Megalithic Stone Monoliths Senapati',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8HhhPfeHGaT9eTOROp4A7M1kuDxy1CGKqsh08Pzb1zFKCqWFCEbDOBEXSqf72KoAPS-wkPs2ETf9GQptBaSm7O9u9nSnxJANMc1W45VnmaL4qj8s4eAU1JwW-V2BvLqRYRMQfWiCVNHb7I5R1OpPhAqDhgH2sTtMapMuFklW8fBrErNkM4dK-ypDAK83f1HTQ-dWDy2CB06xXwwaFquw4PxScvQjcatayAniilZGHUl9Oxv2YZnoR6Q',
        alt: 'Cluster of giant ancient stone monoliths standing vertically in high grassy plateau of Willong Khullen Senapati Manipur, reminiscent of Stonehenge under dramatic mountain clouds.',
        badge: 'CIR-14 • MEGALITHIC',
        tone: 'primary',
        rating: '★ 4.94 Archeo-Gem',
        location: 'Senapati District • 135 km',
        title: 'Willong Khullen Prehistoric Monoliths',
        description: 'Referred to as the "Stonehenge of Northeast India" with over 130 giant upright stone pillars erected by ancient Maram ancestors to honor legendary warriors and solar cycles.',
        tags: [
            '1 Day Archeo-Excursion',
            'Standard e-ILP',
            'ASI Heritage Monitored',
        ],
        action: ['account_balance', 'Heritage Guide'],
    },
    {
        id: 'cir-15',
        category: 'caves',
        district: 'Kangpokpi',
        duration: 'day',
        permit: 'standard',
        name: 'Leimaram Sadu Chiru Triple Waterfalls Kangpokpi',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSxhJsmo4Cu-selsBinB6QLMbfClBrl5YNOPBqWlNRh8dSpGQ8I9wlwoxloP4UZaRbqYaczybvkSiVXI-HjQoE71I3Kbsqi3FvM3sggl4tq3-yxU8wz4bW3bnf5MuaL6JemNHXFqEho2y2cVOP9hP3ln6Fus5rcDV9Ea6nFAqDL-msNr5ir31jfB-KztaIGWhsueo7PYoooYzmZ7rfaLde8PDhDvu6qZ8-0HMKvcqL0p10XIFM2rMClQ',
        alt: 'Multi-tiered dramatic Leimaram Sadu Chiru waterfalls tumbling down lush green moss-covered rock cliffs in Kangpokpi Manipur into clear mountain pools.',
        badge: 'CIR-15 • CASCADE',
        tone: 'primary',
        rating: '★ 4.85 Rating',
        location: 'Kangpokpi • 29 km from Capital',
        title: 'Sadu Chiru (Leimaram) Triple Cascades',
        description: 'A pristine three-stage cascade through dense fern-laden valley ravines. Features eco-restored natural stone walking paths and regulated river bath zones.',
        tags: ['Half Day Eco-Walk', 'Standard e-ILP', 'Family Accessible Trail'],
        action: ['directions_walk', 'Eco Trail Entry'],
    },
    {
        id: 'cir-16',
        category: 'ramsar',
        district: 'Pherzawl',
        duration: 'short',
        permit: 'special',
        name: 'Tuila River Tipaimukh Waterway Pherzawl Barak Confluence',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLBLg2DTentyXfRGYyftQoiD4QYupVWbZ21Pn-V-kx8BH20aMce7W8i4IwlBsyBpCm7DsOnQU8p-j10f8ST538Jb8KSr-JKb10mkU6QNZS8G7xrWO8PjuZxT0_zQVBjO5zBSp1Np7mI6sx7h_l6bwrHMxVVfvhsxwLs99vkxV5HVdjtKc_bIVXRaeT4ZNVPGnYqZIeuipUxLMYxkcCKcwgpV-nf9T-RfB4Wd-QPB00YkLKwYVBALo9WA',
        alt: 'Broad winding scenic river confluence of Barak and Tuivai rivers at Tipaimukh in Pherzawl Manipur surrounded by untamed virgin jungle ridges and quiet traditional wooden canoes.',
        badge: 'CIR-16 • RIVERINE',
        tone: 'secondary',
        rating: '★ 4.88 High Frontier',
        location: 'Pherzawl District • 210 km',
        title: 'Tuila River & Tipaimukh Confluence',
        description: 'The grand meeting point of the Barak and Tuivai rivers flowing through untouched Hmar and Zomi tribal highlands, offering premier riverine rafting and remote angling.',
        tags: ['3D / 2N River Safari', 'Special Eco-Permit', 'Kayaking Certified'],
        action: ['kayaking', 'River Expedition'],
    },
    {
        id: 'cir-17',
        category: 'peaks',
        district: 'Kangpokpi',
        duration: 'day',
        permit: 'standard',
        name: 'Singda Dam Forest Eco Trail Mud Dam Birdwatching',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTAN021nbsgwSLBUewVlPR6PO-zVHY4i8XKCG34jxc3MDLjV-36YKSKryqj4FuDZm5HWADW6kHGTIvz2R_XBut0rrRTQr3uARM6yHF0358NeIdSnFEant73IiGqSLXgdaGgX9oWfYU7fqzLJ3ZhsC2iRUB8CSqfFALHwD5JbM-gf0XGnfSyz0qUIKbHgV1gAdZGq8lYh3D0j9CkVhYvV8z7mC0PgYQsEZaU0uHQSa_RddpyjF0E11wCQ',
        alt: 'Serene panoramic view of Singda reservoir lake surrounded by emerald forested hills in Kangpokpi Manipur, with rustic wooden birding pavilion along the shoreline.',
        badge: 'CIR-17 • ECO-LAKE',
        tone: 'primary',
        rating: '★ 4.82 Rating',
        location: 'Kangpokpi Border • 16 km from Capital',
        title: 'Singda Dam & Highland Forest Trail',
        description: "The world's highest mud-rock fill dam set 920 meters above sea level, wrapped in dense mixed deciduous forests offering birdwatching trails and silent meditative retreats.",
        tags: ['1 Day Nature Excursion', 'Standard e-ILP', 'Bird Sanctuary Trail'],
        action: ['visibility', 'Reserve Day Pass'],
    },
    {
        id: 'cir-18',
        category: 'heritage',
        district: 'Thoubal',
        duration: 'day',
        permit: 'standard',
        name: 'Kaina Sacred Hill Temple Grove Jackfruit Govindaji Thoubal',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ1MiPxUM9Cj2cBpmkRylEErW_XyWwe2TnB5fN5MhW8ph-O_In5nzPhmlnBJfxXORLK97Kp_bXB2Un-vb7VwzZmj4ID4fOYSxWQ1IHPAFf8-A0IAq2ZcFigrj_KUxj2L6YlRMLM1D0GqyUY0d_0HlZBBBdFFs4wEyoVpj0t8jUCwvMuJpvVLthM9-9fB00LX-K1KIztII1upP4mK7fAnBH5WP_mHeh1cvSBvTG4FBrdqzANivJrrCGzg',
        alt: 'Spiritual hilltop grove of Kaina in Thoubal Manipur with centuries-old sacred jackfruit trees surrounding a traditional Meitei temple courtyard surrounded by rolling green foothills.',
        badge: 'CIR-18 • SACRED GROVE',
        tone: 'primary',
        rating: '★ 4.90 Rating',
        location: 'Thoubal District • 29 km from Imphal',
        title: 'Kaina Sacred Hill & Divine Jackfruit Grove',
        description: 'The hallowed mountain retreat where Maharaja Bhagyachandra envisioned Lord Govindaji in 1776, culminating in the consecration of sacred jackfruit-wood deities and Manipuri Raas Leela.',
        tags: [
            'Half / 1 Day Pilgrim Trail',
            'Standard e-ILP',
            'Raas Leela Heritage',
        ],
        action: ['volunteer_activism', 'Sacred Visit Pass'],
    },
];

const categories = [
    ['all', 'All Circuits (18)'],
    ['ramsar', 'Ramsar & Wetlands (3)'],
    ['peaks', 'Sacred Peaks & Ridges (5)'],
    ['heritage', 'Royal & WWII Peace (4)'],
    ['caves', 'Caves & Karst (3)'],
    ['tribal', 'Tribal Craft Corridors (3)'],
];
const permits = [
    ['all', 'All Clearance Types'],
    ['standard', 'Standard e-ILP Only'],
    ['special', 'Special Eco-Permit Required'],
    ['guide', 'Forest Guide Mandatory'],
];
const durations = [
    ['all', 'Any Duration'],
    ['day', 'Day Excursions (Half / Full Day)'],
    ['short', 'Short Expeditions (2D1N - 3D2N)'],
    ['extended', 'Multi-Day Trekking (4D3N+)'],
];
const districts = [
    'all',
    'Bishnupur',
    'Imphal West',
    'Imphal East',
    'Ukhrul',
    'Tamenglong',
    'Senapati',
    'Tengnoupal',
    'Noney',
    'Kangpokpi',
    'Pherzawl',
    'Thoubal',
];

function CircuitCard({ circuit, onWaypoints, onNavigate }) {
    const badgeColor = circuit.tone === 'secondary'
        ? 'text-secondary'
        : 'text-primary';
    const dotColor = circuit.tone === 'secondary'
        ? 'bg-secondary'
        : 'bg-primary-container';
    return (
        <article
            onClick={() => {
                if (circuit.id === 'cir-01') {
                    onNavigate('/destination/loktak');
                }
            }}
            className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_4px_16px_-2px_rgba(10,92,74,0.06),0_1px_3px_0_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
        >
            <div className="relative h-56 w-full overflow-hidden">
                <img
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    src={circuit.image}
                    alt={circuit.alt}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-container/85 via-transparent to-black/30" />
                <div
                    className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md ${badgeColor} font-label-sm text-label-sm font-bold shadow-sm`}
                >
                    <span className={`w-2 h-2 rounded-full ${dotColor}`} />{circuit.badge}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-tertiary-container/90 text-on-tertiary-container font-label-sm text-label-sm font-bold shadow-sm">
                    {circuit.rating}
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-on-primary">
                    <span className="text-xs uppercase tracking-wider text-primary-fixed font-bold font-label-sm">
                        {circuit.location}
                    </span>
                    <h2 className="font-headline-sm text-headline-sm text-on-primary font-bold leading-tight drop-shadow-sm">
                        {circuit.title}
                    </h2>
                </div>
            </div>
            <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                <p className="font-body-md text-body-md text-on-surface-variant">
                    {circuit.description}
                </p>
                <div className="flex flex-wrap gap-2 text-label-sm font-label-sm">
                    {circuit.tags.map((tag, i) => (
                        <span
                            key={tag}
                            className={`px-2.5 py-1 rounded bg-surface-container ${i === 1 ? 'text-secondary' : 'text-primary'} font-semibold`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="pt-3 border-t border-surface-container flex items-center justify-between gap-2">
                    <button
                        type="button"
                        onClick={() => onWaypoints(circuit.title)}
                        className="px-3.5 py-2 rounded-lg bg-surface-container-low text-primary hover:bg-surface-container font-label-md text-label-md font-semibold transition-colors flex items-center gap-1.5"
                    >
                        <span className="material-symbols-outlined text-[18px]">route</span>
                        Waypoints
                    </button>
                    <button
                        type="button"
                        className="px-3.5 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            {circuit.action[0]}
                        </span>
                        {circuit.action[1]}
                    </button>
                </div>
            </div>
        </article>
    );
}

export default function ExploreManipur() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [district, setDistrict] = useState('all');
    const [permit, setPermit] = useState('all');
    const [duration, setDuration] = useState('all');
    const [modal, setModal] = useState(null);
    const navigate = useNavigate();
    const filtered = useMemo(
        () => {
            const q = search.toLowerCase().trim();
            return circuits.filter(
                c =>
                    (category === 'all' || c.category === category) &&
                    (!q ||
                        c.name.toLowerCase().includes(q) ||
                        c.district.toLowerCase().includes(q)) &&
                    (district === 'all' || c.district === district) &&
                    (permit === 'all' || c.permit === permit) &&
                    (duration === 'all' || c.duration === duration)
            );
        },
        [search, category, district, permit, duration]
    );
    const reset = () => {
        setSearch('');
        setCategory('all');
        setDistrict('all');
        setPermit('all');
        setDuration('all');
    };
    return (
        <>
            <TelemetryBar />
            <main className="w-full pt-20 bg-surface min-h-screen">
                <section className="w-full bg-surface-container-low/60 pt-8 pb-10 px-5 md:px-12">
                    <div className="max-w-[1320px] mx-auto">
                        <nav className="flex items-center gap-2 mb-4 text-outline font-label-md text-label-sm">
                            <a className="hover:text-primary transition-colors" href="/">
                                Home
                            </a>
                            <span className="material-symbols-outlined text-[14px]">
                                chevron_right
                            </span>
                            <span>Protected Circuits</span>
                            <span className="material-symbols-outlined text-[14px]">
                                chevron_right
                            </span>
                            <span className="text-primary font-bold">
                                All 18 Corridors Directory
                            </span>
                        </nav>
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
                            <div className="max-w-3xl">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-3">
                                    <span className="material-symbols-outlined text-[16px]">
                                        park
                                    </span>
                                    <span className="font-label-sm text-label-sm tracking-wider uppercase font-bold">
                                        Ecological Heritage Registry
                                    </span>
                                </div>
                                <h1 className="font-display-lg text-headline-lg md:text-display-lg text-primary tracking-tight font-bold">
                                    All 18 Protected Circuits of Manipur
                                </h1>
                                <p className="font-body-lg text-body-lg text-on-surface-variant mt-3 leading-relaxed">
                                    Explore state-protected sacred hill sanctuaries, Ramsar wetland corridors, WWII peace heritage lines, and indigenous bio-cultural reserves strictly managed under ecological carrying capacity frameworks.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
                                <div className="flex items-center gap-3 p-3 bg-surface-container-lowest rounded-xl shadow-sm">
                                    <div className="w-10 h-10 rounded-lg bg-primary-container/15 flex items-center justify-center text-primary-container">
                                        <span className="material-symbols-outlined text-[24px]">
                                            verified_user
                                        </span>
                                    </div>
                                    <div>
                                        <div className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                                            Regulated Access
                                        </div>
                                        <div className="font-headline-sm text-headline-sm text-primary font-bold">
                                            100% Bio-Audited
                                        </div>
                                    </div>
                                </div>
                                <a
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md hover:bg-secondary/95 shadow-sm transition-all"
                                    href="#permit-advisory"
                                >
                                    <span className="material-symbols-outlined text-[18px]">
                                        badge
                                    </span>
                                    Inner Line Permit (e-ILP) Guidelines
                                </a>
                            </div>
                        </div>
                        <div className="bg-surface-container-lowest rounded-2xl p-4 md:p-6 shadow-[0_4px_24px_-2px_rgba(10,92,74,0.08)] flex flex-col gap-5">
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[22px]">
                                    search
                                </span>
                                <input
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="w-full pl-12 pr-10 py-3.5 bg-surface-container-low rounded-xl text-on-surface font-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container transition-all"
                                    placeholder="Search circuit by name, district (e.g. Ukhrul, Bishnupur, Tamenglong, Imphal...), or keyword..."
                                />
                                {search &&
                                    <button
                                        type="button"
                                        onClick={() => setSearch('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-outline"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">
                                            close
                                        </span>
                                    </button>}
                            </div>
                            <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
                                {categories.map(([v, l]) => (
                                    <button
                                        key={v}
                                        type="button"
                                        onClick={() => setCategory(v)}
                                        className={`shrink-0 px-4 py-2 rounded-full font-label-md text-label-md transition-all ${category === v ? 'bg-primary-container text-on-primary shadow-sm' : 'bg-surface-container-low text-on-surface hover:bg-surface-container'}`}
                                    >
                                        {l}
                                    </button>
                                ))}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-surface-container-high/60">
                                <Select
                                    label="District Domain"
                                    value={district}
                                    onChange={setDistrict}
                                    options={districts.map(d => [
                                        d,
                                        d === 'all'
                                            ? 'All 16 Districts'
                                            : d === 'Tengnoupal' ? 'Tengnoupal / Moreh' : d,
                                    ])}
                                />
                                <Select
                                    label="Permit Clearance"
                                    value={permit}
                                    onChange={setPermit}
                                    options={permits}
                                />
                                <Select
                                    label="Expedition Scale"
                                    value={duration}
                                    onChange={setDuration}
                                    options={durations}
                                />
                            </div>
                            <div className="flex items-center justify-between text-body-sm text-outline pt-1 gap-4">
                                <span className="font-semibold text-primary">
                                    Showing {filtered.length} of 18 Protected Circuits
                                </span>
                                <button
                                    type="button"
                                    onClick={reset}
                                    className="font-label-sm text-label-sm text-secondary hover:underline flex items-center gap-1 shrink-0"
                                >
                                    <span className="material-symbols-outlined text-[14px]">
                                        restart_alt
                                    </span>
                                    Reset Filters
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-10 px-5 md:px-12 bg-surface">
                    <div className="max-w-[1320px] mx-auto">
                        {filtered.length
                            ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filtered.map(c => (
                                    <CircuitCard
                                        key={c.id}
                                        circuit={c}
                                        onWaypoints={setModal}
                                        onNavigate={navigate}
                                    />
                                ))}
                            </div>
                            : <div className="text-center py-16 px-4 bg-surface-container-lowest rounded-2xl shadow-sm">
                                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mx-auto mb-4 text-outline">
                                    <span className="material-symbols-outlined text-[32px]">
                                        travel_explore
                                    </span>
                                </div>
                                <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                                    No Protected Circuits Match Your Criteria
                                </h3>
                                <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-md mx-auto">
                                    Try clearing your search keyword, choosing "All 16 Districts", or resetting your filter pills.
                                </p>
                                <button
                                    type="button"
                                    onClick={reset}
                                    className="mt-6 px-5 py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors"
                                >
                                    Reset All Filters
                                </button>
                            </div>}
                    </div>
                </section>
                <CapacitySection /><PermitSection />
                {modal &&
                    <WaypointsModal title={modal} onClose={() => setModal(null)} />}
            </main>
        </>

    );
}

function Select({ label, value, onChange, options }) {
    return (
        <div className="relative">
            <label className="block font-label-sm text-label-sm text-outline font-semibold mb-1 uppercase">
                {label}
            </label>
            <select
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-surface-container-low text-on-surface rounded-lg font-body-md appearance-none focus:outline-none focus:ring-1 focus:ring-primary-container cursor-pointer"
            >
                {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-[34px] pointer-events-none text-outline text-[18px]">
                expand_more
            </span>
        </div>
    );
}
function CapacitySection() {
    return (
        <section className="w-full py-12 px-5 md:px-12 bg-surface-container-low">
            <div className="max-w-[1320px] mx-auto">
                <div className="bg-surface-container-lowest rounded-3xl p-6 md:p-10 shadow-[0_12px_32px_-4px_rgba(10,92,74,0.08)]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-6 flex flex-col gap-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary w-fit">
                                <span className="material-symbols-outlined text-[16px]">
                                    sensors
                                </span>
                                <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider">
                                    Dynamic Geo-Telemetry
                                </span>
                            </div>
                            <h2 className="font-headline-lg text-headline-lg text-primary font-bold">
                                Real-Time Carrying Capacity & Bio-Audit System
                            </h2>
                            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                Every circuit is strictly regulated under the
                                {' '}
                                <em>Manipur Eco-Tourism Conservation Directive 2024</em>
                                . Daily entry quota limits prevent soil compaction on high peaks, preserve water quality across phumdis, and safeguard tribal sanctity.
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                                <Stat
                                    label="State Total Cap"
                                    value="1,250 / day"
                                    note="Across all 18 nodes"
                                />
                                <Stat
                                    label="Active Eco-Guides"
                                    value="314 Certified"
                                    note="Indigenous naturalists"
                                    secondary
                                />
                                <Stat
                                    label="Plastic Infiltration"
                                    value="0.00%"
                                    note="100% Bag deposit check"
                                />
                            </div>
                        </div>
                        <div className="lg:col-span-6 bg-surface-container-low/70 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-label-md text-label-md text-on-surface font-bold">
                                    Current Daily Quota Utilization
                                </span>
                                <span className="px-2 py-0.5 rounded bg-primary text-on-primary font-label-sm text-label-sm font-semibold">
                                    Live Feed
                                </span>
                            </div>
                            <Bar
                                label="Keibul Lamjao (Ramsar Wetland)"
                                value="288 / 400 slots (72%)"
                                width="72%"
                            />
                            <Bar
                                label="Shirui Kashong High Peak (Ukhrul)"
                                value="72 / 85 slots (85%) - Near Cap"
                                width="85%"
                                secondary
                            />
                            <Bar
                                label="Dzükou South Corridor (Senapati)"
                                value="36 / 60 slots (60%)"
                                width="60%"
                            />
                            <Bar
                                label="Zeilad Rainforest & Karst Caves"
                                value="18 / 40 slots (45%)"
                                width="45%"
                            />
                            <div className="mt-5 p-3 rounded-lg bg-surface-container-lowest text-outline flex items-center gap-2 font-body-sm text-body-sm">
                                <span className="material-symbols-outlined text-tertiary-fixed-dim text-[20px]">
                                    info
                                </span>
                                <span>
                                    Slots refresh daily at 00:00 IST. Advanced reservation recommended 48h prior for alpine peaks.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
function Stat({ label, value, note, secondary }) {
    return (
        <div className="p-3.5 rounded-xl bg-surface-container-low">
            <span className="text-xs font-label-sm uppercase font-bold text-outline">
                {label}
            </span>
            <div className="font-headline-sm text-headline-sm text-primary font-bold mt-1">
                {value}
            </div>
            <span
                className={`text-xs font-semibold ${secondary ? 'text-secondary' : 'text-primary'}`}
            >
                {note}
            </span>
        </div>
    );
}
function Bar({ label, value, width, secondary }) {
    return (
        <div className="mb-4">
            <div className="flex justify-between gap-3 text-body-sm text-on-surface mb-1">
                <span className="font-semibold">{label}</span>
                <span
                    className={
                        secondary ? 'text-secondary font-bold' : 'text-primary font-bold'
                    }
                >
                    {value}
                </span>
            </div>
            <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full ${secondary ? 'bg-secondary' : 'bg-primary-container'}`}
                    style={{ width }}
                />
            </div>
        </div>
    );
}
function PermitSection() {
    return (
        <section
            className="w-full py-12 px-5 md:px-12 bg-surface"
            id="permit-advisory"
        >
            <div className="max-w-[1320px] mx-auto">
                <div className="relative rounded-3xl overflow-hidden bg-primary text-on-primary p-8 md:p-12 shadow-2xl">
                    <svg
                        className="absolute -right-20 -bottom-20 w-96 h-96 text-primary-container/40 pointer-events-none"
                        fill="currentColor"
                        viewBox="0 0 200 200"
                    >
                        <circle
                            cx="100"
                            cy="100"
                            r="90"
                            fill="none"
                            stroke="currentColor"
                            strokeDasharray="8 8"
                            strokeWidth="4"
                        />
                        <circle
                            cx="100"
                            cy="100"
                            r="60"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                        />
                        <circle cx="100" cy="100" r="30" fill="currentColor" />
                    </svg>
                    <div className="relative z-10 max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container text-on-primary mb-4">
                            <span className="material-symbols-outlined text-[18px]">
                                verified
                            </span>
                            <span className="font-label-sm text-label-sm tracking-wider uppercase font-bold">
                                Statutory Traveler Advisory
                            </span>
                        </div>
                        <h2 className="font-headline-lg text-headline-lg font-bold tracking-tight">
                            Government e-ILP & Ecological Entry Protocol
                        </h2>
                        <p className="font-body-lg text-body-lg text-on-primary/85 mt-3 leading-relaxed">
                            All domestic and international travelers visiting any of Manipur's 18 protected circuits require an official Inner Line Permit (e-ILP). Furthermore, high-altitude and Ramsar circuits require designated local indigenous naturalists to ensure zero ecological degradation.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
                            <Advice
                                icon="fact_check"
                                title="1. Digital e-ILP"
                                text="Instant issuance for Indian nationals and registered foreign researchers online."
                            />
                            <Advice
                                icon="no_drinks"
                                title="2. Waste Deposit"
                                text="Mandatory ₹500 returnable waste deposit at Dzükou and Shirui baseline checkpoints."
                            />
                            <Advice
                                icon="military_tech"
                                title="3. Tribal Guide Mandate"
                                text="Karst caves & cloud ridges must be accompanied by village eco-council guides."
                            />
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <button
                                type="button"
                                className="px-6 py-3.5 rounded-xl bg-secondary hover:bg-secondary/90 text-on-secondary font-label-lg text-label-lg font-bold shadow-lg transition-all flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    badge
                                </span>
                                Apply e-ILP Permit Online (2-Min Approval)
                            </button>
                            <a
                                className="px-6 py-3.5 rounded-xl bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 text-on-primary font-label-lg text-label-lg font-semibold backdrop-blur-sm transition-all flex items-center gap-2"
                                href="tel:18003453885"
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    call
                                </span>
                                24/7 Permit Cell: 1800-345-3885
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
function Advice({ icon, title, text }) {
    return (
        <div className="p-4 rounded-xl bg-primary-container/40 backdrop-blur-sm flex flex-col gap-1.5">
            <span className="material-symbols-outlined text-tertiary-fixed text-[24px]">
                {icon}
            </span>
            <h3 className="font-label-lg text-label-lg font-bold">{title}</h3>
            <p className="text-xs text-on-primary/75">{text}</p>
        </div>
    );
}
function WaypointsModal({ title, onClose }) {
    return (
        <div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            onClick={e => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-surface-container-lowest rounded-2xl max-w-xl w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-5 right-5 w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline hover:text-on-surface"
                >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
                <div className="flex items-center gap-2 text-label-sm text-secondary font-bold uppercase mb-1">
                    <span className="material-symbols-outlined text-[16px]">
                        navigation
                    </span>
                    Official Circuit Waypoints
                </div>
                <h3 className="font-headline-md text-headline-md text-primary font-bold mb-2">
                    {title} — Official Waypoints
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                    Detailed waypoint itinerary, security checkpoints, water stations, and certified indigenous naturalist staging areas.
                </p>
                <div className="space-y-4 mb-6">
                    <Waypoint
                        n="1"
                        title="Base Staging & Biometric Clearance"
                        text="Inner Line Permit verification, water flask inspection & naturalist assignment."
                    />
                    <Waypoint
                        n="2"
                        title="Core Bio-Sanctuary Sanctuary Passage"
                        text="Strict non-intrusive trails, designated photography blinds & medicinal flora observation."
                    />
                    <Waypoint
                        n="3"
                        title="Eco-Camp & Heritage Homestay Node"
                        text="Community-run solar lodging, traditional indigenous cuisine & folk narrative session."
                    />
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-surface-container">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2.5 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-high"
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container shadow-sm"
                    >
                        Download PDF Guide
                    </button>
                </div>
            </div>
        </div>
    );
}
function Waypoint({ n, title, text }) {
    return (
        <div className="p-3.5 rounded-xl bg-surface-container-low flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold shrink-0">
                {n}
            </span>
            <div>
                <span className="font-label-md text-label-md font-bold text-on-surface">
                    {title}
                </span>
                <p className="text-xs text-outline mt-0.5">{text}</p>
            </div>
        </div>
    );
}
