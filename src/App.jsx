import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Search, ChevronLeft, ChevronRight, X, ChevronDown, ArrowLeft, User, ExternalLink } from "lucide-react";

// ════════════════════════════════════════════════════════
// SPEAKER DATA — scraped from kikk.be (2011–2024)
// In production: replace with Strapi API calls
// ════════════════════════════════════════════════════════
const SPEAKERS_DB = {"2011":[{"id":201100,"name":"Ben Hammersley","subtitle":"Editor-at-Large, WIRED Magazine","img":"/speakers/2011/hammersey-01.jpg","bio":"Ben Hammersley is Editor-at-Large of WIRED magazine, and an international advisor on the internet and digital media."},{"id":201101,"name":"Lernert & Sander","subtitle":"Artists & Directors","img":"/speakers/2011/lenert-01.jpg","bio":"Lernert & Sander are two dutch artists and friends who decided that working alone was getting boring and started collaborating on art related projects."},{"id":201102,"name":"Anne-Sophie Fradier","subtitle":"Designer typographe","img":"/speakers/2011/fradier-01-1.jpg","bio":"Amoureuse de la lettre avant tout, j'ai exploré le design Web en autodidacte pendant plusieurs années avant de renouer avec ma passion première pour le papier, la calligraphie et la typographie."},{"id":201103,"name":"Filip Visnjic","subtitle":"Editor, Creative Applications","img":"/speakers/2011/visjnic-new-01.jpg","bio":"Filip Visnjic is an architect, lecturer and a new media technologist born in Belgrade now living in London."},{"id":201104,"name":"Andrew Zolty","subtitle":"Creative Director, Breakfast NYC","img":"/speakers/2011/zolty-1.jpg","bio":"Zolty is the Creative Director and co-founder of New York based BREAKFAST – a tech company focused on helping the world better utilize customized devices."},{"id":201105,"name":"Hector Ayuso","subtitle":"Director, OFFF Festival","img":"/speakers/2011/hector-new-01-1.jpg","bio":"Le festival OFFF est une entité en perpétuel mouvement et renouvellement, dont 2011 est l'année Zéro."},{"id":201106,"name":"Multitouch Barcelona","subtitle":"Interaction Design Studio","img":"/speakers/2011/multi-01.jpg","bio":"Multitouch-Barcelona is an interaction design studio exploring natural communication between people and technology."},{"id":201107,"name":"Niklas Roy","subtitle":"Artist & Inventor","img":"/speakers/2011/roy-01.jpg","bio":"Niklas Roy focuses on building artistic electro mechanical sculptures, machines and devices."},{"id":201108,"name":"Jakob Kahlen","subtitle":"Creative Director, Hello Monday","img":"/speakers/2011/jakob-01.jpg","bio":"Jakob Kahlen is a digital Creative Director based in Copenhagen Denmark."},{"id":201109,"name":"Jul & Mat","subtitle":"Directors","img":"/speakers/2011/juletmat-01.jpg","bio":"We focus on high impact, light images. Working with cut up pasteboard, glued together with After Effects."},{"id":201110,"name":"Benjamin De Cock","subtitle":"Designer, Deaxon","img":"/speakers/2011/thumb-speaker-huge.jpg","bio":"Benjamin est un designer freelance d'applications web, Mac OS et iOS. Il se spécialise dans la création d'icônes et d'interfaces utilisateurs."},{"id":201111,"name":"Damien Van Achter","subtitle":"Développeur éditorial, OWNI.fr","img":"/speakers/2011/damien-01.jpg","bio":"Journaliste et développeur éditorial, je travaille depuis début 2011 pour la société 22mars, éditrice du site OWNI.fr."},{"id":201112,"name":"Nico Perez","subtitle":"Designer, Mixcloud","img":"/speakers/2011/nico-perez-01.jpg","bio":"Nico Perez is a web designer, former radio show host, DJ, breakdancer and the guy behind the Mixcloud design."},{"id":201113,"name":"Julien Mourlon","subtitle":"Consultant digital, Laid Back","img":"/speakers/2011/mourlon-01.jpg","bio":"Julien Mourlon est consultant en communication digitale et passionnée de radio, de musique et de culture urbaine."},{"id":201114,"name":"Michael Seifert","subtitle":"Creative Director, Jung von Matt/next","img":"/speakers/2011/michael-01.jpg","bio":"Michael Seifert is teaching digital communication at the University of Art / Hochschule für Bildende Künste Braunschweig."},{"id":201115,"name":"Benjamin Bayart","subtitle":"Président, French Data Network","img":"/speakers/2011/bayart-01-1.jpg","bio":"Benjamin Bayart est expert en télécommunications et président de French Data Network."},{"id":201116,"name":"Paul Marique","subtitle":"Directeur artistique, Noussommesquatrevingt","img":"/speakers/2011/marique-01.jpg","bio":"Paul Marique est directeur-artistique et membre fondateur du collectif Noussommesquatrevingt."},{"id":201117,"name":"Luc Deniaud","subtitle":"Consultant digital","img":"/speakers/2011/deniaux-01.jpg","bio":"Après un début de carrière chez l'annonceur au sein de Dell puis de la Française des Jeux, il rejoint l'agence de marketing digital FullSIX."},{"id":201118,"name":"Philippe Aigrain","subtitle":"Chercheur, Sopinspace","img":"/speakers/2011/aigrin-01.jpg","bio":"Philippe Aigrain est chercheur en informatique et analyste des questions politiques, sociales et culturelles liées aux TIC."},{"id":201119,"name":"Claire Lobet-Maris","subtitle":"Professeur en Faculté d'Informatique, UNamur","img":"/speakers/2011/lobet-01.jpg","bio":"Claire Lobet-Maris est docteur en Sociologie, Professeur en Faculté d'Informatique et Directrice de Recherche au CRIDS."},{"id":201120,"name":"Marc Stopnicki","subtitle":"Directeur pédagogique, MBA MCI","img":"/speakers/2011/stope-01.jpg","bio":"Fondateur du site des bonnes nouvelles www.newzitiv.com. Directeur pédagogique adjoint des MBA MCI à l'institut Léonard de Vinci."},{"id":201121,"name":"LAb[au]","subtitle":"Collectif d'artistes, Bruxelles","img":"/speakers/2011/labau-01.jpg","bio":"LAb[au] est un groupe d'artistes basé à Bruxelles, fondé en 1997 pour examiner l'influence des nouvelles technologies sur l'Art."},{"id":201122,"name":"Thomas Van Roy","subtitle":"Social Media Manager, Wanabe","img":"/speakers/2011/thomas-01.jpg","bio":"Thomas Van Roy is a Social Media addict, working since 2011 for Wanabe as Social Media Manager."},{"id":201123,"name":"André Loconte","subtitle":"Co-fondateur, NURPA","img":"/speakers/2011/nurpa-01.jpg","bio":"André Loconte est l'un des fondateurs et le porte-parole de l'association citoyenne NURPA."},{"id":201124,"name":"Olivier Laurelli","subtitle":"Expert sécurité, Toonux","img":"/speakers/2011/laurelli-01.jpg","bio":"Olivier Laurelli est expert en sécurité des systèmes d'information et dirige Toonux."},{"id":201125,"name":"Bart Rosseau","subtitle":"Communication Strategy, City of Ghent","img":"/speakers/2011/bart-01.jpg","bio":"Bart Rosseau joined the Ghent city administration in 1996 and has been in charge of its communication strategy since 2007."},{"id":201126,"name":"Jean-Marc Bourguignon","subtitle":"Hacker & activiste, Telecomix","img":"/speakers/2011/big-thumb.jpg","bio":"Jean-Marc Bourguignon est un hacker et activiste français, il participe notamment aux activités de Telecomix."},{"id":201127,"name":"Nicole Dewandre","subtitle":"Conseillère, Commission Européenne","img":"/speakers/2011/dewandre-01.jpg","bio":"Nicole Dewandre est conseillère à la Direction générale \"Société de l'information et media\" de la Commission européenne."},{"id":201128,"name":"Antoinette Rouvroy","subtitle":"Chercheuse, CRIDS / UNamur","img":"/speakers/2011/rouvroy-01.jpg","bio":"Antoinette Rouvroy est chercheuse qualifiée du FNRS et chercheuse senior au CRIDS (Université de Namur)."},{"id":201129,"name":"Kimi Do","subtitle":"Réalisatrice, Festival Narkolepsy","img":"/speakers/2011/do-01.jpg","bio":"Diplômée en Sociologie de l'Art, Kimi Do réalise des projets photos et vidéo en Asie."},{"id":201130,"name":"Jérémy Coxet","subtitle":"CEO, Vanksen Luxembourg","img":"/speakers/2011/vanksen-01.jpg","bio":"Jérémy Coxet: CEO of Vanksen Luxembourg. He graduated from HEC, Management & Technologies of Information."},{"id":201131,"name":"Françoise de Blomac","subtitle":"Géographe, Journaliste, SIG La Lettre","img":"/speakers/2011/blomac-01.jpg","bio":"Françoise de Blomac est à la fois géographe, cartographe et journaliste. Elle publie \"SIG La Lettre\"."},{"id":201132,"name":"Marie-Luce Goetz","subtitle":"Data journaliste, OWNI","img":"/speakers/2011/big-thumb.jpg","bio":"J'ai atterri chez OWNI il y a plus d'un an et j'y travaille surtout sur les questions de mise en scène des données."},{"id":201133,"name":"Hendrik De Vos","subtitle":"Open Data, Service public","img":"/speakers/2011/big-thumb.jpg","bio":"Bien avant qu'on ne parle d'Open Data, cette agence a construit un portail qui rassemble les informations publiques."}],"2012":[{"id":201200,"name":"James Hilton","subtitle":"Co-founder & CCO, AKQA","img":"/speakers/2012/james-hilton(1).png","bio":"James Hilton est l'un des directeurs créatifs les plus reconnus et respectés au monde. Depuis qu'il a cofondé AKQA en 1995, James a été à la pointe d'une industrie qui a vu la société grandir pour devenir la plus grande agence indépendante du monde. AKQA a des bureaux à Londres, Paris, Berlin, Amsterdam, New York, Washington DC, San Francisco, et Shanghai. En tant que leader mondial de la créativité, James a amassé une multitude de récompenses prestigieuses telles que le Grand Prix et le Gold Canne Lions. Il a aussi été juge"},{"id":201201,"name":"Geoffrey Dorne","subtitle":"Designer, Graphism.fr","img":"/speakers/2012/geoffrey-dorne.png","bio":"Graphic and digital designer, independent designer and researcher by practice, Geoffrey Dorne graduated with honors from Ensad (École Nationale Supérieure des Arts Décoratifs in Paris) in 2009. Geoffrey worked for the Mozilla Foundation, Wikimedia, the Atomic Energy Commission, Samsung, Orange Valley, cultural projects for the Agence numérique régionale d'Île-de-France, and Diateino editions. Geoffrey has a particular interest to the concepts, metaphors and users. Since 2010, Geoffrey was also a design researcher in the EnsadLab of Paris with a research project ( http://neen.fr ) focused on em"},{"id":201202,"name":"Paolo Ciuccarelli","subtitle":"Data Visualisation","img":"/speakers/2012/speaker-density.png","bio":"Associate Professor at Politecnico di Milano, he teaches at the Faculty of Design in the Communication Design master degree. He has been visiting lecturer at Universidad de Malaga and The Royal Institute of Art (KKH – Stockholm) and participated to several postgraduate courses in other universities.\nSince 2000 he represents the Faculty of Design in the European program \"MEDes\" (Master in European Design).Head of the Communication Design Research group and member of the Design PhD board, both at Politecnico di Milano – Design Department. His research and publishing activities focus on the devel"},{"id":201203,"name":"Espada y Santa Cruz","subtitle":"","img":"/speakers/2012/espada-y-santa-cruz.png","bio":"Espadaysantacruz Studio is a creation and management of interactive and visual projects collective based in Madrid since 2008. Their objective is the development of artistic practices associated with new technologies.\nIn their studio they create, plan and produce collaborative projects and commissioned projects with other creators, technology partners, agencies, production companies and cultural institutions.\nIn Multimedia Lab, the area of experimentation in Espadaysantacruz Studio, they investigate the application of new technologies for interactive software, multimedia installations, mapping"},{"id":201204,"name":"Doug Perkel","subtitle":"Sid Lee","img":"/speakers/2012/speaker-sid.png","bio":"Doug Perkul est le Managing Partner de Sid Lee Technologies Europe.  Basé à Amsterdam, lui et son équipe travaillent sur des programmes créatifs dans le digital pour des clients tels que Adidas, Heineken, Nivea et Dom Perignon.  Avant de rejoindre Sid Lee il y a deux ans, Doug était responsable digital du compte de la marque Converse pour R/GA à New York. Il officiait aussi en tant que Managing Partner et Fondateur de Schatzi, une agence créative qui travaillait sur des contenus créatifs brandés pour des marques comme Garnier, Newcastle Brown Ale, New Balance et le Sundance Channel.  Lorsqu'il"},{"id":201205,"name":"Frédéric Della Faille","subtitle":"Checkthis","img":"/speakers/2012/fred.png","bio":"Frédéric della Faille est l'un des webdesigners belges les plus expérimentés. Venant du monde du graffiti, il a créé du contenu web pour diverses agences depuis les années 90. Il a ensuite co-fondé et géré Bureau347 pendant 10 ans. Etant un grand amateur de produits, il a décidé de tout quitter -- même sa voiture de sport -- pour se concentrer à temps plein sur checkthis, une plateforme révolutionnaire de publication en ligne listée dans le top 25 des startups de New York à surveiller."},{"id":201206,"name":"Fredrik Öst & Magnus Berg","subtitle":"Snask","img":"/speakers/2012/speaker-snaks.png","bio":"Snask est une agence de design, branding et film mondialement reconnue qui créé le cœur et l'âme des marques. Ils créént de nouvelles marques et rajeunissent les vieilles.  Ils créent tout type de matériel brandé que ce soit pour le print, le web, les films ou de la pub expérimentale. Leur nom SNASK veut dire bonbon, crasse et ragot et où qu'ils aillent, ils se font quelques ennemis et des millions de fans."},{"id":201207,"name":"Ludovico Lombardi","subtitle":"Zaha Hadid Architects","img":"/speakers/2012/ludovico-lombardi.png","bio":"Ludovico est un jeune architecte italien qui a travaillé à Milan, Barcelone et Londres. Il a travaillé durant son expérience professionnelle en Espagne, Italie et Angleterre chez Carlos Ferrater, Arata Isozaki et Zaha Hadid architects, où il travaille pour le moment en tant que lead architect. En 2008 il a terminé un Master en architecture et Urbanisme au DRL Design Research Lab de l' Association Architecturale de Londres, après avoir précédemment étudié en Italie à L'Université Polytechnique de Milan et en Angleterre au Bartlett. Ludovico a donné des présentations et des workshops dans de nom"},{"id":201208,"name":"Jon Jönsson & Yuri Suzuki","subtitle":"Teenage Engineering","img":"/speakers/2012/teenage-engineering.png","bio":"Teenage Engineering is a studio for future commercial products, and communication. Their mission is to create products with superior quality, functional design and top-class engineering. Teenage Engineering do final assembly for most products in Sweden."},{"id":201209,"name":"Jonathan Richards","subtitle":"The Guardian","img":"/speakers/2012/jonathan.png","bio":"Le premier agenda digital du célèbre quotidien britannique The Guardian a le désir de créer des nouveaux moyens, amusants d'informer pour retenir l'attention des lecteurs en ligne. Jonathan Richards fait partie de l'équipe du Guardian Interactive, un petit groupe de spécialistes, designers, développeurs interactifs et journalistes travaillant avec les équipes éditoriales avec ce but en tête. Leur travail mêle la data visualisation, une interaction riche et des techniques de narration efficaces afin de produire des nouveaux moyens de séduire les lecteurs.  \"How rumours spread on Twitter during"},{"id":201210,"name":"Lazer Lazer","subtitle":"","img":"/speakers/2012/lazer-lazer.png","bio":"Lazer Lazer is new digital studio based in Lyon, cross product of the collaboration between the graphic design studio super-script and the developer Martial Geoffre-Rouland."},{"id":201211,"name":"Steve Vranakis","subtitle":"Google Creative Lab","img":"/speakers/2012/speaker-google.png","bio":"Steve apporte à Google une expérience de presque 20 ans dans le monde du digital, du design et de la publicité. Les campagnes et plateformes en ligne dans lesquelles ils s'est impliqué récemment comprennent : Web Lab, une série d'installations interactives connectées au web en direct du Musée des Sciences à Londres, le World Wonders Project qui donne accès via Street View à tous les sites du patrimoine mondial de l'humanité, le YouTube Space Lab Channel et bien d'autres. Steve a travaillé dans certaines des agences les plus grandes et les plus créatives au monde comme VCCP London, Foote Cone &"},{"id":201212,"name":"Riccardo Giraldi","subtitle":"B-Reel","img":"/speakers/2012/riccardo-giraldi.png","bio":"Riccardo Giraldi est Directeur Créatif de B-Reel Products New York. Il a commencé sa carrière en jouant aux Lego et ne sait pas très bien comment il a fini par travailler dans l'industrie numérique. Au fil des ans, Riccardo a développé un côté geek très prononcé en éprouvant une satisfaction immense à voir ses idées rapidement prendre vie grâce aux ordinateurs et à l'internet. Riccardo adore faire travailler en même temps les hémisphères gauche et droit de son cerveau. Il a travaillé à Florence, Stockholm et Londres avec des sociétés telles que unit9, Helpful Strangers, Specialmoves et B-Reel."},{"id":201213,"name":"Alain Gerlache","subtitle":"Open Data Debate","img":"/speakers/2012/alain-gerlache.png","bio":"Alain Gerlache est un journaliste et une personnalité de la télévision belge RTBF. Depuis septembre 2010, il assure chaque matin la chronique médiaTIC sur La Première (RTBF radio) et il intervient régulièrement dans d'autres émissions de la RTBF, à la radio, à la télé et sur le web. Actif aussi dans les médias flamands, il collabore régulièrement avec le quotidien De Morgen et la VRT à propos des rapports entre les francophones et les néerlandophones en Belgique. Alain Gerlache est maître de conférence en journalisme à l'Université de Liège (ULg) où il traite du webjournalisme et des médias in"},{"id":201214,"name":"Rob van Kranenburg","subtitle":"Internet of Things","img":"/speakers/2012/rob-van-kranenburg.png","bio":"Rob van Kranenburg (1964) est un spécialiste des stratégies de médiation et d'innovation des pratiques de design et de création artistique reliées aux nouvelles technologies, essentiellement dans ce qui concerne l'internet des objets, la relation entre le formel et l'informel en politique économique et culturelle, et les nécessités de construire une économie culturelle durable et un système politique productif pour le 21ème siècle. Il a travaillé à l'Université de Gand avec le Professeur Ronald Soetaert, à l'Université d'Amsterdam avec le Professeur Elsaesser, à de Balie avec Andrée van Es, Do"},{"id":201215,"name":"Herrmutt Lobby","subtitle":"Beatsurfing","img":"/speakers/2012/herrmutt-lobby.png","bio":"Since 2003, Herrmutt Lobby is a collective of electronic musicians, handymen and programmers. Separately, the members have had numerous releases on various labels [DUB, Studio !K7, Vlek, Eat Concrete, Thin Consolation, Catune.. ] since 1997. With Herrmutt Lobby there are no loops, no sequences, no backing tracks, no groove machines. Their primary objective is to develop both hardware and software aimed at performing live. Their devices are intended for direct interpretation, producing movement-driven music in real time. Their live sets have gained them a solid reputation everywhere in Europe."},{"id":201216,"name":"Philippe Gargov","subtitle":"Smart City Debate","img":"/speakers/2012/philippe-gargov.png","bio":"[pop-up] urbain est un cabinet de tendances et de conseils en prospective urbaine fondé et dirigé depuis 2010 par Philippe Gargov, géographe et spécialiste de la ville numérique.\nS'inspirant des méthodes du planning stratégique, [pop-up] urbain a élaboré une méthodologie de créativité s'appuyant sur le décryptage (Observatoire) et le détournement (Laboratoire) des cultures populaires contemporaines. Il accompagne ainsi les acteurs urbains publics ou privés dans la compréhension et la construction de stratégies de développement innovantes face aux enjeux mutants de la ville de demain."},{"id":201217,"name":"José Ramón Tramoyeres","subtitle":"GGLab","img":"/speakers/2012/jose-ramon-tramoyeres.png","bio":"José Ramon a travaillé chez Zaha Hadid Architects (Londres) et Santiago Calatrava (Valence), où il a acquis une vaste expérience dans les secteurs culturels, des transports et commerciaux. En 2009 il a été sélectionné comme un des 100 talents européens par le Comité des Régions de l'Union Européenne. Depuis 2008 il anime des workshops et donne des cours à propos de l'architecture numérique en Espagne, Chine et Russie. José Ramon est professeur de stratégies de design architectural et de développement urbain (4ème année) depuis 2010 et il est aussi co-leader du groupe de recherche CUAAD à Mexic"},{"id":201218,"name":"Werner Moron & Daniel Pricken","subtitle":"","img":"/speakers/2012/werner-moron.png","bio":"Né à Berchem (Anvers) le 18 janvier 1962, Werner Moron vit à Liège et travaille sur les cinq continents. Il est diplômé de l'Académie des Beaux-Arts de Liège en peinture de chevalet (juin 1991 avec la plus grande distinction). Artiste multiforme et multidisciplinaire, son œuvre échappe à tout classement rapide. Il répugne à se décrire comme artiste dans le sens ou l'entendent les institutions muséales ou les galeries. Werner Moron s'intéresse avant toute chose à l'acte posé, à l'intervention dans la société. Pour lui, l'art est une manière d'être, de révéler aussi ce que l'on ne parvient plus"},{"id":201219,"name":"André Loconte","subtitle":"Net Neutrality Debate","img":"/speakers/2012/andre-loconte.png","bio":"André Loconte est l'un des fondateurs et le porte-parole de l'association citoyenne NURPA (Net Users' Rights Protection\nAssociation). La NURPA mène un travail d'information et de dialogue auprès des pouvoirs publics et des citoyens afin de permettre à chacun de comprendre les problématique liées aux droits de l'Homme dansl'environnement numérique. Elle défend la vision d'un internet neutre, libre, accessible et vecteur de progrès."},{"id":201220,"name":"Fabrice Benoit","subtitle":"Clameurs","img":"/speakers/2012/fabrice-benoit.png","bio":"Fabrice Benoit co-Founded the audio augmented reality média « Clameurs » in which he is more specifically in charge of business development and sound-design. \nPrior to \"Clameurs\", he was head of production and business development in a international audio signal processing company who collaborated on the soundtrack of movies such as \"Inception\". \nFabrice obtained a Masters degree in Musicology and Management from the Sorbonne University of Paris."},{"id":201221,"name":"Yves Bernard","subtitle":"FabLab iMAL","img":"/speakers/2012/yves-bernard.png","bio":"Yves Bernard (BE) est un ingénieur informatique qui a aussi une formation en architecture. Après 10 ans à travailler en tant chercheur scientifique, il fonda en 1994 un des premiers studio de nouveaux médias en europe, Magic Media, qui a produit de nombreux de cd-roms d'art et culture pour de grandes maisons d'éditions françaises. Il est l'un des fondateurs de iMAL et donne aussi cours à l'ERG (www.erg.be), l'école d'Art de Saint Luc et l'Université de Liège."},{"id":201222,"name":"OP-Lab","subtitle":"Musical Experimental Board","img":"/speakers/2012/oplab.png","bio":""},{"id":201223,"name":"Noisy Jelly","subtitle":"","img":"/speakers/2012/noisy-jelly.png","bio":""}],"2013":[{"id":201300,"name":"Jessica Walsh","subtitle":"Designer & Art Director - Sagmeister & Walsh","img":"/speakers/2013/sample-1.jpg","bio":"Jessica Walsh est designer, directrice artistique et illustratrice. Basée à New York, elle s'est récemment associée à l'emblématique agence Sagmeister & Walsh."},{"id":201301,"name":"Ivan Poupyrev","subtitle":"Senior Research Scientist - Disney Research","img":"/speakers/2013/AIREALVortexRing_flipped.jpg","bio":"Ivan fait de la recherche dans le domaine des technologies interactives et du design d'interfaces. Il dirige le groupe Interaction Technology au Disney Research Pittsburgh Lab."},{"id":201302,"name":"Evan Roth","subtitle":"Media artist","img":"/speakers/2013/evan2.jpg","bio":"Américain basé à Paris, Evan Roth est un artiste emblématique de la culture DIY. Son travail s'attache principalement au détournement des dispositifs de pouvoir."},{"id":201303,"name":"Kyle McDonald","subtitle":"Media artist","img":"/speakers/2013/kyle3.jpg","bio":"Kyle McDonald est un artiste qui travaille avec le code. Il a une expérience et des compétences en philosophie et informatique."},{"id":201304,"name":"Felix Hardmood Beck","subtitle":"Art Director & Concept Designer - ART + COM","img":"/speakers/2013/artcom2.jpg","bio":"Felix Beck travaille en tant que Directeur artistique et Concept Designer pour le studio de design ART+COM."},{"id":201305,"name":"Anouk Wipprecht","subtitle":"Fashion Designer","img":"/speakers/2013/anouk1.jpg","bio":"La styliste hollandaise Anouk Wipprecht est une étoile montante dans le domaine émergeant de la \"fashionable technology\"."},{"id":201306,"name":"Andrew Shoben","subtitle":"Artist - Greyworld","img":"/speakers/2013/andrew1.jpg","bio":"Andrew Shoben est le fondateur de Greyworld, un collectif d'artiste mondialement reconnu qui oeuvre sur l'art dans l'espace public."},{"id":201307,"name":"Pelle Martin","subtitle":"Creative Director and Graphic Designer - Spring / Summer","img":"/speakers/2013/pelle.jpg","bio":"Pelle a débuté sa carrière chez In2media en l'an 2000. Il fonde l'année passée le studio Spring/Summer, basé à Copenhague."},{"id":201308,"name":"Usman Haque","subtitle":"Architect & artist, director - Umbrellium","img":"/speakers/2013/usman-new1.png","bio":"Usman Haque est le directeur de Haque Design + Research et le fondateur de Pachube."},{"id":201309,"name":"Kris Hermansson","subtitle":"Creative Fandango - RESN","img":"/speakers/2013/resn1.jpg","bio":"Resn est une équipe de jeunes gens guidés par une vision simple: infecter les esprits à grand renfort d'expériences interactives."},{"id":201310,"name":"Paolo Cirio","subtitle":"Media artist","img":"/speakers/2013/paolo1.jpg","bio":"Paolo Cirio est un artiste nouveaux médias, très connu pour ses œuvres d'art controversées et innovantes."},{"id":201311,"name":"John Wood and Paul Harisson","subtitle":"Video artists","img":"/speakers/2013/harissonwood2.jpg","bio":"Nés respectivement en 1969 à Hong-Kong et en 1966 en Grande-Bretagne, John Wood et Paul Harrison vivent et travaillent en Grande-Bretagne."},{"id":201312,"name":"Etienne Mineur","subtitle":"Art Director, Editor - Les Editions Volumiques","img":"/speakers/2013/volumique2.jpg","bio":"Diplômé de l'ENSAD, Etienne Mineur est Co-fondateur de l'atelier de création Incandescence et des Editions Volumiques."},{"id":201313,"name":"Gabriel Shalom","subtitle":"Artist, Director, Composer","img":"/speakers/2013/tosso_4_still_540x388px(1).png","bio":"Gabriel Shalom est un artiste, réalisateur et compositeur qui vit et travaille à Berlin."},{"id":201314,"name":"Kill Cooper and Dave Glass","subtitle":"co-founders of creative studio - Hungry Castle","img":"/speakers/2013/hungry1.jpg","bio":"Artiste slash comissaire slash designer, Kill est persuadé que l'une des plus belles choses dans la vie est d'avoir de grandes idées. Dave (aka Danger) est reconnu pour développer des oeuvres originales."},{"id":201315,"name":"Nalden","subtitle":"Co-founder - WeTransfer, Present Plus","img":"/speakers/2013/11nalden1.jpg","bio":"Nalden a commencé à bricoler autour d'internet et des nouvelles technologies dès l'age de 13 ans."},{"id":201316,"name":"Pleix","subtitle":"Collective of digital artists","img":"/speakers/2013/pleix2.jpg","bio":"Pleix est une communauté d'artistes multimédias (graphistes, musiciens, plasticiens, artistes 3D...) unissant leurs talents pour produire des projets plus librement. Le collectif est basé à Paris."},{"id":201317,"name":"Janjaap Ruijssenaars","subtitle":"Founder, Universe Architecture","img":"/speakers/2013/1janjaap1.jpg","bio":"Janjaap Ruijssenaars est un architecte hollandais reconnu qui essaie d'inviter à porter un nouveau regard sur le monde qui nous entoure. Son Floating Bed est élu Best Invention par le TIME magazine."}],"2014":[{"id":201400,"name":"Zach Lieberman","subtitle":"Media Artist","img":"/speakers/2014/messa.di.voce.square.jpg","bio":"Zach est américain et une figure incontournable de la communauté des artistes travaillant à l'avant-garde des nouvelles technologies."},{"id":201401,"name":"Carlo Ratti","subtitle":"Director, MIT Senseable City Lab","img":"/speakers/2014/MakrShakr_MyBossWas_0392.jpg","bio":"Carlo F. Ratti est un architecte italien, ingénieur, inventeur, professeur et activiste qui enseigne au Massachusetts Institute of Technology, USA."},{"id":201402,"name":"Julien Vallée & Eve Duhamel","subtitle":"Designers, director and visual artist","img":"/speakers/2014/ValleeDuhamel_HermesMetamorphose_04-site1.jpg","bio":"Vallée Duhamel est un studio qui fabrique des images et des vidéos pour un grand éventail de clients."},{"id":201403,"name":"Casey Neistat","subtitle":"Film director","img":"/speakers/2014/Casey.Picture.png","bio":"Casey Neistat est un réalisateur New Yorkais. Il est scénariste et réalisateur de la série « The Neistat Brothers » sur HBO."},{"id":201404,"name":"Stuart Wood","subtitle":"co-founder Random International","img":"/speakers/2014/stuart-random2.png","bio":"Stuart Wood est le fondateur et directeur de rAndom International."},{"id":201405,"name":"Onformative","subtitle":"Digital Studio","img":"/speakers/2014/blog_unnamed_soundsculpture.jpg","bio":"Onformative, fondé à Berlin par Julia Laub et Cedric Kiefer, est un studio spécialisé en conception de design génératif."},{"id":201406,"name":"Daily Tous les Jours","subtitle":"New Media Studio","img":"/speakers/2014/DTLJ_GiantSingAlong_SteveDietz_4x6_web.jpg","bio":"Daily tous les jours est un studio de design à la recherche de nouvelles façons d'interagir et de raconter des histoires."},{"id":201407,"name":"Baillat Cardell & Fils","subtitle":"Media Design Studio","img":"/speakers/2014/BCF_echoes.jpg","bio":"Basé à Montréal, Jean-Sébastien Baillat et Guillaume Cardell ont fondé leur société de design en 2008, Baillat Cardell & Fils."},{"id":201408,"name":"Lab 212","subtitle":"Multimedia Collective","img":"/speakers/2014/landscape_bdf.png","bio":"Lab 212 est un collectif de créatifs multimédia fondé par des anciens élèves de l'école des Gobelins à Paris."},{"id":201409,"name":"James Auger","subtitle":"","img":"/speakers/2014/61-site.jpg","bio":"James Auger est un designer, chercheur et professeur opérant à l'intersection de l'art et du design industriel."},{"id":201410,"name":"Tobias Revell","subtitle":"Speculative artist","img":"/speakers/2014/4.001.jpg","bio":"Tobias est un artiste et designer conceptuel diplômé du Royal College of Art."},{"id":201411,"name":"Hvass & Hannibal","subtitle":"Graphic Design Studio","img":"/speakers/2014/hvass.hannibal.Efterklang.magic.chairs.1.jpg","bio":"Havass & Hannibal est un studio d'art et de design multidisciplinaire basé à Copenhague."},{"id":201412,"name":"Benedikt Groß","subtitle":"Speculative designer","img":"/speakers/2014/Feld.druck_poster_small_1280px-(1).png","bio":"Benedikt Groß est un artiste numérique « antidisciplinaire », qui spécule sur notre quotidien."},{"id":201413,"name":"Pablo Garcia","subtitle":"Designer","img":"/speakers/2014/64_windows.mf.final.detail.img0272.small.jpg","bio":"Pablo Garcia est un artiste designer travaillant la perception de l'espace."},{"id":201414,"name":"Greg Barth","subtitle":"Design and Film Maker","img":"/speakers/2014/photo1.jpg","bio":"Greg est un artiste et réalisateur suisse basé à Londres, spécialisé dans l'animation et le design."},{"id":201415,"name":"Samuel St-Aubin","subtitle":"Media Artist","img":"/speakers/2014/Parcour.d.fini.moy.jpg","bio":"Samuel St-Aubin est un artiste canadien, diplômé d'électronique et de télécommunication."},{"id":201416,"name":"Adam Magyar","subtitle":"Photographer","img":"/speakers/2014/magyar-1.png","bio":"Avec sa série de films Inoxydable, l'artiste hongrois né en 1972, Adam Magyar, nous invite à revoir notre perception des stations de métro."},{"id":201417,"name":"Julian Adenauer & Michael Haas","subtitle":"","img":"/speakers/2014/Adenauer1.png","bio":"Julian Adenauer est un artiste, technicien et ingénieur créatif basé à Berlin, co-fondateur du duo d'artistes et inventeurs Sonice Development."},{"id":201418,"name":"Sophie Langohr & Bruno Imbrizi (UNIT9)","subtitle":"","img":"/speakers/2014/sophie-unit9-1.png","bio":"Sophie Langhor est designer 3D chez UNIT9. Bruno Imbrizi y est développeur visuel, intéressé par les belles choses construites avec du code."},{"id":201419,"name":"Romain Tardy","subtitle":"Media Artist","img":"/speakers/2014/romain-tardy-2.png","bio":"Romain Tardy est un artiste visuel qui développe son travail principalement dans le domaine des arts numériques."},{"id":201420,"name":"Superscript²","subtitle":"","img":"/speakers/2014/superscript-1.png","bio":"Fondé à Lyon en 2006 par Pierre Delmas Bouly et Patrick Lallemand, Superscript² est un studio de création graphique."},{"id":201421,"name":"J-B Labrune & Martin De Bie","subtitle":"","img":"/speakers/2014/JB-Labrune-1.png","bio":"Jean-Baptiste Labrune est chercheur au MIT Medialab."},{"id":201422,"name":"Yuri Suzuki","subtitle":"","img":"/speakers/2014/Image-Rima-Musa-DSC_26111-1.jpg","bio":"Yuri Suzuki is a sound artist, designer and electronic musician."},{"id":201423,"name":"MediaMonks","subtitle":"","img":"/speakers/2014/kikk1.jpg","bio":"MediaMonks is an independent creative digital production company."},{"id":201424,"name":"Camille Scherrer","subtitle":"","img":"/speakers/2014/camille-scherrer-1.jpg","bio":"Camille Scherrer est une artiste et designer suisse."},{"id":201425,"name":"Stinkdigital","subtitle":"","img":"/speakers/2014/001.jpg","bio":"Stinkdigital est une agence de production plusieurs fois primée."}],"2015":[{"id":201500,"name":"Golan Levin","subtitle":"new media artist","img":"/speakers/2015/golan-levin.jpg","bio":"Golan Levin est artiste, compositeur, interprète et ingénieur diplômé du MIT Media Laboratory. Il s'intéresse principalement aux modes d'expression audiovisuelle et interactive. Il consacre son travail à la conception de systèmes pour la création, la manipulation et l'exécution de l'image et du son "},{"id":201501,"name":"Moritz Stefaner","subtitle":"data vizualisation artist","img":"/speakers/2015/moritz-1.jpg","bio":"Moritz Stefaner est un designer, ou \"technicien de la vérité et de la beauté\" comme il le dit lui-même, qui consacre son travail à la data visualisation et à l'esthétique de l'information."},{"id":201502,"name":"Anton & Irene","subtitle":"designers","img":"/speakers/2015/antonirene_img1.png","bio":"Après sept années de collaboration, Anton et Irene ont récemment fondé leur propre studio de design à Brooklyn."},{"id":201503,"name":"Tobias van Schneider","subtitle":"art director & product designer","img":"/speakers/2015/KIKK_1.jpg","bio":"Tobias van Schneider est un designer allemand. Après avoir collaboré avec des marques de renommée mondiale comme Red Bull, BMW, Google ou Sony, il est devenu directeur artistique pour le service de streaming musical Spotify."},{"id":201504,"name":"Niklas Roy","subtitle":"designer & inventor","img":"/speakers/2015/niklas-roy-2.jpg","bio":"Né à Nuremberg en 1974, Niklas Roy est physicien des particules autodidacte et concepteur et inventeur de choses sans importance."},{"id":201505,"name":"Joanie Lemercier & Juliette Bibasse","subtitle":"audiovisual artist & head of production","img":"/speakers/2015/va-vient-copy.jpg","bio":"Joanie Lemercier est un artiste français qui s'intéresse à la lumière et ses influences sur notre perception de la réalité. Ensemble avec Juliette Bibasse, ils collaborent à des installations artistiques."},{"id":201506,"name":"LAb[au]","subtitle":"","img":"/speakers/2015/labau-1.jpg","bio":"LAb[au] est un groupe d'artistes établis à Bruxelles et actifs depuis 1996. Leurs œuvres partagent des caractéristiques avec l'art conceptuel, l'art concret et l'art des systèmes."},{"id":201507,"name":"Moniker","subtitle":"design studio","img":"/speakers/2015/moniker-1.jpg","bio":"Fondé en 2012 par Luna Maurer, Jonathan Puckey et Roel Wouters, Moniker est un studio de design interactif basé à Amsterdam."},{"id":201508,"name":"FIELD","subtitle":"","img":"/speakers/2015/field-1.jpg","bio":"Studio londonien fondé par Marcus Wendt et Vera-Maria Glahn, FIELD est spécialisé dans la création de designs dynamiques pour des plateformes digitales."},{"id":201509,"name":"Playmodes","subtitle":"audiovisual designers","img":"/speakers/2015/playmodes-1.jpg","bio":"Playmodes est un studio espagnol spécialisé dans la recherche audiovisuelle crée par Eloi Maduell et Santi Villanova."},{"id":201510,"name":"Superdog Agency","subtitle":"","img":"/speakers/2015/Header(3).jpg","bio":"Fondée en 2006, Dogstudio est une agence belge très souvent récompensée pour ses produits digitaux. Fondée en 2011, Superbe est la petite soeur barrée de Dogstudio."},{"id":201511,"name":"Tim Hunkin","subtitle":"inventor","img":"/speakers/2015/Autofrisk-photo-credit-Elizabeth-Blanchet(1).JPG","bio":"Ingénieur de formation, Tim Hunkin est devenu dessinateur en imaginant un cartoon pour un journal anglais. Il a ensuite fait carrière à la télévision en créant la série The Secret Life of Machines."},{"id":201512,"name":"Huge Agency","subtitle":"","img":"/speakers/2015/huge-lexus.jpg","bio":""},{"id":201513,"name":"Ruairi Glynn","subtitle":"Interactive Architecture Lab","img":"/speakers/2015/ruairi-glynn(1).jpg","bio":"Ruairi Glynn se définit comme un artiste d'installation. Il dirige le laboratoire d'architecture interactive de la Bartlett School of Architecture à Londres."},{"id":201514,"name":"Régine Debatty","subtitle":"writer","img":"/speakers/2015/regine(1).png","bio":"Regine Debatty est une blogueuse et curatrice belge, basée à Londres. Elle est la fondatrice de we-make-money-not-art.com."},{"id":201515,"name":"Alain Bellet","subtitle":"teacher","img":"/speakers/2015/bellet-1.jpg","bio":"Alain Bellet est professeur à l'ECAL, l'Université d'art et de design de Lausanne. Depuis 6 ans, il dirige l'unité Media & Design d'interaction."},{"id":201516,"name":"Cod.Act","subtitle":"new media artists","img":"/speakers/2015/codact-1.jpg","bio":"Fruit de la collaboration entre le plasticien du son et compositeur André Décosterd et de l'architecte et plasticien Michel Décosterd, Cod.Act développe depuis 1999 des performances et installations interactives."},{"id":201517,"name":"Nicolas Nova","subtitle":"researcher","img":"/speakers/2015/Capture-d-ecran-2015-09-02-a-13.26.27.png","bio":"Nicolas Nova est co-fondateur du Near Future Laboratory, une agence de recherche implantée en Europe et en Californie."},{"id":201518,"name":"Jonathan Villeneuve","subtitle":"New Media Artist","img":"/speakers/2015/KIKK_1(3).jpg","bio":"Jonathan Villeneuve crée des machines poétiques en assemblant des matériaux familiers."},{"id":201519,"name":"Rachel Wingfield","subtitle":"Designer","img":"/speakers/2015/rachel2.jpg","bio":"Rachel est une designer et chercheuse qui a fondé Loop.pH en 2003."},{"id":201520,"name":"Sabrina Ratté","subtitle":"Visual Artist","img":"/speakers/2015/Sabrina1.jpg","bio":"Sabrina Ratté est une artiste vidéo établie à Montréal."},{"id":201521,"name":"Domenico La Porta","subtitle":"","img":"/speakers/2015/7sins(1).jpg","bio":"Domenico La Porta, entrepreneur numérique, met l'accent sur les stratégies de narration et de contenu multiplateformes."},{"id":201522,"name":"Lawrence Malstaf","subtitle":"artist","img":"/speakers/2015/lawrence_malstaf_pic1.jpg","bio":"Le travail de Lawrence Malstaf (Bruges, 1972) se situe à la frontière entre les arts visuels et le théâtre."},{"id":201523,"name":"Pauline Saglio","subtitle":"Digital Interaction Design","img":"/speakers/2015/saglio.jpg","bio":"Parisienne d'origine, Pauline Saglio intègre successivement les ateliers Penninghen et de Sèvre à Paris avant de rejoindre l'ECAL."},{"id":201524,"name":"Daniel Leithinger","subtitle":"MIT Media Lab","img":"/speakers/2015/lethinger.jpg","bio":"Daniel Leithinger est chercheur au MIT Media Lab."}],"2016":[{"id":201600,"name":"Stefan Sagmeister","subtitle":"","img":"/speakers/2016/EN_STEFANSAGMEISTER_HEADER-.jpg","bio":"On ne présente plus Stefan Sagmeister, designer mondialement reconnu et fondateur de l'agence new-yorkaise Sagmeister Inc, devenue Sagmeister & Walsh en 2012. Art environnemental, typographie, pochettes d'album, conférences, livres, happenings, Stefan Sagmeister touche à tout. Et ça lui réussit; il a remporté la quasi totalité des prix internationaux disponibles dans le domaine du design."},{"id":201601,"name":"Raquel Meyers","subtitle":"","img":"/speakers/2016/EN_RaquelMeyers_Header.jpg","bio":"Raquel Meyers est une artiste autodidacte espagnole installée en Suède. Son dada : l'animation sur Commodore 64, ordinateur mythique des années quatre-vingt. Elle peut taper des heures d'affilée, pixel par pixel, les animations qu'elle utilise ensuite lors de ses performances. L'esthétique de l'artiste est pixélisée, truffée de personnages décalés et de couleurs psychédéliques."},{"id":201602,"name":"Ustwo","subtitle":"","img":"/speakers/2016/EN_JulesEhrardt_Header.jpg","bio":"Le jeu Monument Valley, ça vous parle? Avec plus de 26 millions de téléchargements, il a raflé de nombreux prix. L'Agence digitale américaine Ustwo, fondée en 2004 par Matt Miller et John Sinclair possède actuellement des bureaux à New York, Malmö, Londres et Sydney. Ses équipes ont travaillé en collaboration avec de grandes marques de Google à Ford."},{"id":201603,"name":"Pauline van Dongen","subtitle":"","img":"/speakers/2016/EN_PAULINE_VAN_DONGEN.jpg","bio":"Styliste fashion-tech néerlandaise, Pauline Van Dongen intègre les nouvelles technologies dans ses créations afin de les rendre plus durables, et surtout plus utiles à ceux qui les portent. Son ambition : provoquer une expérience tactile unique. Elle a réalisé un vêtement équipé d'un panneau solaire."},{"id":201604,"name":"Memo Akten","subtitle":"","img":"/speakers/2016/EN_MEMFUTR2015_HEADER.jpg","bio":"Originaire d'Istanbul et installé à Londres, l'artiste Memo Akten s'intéresse aux rapports entre la nature et les sciences, la technologie, la culture, l'éthique, les traditions et la religion. Artiste multidisciplinaire, il crée des installations, performances, vidéos, sons, lumières. En 2013, il reçoit le Golden Nica au Prix Ars Electronica."},{"id":201605,"name":"Agi Haines","subtitle":"","img":"/speakers/2016/EN_AgiHaines.jpg","bio":"Et si mon corps était entièrement « designable »? Voilà le genre de question que se pose Agi Haines, artiste, designer et chercheuse. Fondue de design spéculatif, son travail vise à repousser les limites de l'éthique afin de laisser libre cours à son imagination et imaginer des scénarios de futurs potentiels fictionnels mais sur des bases scientifiques solides."},{"id":201606,"name":"WILD","subtitle":"","img":"/speakers/2016/CONF_EN_WILD_HEADER_PRESS.jpg","bio":"WILD se décrit comme une agence interactive à la recherche de réputation urbaine. Thomas Strobl et Thomas Ragger travaillent ensemble au sein de l'agence autrichienne. Ils créent des applications et expériences web remarquées dans le monde entier."},{"id":201607,"name":"Karina","subtitle":"Smigla-Bobinski","img":"/speakers/2016/EN_KarinaSmiglaBobinskiAda_Header.jpg","bio":""},{"id":201608,"name":"Aram Bartholl","subtitle":"","img":"/speakers/2016/CONF_EN_ARAM_BARTHOLL_HEADER.jpg","bio":"Comment nos moyens de communication considérés comme acquis nous influence-t-ils? Les tensions entre le public et le privé, le online et le offline, la soif pour les technologies et la vie de tous les jours — autant de thématiques dans le travail d'Aram Bartholl, artiste installé à Berlin. Il crée des interactions entre internet, la culture et la réalité."},{"id":201609,"name":"Kathy Hinde","subtitle":"","img":"/speakers/2016/CONF_EN_KATHY_HINDE_HEADER.jpg","bio":"Matières premières : son, sculpture, image et lumière. Formes de prédilection : installations audiovisuelles et performances. Inspirations : rapports entre nature et technologies. L'oeuvre de Kathy Hinde est générative, elle évolue, se rend unique à chaque expérimentation. Son travail a été exposé en Europe, Scandinavie, Chine, Colombie, Nouvelle-Zélande."},{"id":201610,"name":"Gene Kogan","subtitle":"","img":"/speakers/2016/EN-GENE_KOGAN-Kinect_Projector.jpg","bio":"Artiste et programmeur installé à New York, Gene Kogan s'intéresse aux systèmes génératifs, technologies émergentes et à l'intelligence artificielle. Il crée du code dans le cadre de performances, musique live et art visuel. Il développe ml4a.github.io, un livre sur le machine learning destiné aux artistes."},{"id":201611,"name":"Nicky Assmann","subtitle":"","img":"/speakers/2016/EN_NICKY_ASSMANN_HEADER.jpg","bio":"Nicky Assmann est une artiste néerlandaise multidisciplinaire dont l'oeuvre s'envisage d'abord comme une expérience sensorielle. Intéressée par l'art, la science, la technologie et le cinéma, elle expérimente des procédés physiques sous forme d'installations luminocinétiques, vidéos et performances audiovisuelles."},{"id":201612,"name":"Thomas Thwaites","subtitle":"","img":"/speakers/2016/EN_THOMAS_THWAITES.jpg","bio":"Thomas Thwaites est designer même si parfois, il préférerait être une chèvre. Son travail artistique a trait aux interactions entre les sciences, la technologie, la culture, et sur la manière dont elles influencent notre société. Le Victoria & Albert Museum a acheté et intégré son oeuvre à sa collection permanente."},{"id":201613,"name":"Volker Morawe & Tilman Reiff","subtitle":"","img":"/speakers/2016/EN_VolkerMORAWE_Timan_Header.jpg","bio":"Cela fait 15 ans que le duo d'artistes Volker Morawe et Tilman Reiff crée des interfaces multisensorielles pétries de culture du jeu vidéo. Leurs installations interactives combinent logique du jeu, critique des médias, parodie d'appareils, code, électronique, mécanique, musique, humour, hormones et souvenirs d'enfance."},{"id":201614,"name":"Pablo Garcia","subtitle":"","img":"/speakers/2016/EN_PABLO_GARCIA_HEADER.jpg","bio":"Pablo Garcia is Associate Professor in Contemporary Practices at the School of the Art Institute of Chicago. Garcia's work ranges from scholarly contributions to art historical studies to contemporary artworks examining digital culture. His expertise in the history of drawing technologies stems from a decade of research."},{"id":201615,"name":"Adrien M et Claire B","subtitle":"","img":"/speakers/2016/FR_ADRIEN_M_CLAIRE_B_HEADER.jpg","bio":"Adrien Mondot, artiste pluridisciplinaire, informaticien et jongleur crée des spectacles en s'appuyant sur les interactions sensibles entre le numérique, le jonglage, la danse et la musique. En 2011, avec Claire Bardainne, ils refondent la compagnie Adrien M / Claire B pour interroger le mouvement et ses multiples résonances avec la création numérique."},{"id":201616,"name":"Nicolas Bernier","subtitle":"","img":"/speakers/2016/FR_NicolasBernier_Header.jpg","bio":"Artiste sonore pluridisciplinaire, Nicolas Bernier crée des installations et performances sonores, compose de la musique live pour des chorégraphies, films. Récompensé par le prestigieux prix Golden Nica au Prix Ars Electronica en 2013 pour son oeuvre Frequencies."},{"id":201617,"name":"Fabian Oefner","subtitle":"","img":"/speakers/2016/EN_FABIEN_OEFNER_HEADER.jpg","bio":"Fabian Oefner place les effets invisibles des sciences naturelles et les propriétés du temps au centre de son processus créatif. L'artiste suisse s'efforce de montrer que l'art et les sciences ne sont pas aussi éloignées qu'il n'y paraît. En illustrant un phénomène scientifique de manière poétique, il invite le spectateur à observer la beauté de ce qui l'entoure."},{"id":201618,"name":"Cécile Beau","subtitle":"","img":"/speakers/2016/FR-CECILE_BEAU_FRAC_5_HEADER.jpg","bio":"Le regard de Cécile Beau est tourné vers la nature qu'elle transforme en objet d'étude et de contemplation. Dans ses installations sonores, lumineuses, minimales et sensorielles, elle fait intervenir des végétaux et minéraux avec une machinerie illusionniste rendant compte de phénomènes physiques sous la forme de paysages énigmatiques."},{"id":201619,"name":"Joanie Lemercier","subtitle":"","img":"/speakers/2016/FR_JoanieLemercier_Header.jpg","bio":"Joanie Lemercier s'est spécialisé dans la projection de lumière dans l'espace. En 2008, il cofonde le label visuel AntiVJ. Cinq ans plus tard, il monte un studio créatif développant des installations, des oeuvres pour les galeries ainsi que des expérimentations liées au mapping vidéo."},{"id":201620,"name":"Florian Dussopt","subtitle":"","img":"/speakers/2016/FR-Florian_Dussopt.jpg","bio":"Après des études en design de production, Florian Dussopt ouvre son studio de design interactif à Londres. Il réalise pour ses clients — de Kellogg's à Bombay Sapphire en passant par la BBC et Samsung — du design expérientiel, des objets design fonctionnels, des installations interactives et de l'art immersif."},{"id":201621,"name":"Akufen","subtitle":"","img":"/speakers/2016/CONF_AKUFEN_HEADER.jpg","bio":"Akufen est né dans un humble appartement montréalais. L'agence fournit des expériences interactives, crée des logos, identités visuelles, sites web, applications et documentaires interactifs. En quelques années, l'équipe passe de quatre cofondateurs à une quarantaine d'employés."},{"id":201622,"name":"Alice Jarry","subtitle":"","img":"/speakers/2016/FR_ALICE_JARRY.jpg","bio":"Approche poétique, travail délicat et réalisation méticuleuse caractérisent les installations d'Alice Jarry. L'artiste explore la question des agencements et l'impact de la matérialité dans la génération de formes dynamiques, accidentelles et éphémères."},{"id":201623,"name":"Superscript²","subtitle":"","img":"/speakers/2016/FR_SUPERSCRIPT2.jpg","bio":""},{"id":201624,"name":"Gaël Hugo","subtitle":"","img":"/speakers/2016/FR_GaelHugo_Header.jpg","bio":"Designer interactif suisse, Gaël Hugo ouvre l'agence one more studio à Paris. Son approche du design a trait à la limite floue de la communication visuelle à l'ère digitale. Il travaille avec des musiciens comme Gotan/Project, des institutions culturelles telles que la Gaîté Lyrique et des marques comme Chanel, Hermes, Samsung."},{"id":201625,"name":"1024 architecture","subtitle":"","img":"/speakers/2016/FR_1024_HEADERCREDIT_Tesseract.jpg","bio":"Basé à Paris, 1024 architecture conçoit des installations architecturales et audiovisuelles qui soulignent l'interaction entre high-technology et low-technology, corps et espace, son et visuel, art et architecture. Leurs projets emblématiques incluent Le Square Cube avec Étienne de Crécy et le dispositif VTLZR avec Vitalic."},{"id":201626,"name":"François Pachet","subtitle":"","img":"/speakers/2016/FR_Francois_Pachet_Header.jpg","bio":"Ingénieur civil de formation et ancien professeur en Intelligence Artificielle, François Pachet est à la tête d'une équipe de recherche en musique au sein du Laboratoire SONY Computer Sciences, à Paris. Son projet Flow Machine vise à permettre aux utilisateurs d'expérimenter de nouvelles idées pour composer de la musique."},{"id":201627,"name":"Arnaud Coomans","subtitle":"","img":"/speakers/2016/TECH_COOMANS_HEADER.jpg","bio":"Arnaud Coomans, ingénieur en informatique, est expert en développement d'applications mobiles. Son plus gros coup date de 2013 lorsqu'il parvient à pirater Instagram pour permettre à une application de poster des photos prises depuis le ciel parisien à bord d'une reconstruction miniature de la maison du film \"Là-haut.\""},{"id":201628,"name":"Fabrice Lejeune","subtitle":"","img":"/speakers/2016/TECH_LEJEUNE_HEADER.jpg","bio":"Fabrice Lejeune est un développeur interactif belge. Il travaille en tant que développeur front-end chez Dogstudio et est impliqué dans plusieurs projets récompensés. Durant sa conférence, il explique pourquoi on devrait se défaire des chaînes de l'esclavage des frameworks web."},{"id":201629,"name":"Philippe Modard","subtitle":"","img":"/speakers/2016/FR_PHILIPPE_MODARD_HEADER.jpg","bio":"Philippe Modard est ingénieur chez Google à New York. Il commence sa carrière comme ingénieur aérospatial, s'intéresse au développement logiciel, crée une startup, puis rejoint Google. Il a participé à la première Startup Weekend à Liège et participe à des conférences TEDx."},{"id":201630,"name":"Loïc Vigneron","subtitle":"","img":"/speakers/2016/TECH_LoicVigneron_HEADER.jpg","bio":"Loïc Vigneron a commencé à vouloir démonter, remonter et améliorer des systèmes depuis l'enfance. En 2012, il obtient son diplôme en sciences informatiques à l'UCLouvain. Il cofonde Djump, ancien concurrent Uber, puis Spin42. Sa passion : faire voler des drones."},{"id":201631,"name":"Michaël Uyttersprot","subtitle":"","img":"/speakers/2016/TECH_UYTTERSPROT.jpg","bio":"Michaël Uyttersprot est développeur chez Fitbit. Féru de technologie, il s'intéresse particulièrement au web, à la gestion de contenus, et à la technologie mobile pour Android. Il a développé des applications comme STIB, FOSDEM et VilloHelper pour Android."},{"id":201632,"name":"Yannick Schutz","subtitle":"","img":"/speakers/2016/TECH_SCHUTZ_HEADER.jpg","bio":"Yannick Schutz est développeur d'outils chez Heroku. Son travail consiste à éliminer les frictions et à améliorer la productivité des ingénieurs. Cette année il présente les chatOps et leurs bots."},{"id":201633,"name":"Benjamin De Cock","subtitle":"","img":"/speakers/2016/TECH_DeCockBenjamin-HEADER2.jpg","bio":"Designer d'interfaces utilisateurs et développeur front-end, Benjamin De Cock travaille chez Stripe où il conçoit des sites web, développe des outils, améliore l'expérience utilisateur, pratique le motion design et s'essaie à la 3D."},{"id":201634,"name":"Fabien Penso","subtitle":"","img":"/speakers/2016/TECH_FABIEN_PENSO_HEADER.jpg","bio":"Fabien Penso is a Senior Engineer who focuses on large scale projects, and started his career in 1998 founding LinuxFr. He is currently the CTO of Stuart, an on-demand delivery company. Previously he worked on the push notification platform for the BBC mobile apps, and at Causes, a company founded by Sean Parker."},{"id":201635,"name":"Douglas Edric Stanley","subtitle":"","img":"/speakers/2016/DES-HEADER-MASK.jpg","bio":"Artiste d'origine américaine, Douglas Edric Stanley est professeur au Master Media Design de la Haute École d'Art et de Design de Genève où il enseigne le Design algorithmique. Il est également enseignant d'Arts numériques à l'École supérieure d'art d'Aix-en-Provence où il a fondé L'Atelier Hypermédia."}],"2017":[{"id":201700,"name":"Bruce Sterling","subtitle":"","img":"/speakers/2017/Bruce-Sterling.jpg","bio":"Bruce Sterling is writing a novel at the moment. He will revealed the title and description of his talk at KIKK ! Bruce Sterling (born 1954 in Brownsville, Texas) is an American science fiction author, journalist, editor and critic, best known for his novels and his seminal work on the Mirrorshades anthology, which defined the cyberpunk genre."},{"id":201701,"name":"Claudio Guglieri","subtitle":"","img":"/speakers/2017/Guglieri(1).jpg","bio":"La conférence de Claudio Guglieri portera sur nos relations quotidiennes avec les interfaces numériques. « Home » est un talk sur l'existence numérique des utilisateurs et le rôle du designer dans son façonnement optimal."},{"id":201702,"name":"Ingrid Burrington","subtitle":"","img":"/speakers/2017/Ingrid-Burrington.jpg","bio":"L'histoire de la communication en réseau et de la technologie numérique s'est le plus souvent construite en repoussant les limites de la physique et en simplifiant les chaînes logistiques. Ingrid Burrington étudie les fondations infrastructurelles d'un monde en réseau et l'histoire géologique qui les a rendues possibles."},{"id":201703,"name":"Jifei Ou","subtitle":"","img":"/speakers/2017/Jifei-Ou.jpg","bio":"La structure biologique des matériaux aux échelles nano, micro, méso et macro a toujours été une source d'inspiration pour les ingénieurs et les designers. Grâce à l'impression 3D, les concepteurs peuvent imiter le processus naturel de mise en forme des choses à l'échelle du micromètre."},{"id":201704,"name":"Clare Patey","subtitle":"","img":"/speakers/2017/Clare-Patey.jpg","bio":""},{"id":201705,"name":"Mario Klingemann","subtitle":"","img":"/speakers/2017/20170613_134236.jpg","bio":"Lors de cette conférence, Mario Klingemann présente les dernières recherches sur le deep learning, concernant l'analyse d'image et l'art génératif. Il illustre ses propos par des exemples de sa propre utilisation de réseaux neuronaux."},{"id":201706,"name":"Aude Degrassat","subtitle":"","img":"/speakers/2017/Aude-Degrassat(4).jpg","bio":"La beauté fait partie de notre quotidien, et si ce terme est difficile à définir, le monde du digital en bouleverse d'autant plus la signification. Qu'est-ce que la beauté dans le digital? Explorer l'évolution de ces effets de mode et de nos perceptions esthétiques aide à comprendre les spécificités de la beauté numérique."},{"id":201707,"name":"Serial Cut","subtitle":"","img":"/speakers/2017/Serial-Cut.jpg","bio":"Serial Cut™ est un studio de design espagnol fondé en 1999 à Madrid par Sergio del Puerto, spécialisé dans la direction artistique pour des projets publicitaires internationaux. L'idée est de créer des images percutantes alliant pop culture, prestige et surréalisme."},{"id":201708,"name":"Dries Depoorter","subtitle":"","img":"/speakers/2017/Dries-Depoorter-.jpg","bio":"Assemblant, partageant et expérimentant avec ses données personnelles et celles d'autres individus trouvées sur internet, l'artiste médiatique Dries Depoorter interroge des vastes sujets liés à l'identité, au big data, au cryptage et la (non-)protection de la vie privée."},{"id":201709,"name":"Sara Hendren","subtitle":"","img":"/speakers/2017/Sara-Hendren.jpg","bio":"Sara Hendren est artiste, chercheuse en design et écrivaine. Son intervention évoque les lieux inattendus où le handicap est au cœur du design. Attendez-vous à voir des rampes prises d'assaut par des skateboards et des fauteuils roulants, du mobilier au design unique et une architecture démente."},{"id":201710,"name":"Memo Akten","subtitle":"","img":"/speakers/2017/Memo-Akten.jpg","bio":"Originaire d'Istanbul et installé à Londres, l'artiste Memo Akten s'intéresse aux rapports entre la nature et les sciences, la technologie, la culture, l'éthique, les traditions et la religion. Son travail explore le cosmos à travers des installations poétiques et immersives."},{"id":201711,"name":"Regine Debatty","subtitle":"","img":"/speakers/2017/Regine-Debatty.jpg","bio":"Les auteurs de science-fiction nous ont habitués à penser que les prochaines aventures de l'humanité sont là-haut sur des planètes lointaines. Pourtant, aucune technologie ne serait possible sans le monde qui se cache ici, sous nos pieds. Regine Debatty explore les ressources minérales qui alimentent nos vies électroniques."},{"id":201712,"name":"Hello Monday","subtitle":"","img":"/speakers/2017/HelloMonday.jpg","bio":"Andreas Anderskou, fondateur de Hello Monday, raconte comment utiliser le temps que nous ignorions avoir pour mettre l'art et le design au service des objectifs mondiaux des Nations Unies. 196 pays ont défini 17 objectifs à atteindre pour notre planète d'ici 2030."},{"id":201713,"name":"Anne Horel","subtitle":"","img":"/speakers/2017/Anne-Horel(1).jpg","bio":"Anne Horel est une artiste dont le projet # propose un état des lieux d'une époque de plus en plus complexe. Lors de la #Conférence, elle présentera le #Manifeste, explorant le rôle d'internet et des réseaux sociaux dans notre rapport au sens de la vie."},{"id":201714,"name":"Samuel Bianchini","subtitle":"","img":"/speakers/2017/Samuel-Bianchini.jpg","bio":"Une importante dimension de ce qui conditionne nos actions et nos perceptions n'est pas donnée à voir : les réseaux. Samuel Bianchini explore ces \"dispositifs\" — systèmes porteurs d'une histoire conceptuelle que les arts s'emparent pour travailler, détourner et révéler."},{"id":201715,"name":"Christopher Bauder","subtitle":"","img":"","bio":"Christopher Bauder dirige à Berlin le studio WhiteVoid. Il intervient à l'interface de l'art, du design et de la technologie, créant des installations interactives pour des musées, festivals et évènements culturels. Il parle de la création de récits émotionnels abstraits pour des performances audiovisuelles."},{"id":201716,"name":"Kelli Anderson","subtitle":"","img":"/speakers/2017/Kelly.jpg","bio":"Le design tire partie de la manière sophistiquée et spécifiquement humaine dont nos sens «sondent» les problèmes. Kelli Anderson explore comment le design peut constituer une approche radicalement directe pour isoler de nouvelles perspectives cachées dans les expériences quotidiennes."},{"id":201717,"name":"Mr Bingo","subtitle":"","img":"/speakers/2017/Mr-Bingo.jpg","bio":"Mr Bingo est né en 1979. En 1980, il s'est mis à dessiner. Il n'y avait pas grand-chose d'autre à faire dans le Kent. En 2011, il a démarré le projet Hate Mail sur Twitter : des étrangers le payaient pour qu'il dessine puis envoie une carte postale injurieuse au destinataire de leur choix."},{"id":201718,"name":"Phoenix Perry","subtitle":"","img":"","bio":""},{"id":201719,"name":"Dogstudio","subtitle":"","img":"/speakers/2017/Dogstudio.jpg","bio":"Si vous êtes designer en 2017, il y a de grandes chances que vous intégriez les données et les KPI dans votre quotidien. Dogstudio explore une approche du design interactif inspirée de l'art et de la nature, alliant neurosciences et émotions."},{"id":201720,"name":"Camille Bosque","subtitle":"","img":"/speakers/2017/Camille-bosque(1).jpg","bio":"Cette présentation retrace les origines des mouvements maker et hacker et des FabLabs. La réhabilitation du plaisir au travail et l'héritage des Arts and Crafts sont deux aspects qui permettent d'envisager ces lieux comme des terrains d'expérimentation sociale."},{"id":201721,"name":"Sigmasix","subtitle":"","img":"/speakers/2017/Sigmasix.jpg","bio":"SIGMASIX, un studio expérimental situé à Genève, combine un large spectre de pratiques axées sur la conception, la scénographie, la muséographie et l'installation d'éclairages. Eric Morzier dévoile les tours de magie utilisés pour concrétiser différents projets du studio."},{"id":201722,"name":"David Benque","subtitle":"","img":"/speakers/2017/David-Benque.jpg","bio":"David Benque présente l'Almanach Moniste, un projet de recherche qui étudie les limites floues entre la \"data science\" et la divination. Ce projet se réapproprie le format des almanachs historiques comme intersection unique entre la science, l'occulte et le banal."},{"id":201723,"name":"Chevalvert","subtitle":"","img":"/speakers/2017/Chevalvert.jpg","bio":"Depuis quelques années, Chevalvert développe une approche d'un design visuel \"orienté objet\". Le studio s'attache à inventer des espaces visuels, des mécanismes poétiques et des images tangibles, associant réappropriation d'objets du passé et détournement de technologies actuelles."},{"id":201724,"name":"Katherine Melancon","subtitle":"","img":"/speakers/2017/Katherine-Melancon.jpg","bio":"La conférence porte sur le processus de création de Katherine Melançon. Entre nature morte et composition abstraite, son travail renouvelle notre rapport au numérique par la création d'œuvres qui se présentent comme des «mystères picturaux»."},{"id":201725,"name":"Waltz Binaire","subtitle":"","img":"/speakers/2017/Waltz-Binaire.jpg","bio":"Christian Loclair et Marta Soto proposent un voyage allant de l'art urbain au design des nouveaux médias. Ils explorent ce qu'ont en commun la programmation GPU et la danse de rue, et les bénéfices de la recherche interdisciplinaire."},{"id":201726,"name":"Base Design","subtitle":"","img":"/speakers/2017/Base-Design(2).jpg","bio":"Chez Base, dans les studios de Bruxelles, New York et Genève, ils créent des marques en se basant sur une idée : chaque projet sera basé sur une seule idée. Thierry dévoile tous leurs processus et conseils pour designer de manière adaptée et engageante."},{"id":201727,"name":"Espadaysantacruz","subtitle":"","img":"/speakers/2017/Espanda.jpg","bio":"Les démarches de communication les plus retentissantes reposent sur l'innovation. Espadaysantacruz est convaincu que les nouvelles technologies transforment le monde, et la manière dont les entreprises communiquent. Ils présentent leurs recherches pour combler l'écart entre la sphère numérique et le monde physique."},{"id":201728,"name":"Lynn Cherny","subtitle":"","img":"/speakers/2017/Lynn.jpg","bio":"Lynn Cherny est professeure associée en sciences des données à Lyon. Elle travaille sur la visualisation des données, l'analyse de texte, le machine learning et l'IA. Elle s'intéresse à la narration et à la poésie, combinant des images et des visuels sous des formes interactives."},{"id":201729,"name":"Hannah Davis","subtitle":"","img":"/speakers/2017/Hannah-Davis.jpg","bio":"The field of generative music is founded on invisible structures — procedural rules, biological behaviors, linguistic systems. Hannah Davis explores music generation based on emotion, translating books into music based on emotional content, and generating music from video and film."},{"id":201730,"name":"Yan Breuleux","subtitle":"","img":"/speakers/2017/Yan-Breuleux.jpg","bio":"Les technologies de l'immersion transforment le statut des images. Yan Breuleux explore comment, à la différence d'un environnement architectural fixe, le concept d'environnement artistique est cinétique et implique une conception active de l'expérience."},{"id":201731,"name":"Matthieu Lorrain","subtitle":"","img":"/speakers/2017/Matthieu-lorrain(1).jpg","bio":""},{"id":201732,"name":"Raphael de Courville","subtitle":"","img":"/speakers/2017/Raphael-de-courville.jpg","bio":"L'être humain est une créature spatiale. Pourtant, notre vie numérique se limite à l'espace rectangulaire d'un écran. Raphaël de Courville explore comment les tendances récentes de la réalité augmentée permettent de dépasser Flatland et d'utiliser notre intelligence spatiale."},{"id":201733,"name":"Oscar Lhermitte","subtitle":"","img":"/speakers/2017/Oscar-lhermittejpg.jpg","bio":""},{"id":201734,"name":"LAVA LAB","subtitle":"","img":"/speakers/2017/Lavalab(1).jpg","bio":"Klasien van de Zandschulp et Gianluca Monaco (Lava Lab) zooment sur le touchpoint entre identités online et offline. Ils utilisent des outils digitaux pour créer des rencontres sociales inattendues, ouvrir des conversations et explorer de nouveaux types d'interactions."},{"id":201735,"name":"Frederic Notet","subtitle":"","img":"/speakers/2017/Frederic-notet.jpg","bio":"Comment peut-on trouver son bonheur dans un catalogue de musique de plus de 50 millions de chansons ? Frédéric Notet explore comment l'intelligence artificielle, associée à la curation humaine, peut fournir un service de recommandation musicale pertinent."},{"id":201736,"name":"Eleanor Harding","subtitle":"","img":"/speakers/2017/Eleanor-Harding.jpg","bio":"From designing at scale for the next billion users, through to the dynamics of designing in a global team — Eleanor Harding explores stories, frameworks and lessons learned about scale and abstraction in design at Twitter."},{"id":201737,"name":"Frederic Schwarz","subtitle":"","img":"","bio":"Core technologies like WebGL and WebVR paved the road for building immersive experiences in the web. Frederic Schwarz explores why the framework A-Frame is changing the game for 3D on the web, by removing entry barriers and giving the right tools to quickly build stunning worlds."}],"2018":[{"id":201800,"name":"Paola Antonelli","subtitle":"Broken Nature","img":"/speakers/2018/Paola_1100.jpg","bio":"Paola Antonelli est conservatrice principale de l'architecture et du design, mais aussi directrice fondatrice de la recherche et du développement du MoMA. Elle promeut la compréhension du design afin que son influence positive sur le monde soit universellement reconnue."},{"id":201801,"name":"Nelly Ben Hayoun","subtitle":"I am a Monster","img":"","bio":"Nelly Ben Hayoun est une créatrice d'expériences extrêmes donnant vie au sublime. Surnommée la \"Willy Wonka du design\", elle est une designer et cinéaste française primée qui crée des projets expérientiels multidimensionnels à l'intersection de la science, du théâtre, de la politique et du design."},{"id":201802,"name":"Kyle McDonald","subtitle":"Weird Intelligence","img":"","bio":"Kyle McDonald est un artiste qui travaille avec le code. Il crée des installations audiovisuelles interactives et immersives, des performances et de nouveaux outils d'exploration créative en utilisant la vision par ordinateur, l'apprentissage machine et la téléprésence."},{"id":201803,"name":"New York Times - Graham McDonnell","subtitle":"Putting the 'Story' into Storytelling","img":"/speakers/2018/Content2_Graham_853963989.jpg","bio":"Fort de plus de quinze ans d'expérience, Graham McDonnell s'est spécialisé dans la création d'histoires visuelles immersives. Il a rejoint The New York Times pour diriger le T Brand Studio avec des bureaux à Londres, Paris et Hong Kong."},{"id":201804,"name":"Stefanie Posavec","subtitle":"Observe, Collect, Draw!","img":"/speakers/2018/Content1_Stefanie_DearData14.jpg","bio":"Stefanie Posavec est une artiste et designer qui utilise les données comme matériau de prédilection. Son travail a été exposé au MoMA, au Centre Pompidou, au V&A et au Design Museum. Pour Dear Data, elle et Giorgia Lupi ont collecté leurs données pour les dessiner sur des cartes postales."},{"id":201805,"name":"Bompas & Parr","subtitle":"Tongues in Turmoil","img":"/speakers/2018/content01_design-miami-unusual-materials-13.jpg","bio":""},{"id":201806,"name":"Ueno","subtitle":"Lead the Change","img":"/speakers/2018/Content1_Ueno_Zero.jpg","bio":"Marco Coppeto, Senior Designer chez Ueno, a plus de dix ans d'expérience dans le secteur numérique. Ueno est une agence numérique spécialisée dans la conception de produits, marques et expériences numériques, ayant travaillé avec Facebook, ESPN, Reuters, Nike, Volkswagen."},{"id":201807,"name":"Robertina Sebjanic","subtitle":"Sounds of Troubled Worlds","img":"/speakers/2018/Content1_Robertina_HanaJosik.jpg","bio":"Établie à Ljubljana, Robertina Šebjanic travaille à la croisée de l'art, de la technologie et de la science. Son art et son domaine de recherche sont liés aux réalités culturelles, politiques, chimiques et biologiques des milieux aquatiques."},{"id":201808,"name":"DBLG","subtitle":"Creativity sometimes par Grant Gilbert","img":"/speakers/2018/Content1_Gilbert_Bears.jpg","bio":"Lancée par Grant Gilbert en 2007, DBLG est une agence de création primée située à Londres, spécialisée dans une communication visuelle novatrice, l'image de marque et l'animation. Elle fait vivre les marques créatives à travers des espaces, des lieux et des images."},{"id":201809,"name":"Thomson & Craighead","subtitle":"Not Here","img":"","bio":""},{"id":201810,"name":"Brendan Dawes","subtitle":"Finding the Analog in the Digital","img":"","bio":"Brendan Dawes est un artiste et designer qui explore les interactions entre les objets, les gens, la technologie et l'art. Son travail explore des thèmes universels comme la beauté, la simplicité et la curiosité, sans se préoccuper des tendances ou des modes actuelles."},{"id":201811,"name":"Nikita Diakur","subtitle":"Developing an Ugly Idea","img":"/speakers/2018/_0001_content2_nikita.jpg.jpg","bio":"Nikita Diakur est un cinéaste d'origine russe basé en Allemagne. Son projet Ugly (2017) a remporté de nombreux prix dans des festivals internationaux. Sa marque de fabrique est la simulation numérique dynamique, qui englobe la spontanéité, le hasard et les erreurs."},{"id":201812,"name":"The Workers","subtitle":"Designing connected experience","img":"","bio":"Margot Myers est directrice du studio technologique et créatif The Workers. Elle exploite sa sensibilité artistique pour raconter des histoires en utilisant la technologie de manière inattendue, alliant littérature, design et code."},{"id":201813,"name":"MediaMonks - Fran Marquez","subtitle":"How a side project led to doing Google's 20th anniversary Doodle","img":"/speakers/2018/GoogleDoodle_02.png","bio":"La section animation de MediaMonks a commencé à travailler sur des projets secondaires bizarres et merveilleux pendant leurs temps morts. Fran Marquez, directeur du département Art & Animation, parle de comment ces projets ont constitué un aspect fondamental de la culture d'équipe."},{"id":201814,"name":"Koert Van Mensvoort & Floris Kaayk","subtitle":"Technology is our Next Nature","img":"","bio":"Koert van Mensvoort est un artiste et philosophe connu pour le concept de Next Nature : notre environnement technologique serait devenu si complexe qu'il est mieux perçu comme une nature en soi. Floris Kaayk est un artiste numérique néerlandais connu pour ses semi-documentaires fictifs."},{"id":201815,"name":"RYBN.ORG","subtitle":"Étude ontologique des algorithmes","img":"/speakers/2018/RYBN-org.jpg","bio":"RYBN.ORG explore les logiques, les modes de pensée et les mythes qui sous-tendent l'ontologie algorithmique. Le collectif observe les algorithmes financiers de trading haute fréquence et leur influence sur les marchés."},{"id":201816,"name":"Angelo Vermeulen","subtitle":"Disrupting Cockroaches and Evolving Starships","img":"/speakers/2018/content1_angelovermeulen.jpg","bio":"Angelo Vermeulen est chercheur en systèmes spatiaux, biologiste, artiste et conférencier. Sélectionné comme l'un des 5 meilleurs pionniers technologiques de Belgique en 2017, il collabore avec des scientifiques tout en construisant des installations multimédias."},{"id":201817,"name":"Caroline Goulard","subtitle":"Making the invisible visible","img":"","bio":"Caroline Goulard co-fonde Dataveyes en 2010, une entreprise spécialisée dans les interactions hommes-données. Elle traduit les données en expériences interactives pour écrire de nouvelles histoires et comprendre notre environnement façonné par les données."},{"id":201818,"name":"Tellart - Paul Skinner","subtitle":"Tools we can't grasp","img":"","bio":"Paul Skinner (Tellart) explore comment le design peut être une force puissante pour répondre aux défis de notre époque. C'est un privilège de vivre à une époque où la science découvre des possibilités inimaginables — mais le temps presse face aux conséquences des actions d'hier."},{"id":201819,"name":"Paul Granjon","subtitle":"About the co-evolution of humans and machines","img":"/speakers/2018/content4_paulgranjon.jpg","bio":"Paul Granjon s'intéresse à l'évolution parallèle des humains et des machines. Il fabrique des robots et d'autres machines pour des expositions et des performances depuis 1996. Son travail mêle humour et questions graves à travers des machines absurdes constituées de composants recyclés."},{"id":201820,"name":"Annick Bureaud","subtitle":"Art et non humain. L'imaginaire de la résilience","img":"","bio":"Annick Bureaud est critique d'art, commissaire d'expositions et organisatrice de manifestations dans les domaines de l'art et des technosciences. Elle est directrice de l'OLATS, Observatoire Leonardo des Arts et des Techno-Sciences."},{"id":201821,"name":"Rejane Cantoni & Raquel Kogan","subtitle":"Reflecting on Reflection","img":"","bio":"Rejane Cantoni et Leonardo Crescenti travaillent ensemble en duo depuis 2005. Ils ont organisé des expositions à Ars Electronica, The Creators Project, le Copenhagen Contemporary Art Festival et l'Itaú Cultural. Leur travail Water est une collaboration avec l'artiste Raquel Kogan."},{"id":201822,"name":"Collectif Coin","subtitle":"Maxime Houot","img":"","bio":"Collectif Coin est un laboratoire artistique basé à Grenoble. Résolument transdisciplinaire et ancré dans les Arts Numériques, il manipule principalement la lumière, le son et le corps. Leurs recherches explorent la numérisation de l'espace par des écrans monumentaux très basse résolution."},{"id":201823,"name":"Adrien Segal","subtitle":"The Art Beyond Reason","img":"/speakers/2018/Content2_AdrienSegal_unnamed1.jpg","bio":"Adrien Segal est une artiste établie à Oakland. Ses œuvres, à la croisée des conventions scientifiques et des formes sculpturales, ont été exposées partout dans le monde. Elle a été artiste résidente auprès de Facebook et du Pier 9 Workshop."},{"id":201824,"name":"David Bowen","subtitle":"Data driven kinetic sculpture","img":"/speakers/2018/header_data_driven_kinetic_sculptures.jpg","bio":"David Bowen (°1975) est un artiste qui crée des œuvres sculpturales cinétiques, robotiques et interactives. Son travail se penche sur l'aspect esthétique résultant des processus réactifs et génératifs aux intersections entre les systèmes naturels et mécaniques."},{"id":201825,"name":"Interactive Architecture Lab - Ruairi Glynn","subtitle":"Anti-Discipline","img":"","bio":"Ruairi Glynn (Interactive Architecture Lab) explore comment la robotique promet une architecture réactive et transformable, avec des drones et des formes de vie artificielle autonomes cohabitant dans notre environnement bâti."},{"id":201826,"name":"Disnovation.org","subtitle":"Disobedient Innovation","img":"","bio":"DISNOVATION.ORG est un collectif artistique basé à Paris. Au croisement entre art contemporain, recherche et hacking, ils développent des situations d'interférence visant à détourner l'idéologie dominante de l'innovation technologique pour stimuler des récits alternatifs."},{"id":201827,"name":"Nathalie Blanc","subtitle":"Formes artistiques à l'épreuve de l'Anthropocène","img":"","bio":"La conférence de Nathalie Blanc traite des réponses des artistes aux enjeux de l'Anthropocène, cette époque à la mesure de l'impact des activités humaines sur les grands cycles biogéochimiques."},{"id":201828,"name":"Mathieu Zurstrassen","subtitle":"Avant j'étais Architecte","img":"/speakers/2018/content01_mathieu_zurstrassen.jpg","bio":""},{"id":201829,"name":"WhiteFeather","subtitle":"Weaving together: human/nonhuman co-construction in biotextile craft","img":"","bio":"WhiteFeather Hunter est une artiste-chercheuse canadienne primée. Elle est titulaire d'une Maîtrise en Beaux-arts en Fibres et Pratiques Matérielles de l'Université Concordia. Elle situe sa pratique du BioArt dans le contexte de l'artisanat et de la sorcellerie féministe."},{"id":201830,"name":"Luce Moreau","subtitle":"Les Palais","img":"/speakers/2018/content1_luce_moreau.jpg","bio":"Luce Moreau est photographe et plasticienne basée à Marseille. Elle est cofondatrice du collectif OTTO-Prod et travaille sur des projets curatoriaux et résidences d'artistes, tout en développant ses recherches artistiques en situations exceptionnelles (CNRS, Colombie, Suisse)."},{"id":201831,"name":"Ewen Chardronnet","subtitle":"Roscosmoe","img":"","bio":"Ewen Chardronnet est actif dans les relations entre arts, sciences et technologies comme auteur, journaliste, commissaire d'exposition et membre de collectifs d'artistes. Il est à l'origine du collectif Laboratory Planet."},{"id":201832,"name":"François-Joseph Lapointe","subtitle":"Mapping the microbiome between us","img":"","bio":"François-Joseph Lapointe est un artiste-scientifique de Montréal, titulaire de doctorats en biologie de l'évolution et en études de la danse. Il a publié plus de 120 articles et a créé le domaine de la chorégénétique en appliquant la biotechnologie comme moyen de composition pour la danse."},{"id":201833,"name":"Monochrome","subtitle":"Virtual Reality, a new space for digital creation ?","img":"/speakers/2018/Content1_Monochrome_Made_In_Labs_2.jpg","bio":"Monochrome crée des projets de réalité virtuelle en temps réel pour les marques et le secteur artistique. Né de l'agence numérique Ultranoir, le studio parisien a été fondé en 2016 et est spécialisé dans l'art virtuel et les productions 3D."},{"id":201834,"name":"Marco Barotti","subtitle":"","img":"","bio":""},{"id":201835,"name":"Dogstudio","subtitle":"Henry Daubrez","img":"","bio":"Dogstudio est une agence primée internationalement, dévouée au design, à la technologie et à toutes les strates entre ces deux disciplines. Ils ont collaboré avec Microsoft, le Kennedy Center Washington et le Museum of Arts."},{"id":201836,"name":"Watson DG","subtitle":"Embracing Uncertainty","img":"/speakers/2018/content1_watsondg.jpg","bio":"Fernando Ramirez est directeur artistique et fondateur du Watson Design Group à Los Angeles en 2005. L'agence met en œuvre des campagnes interactives pour des clients du secteur du divertissement et du jeu, notamment pour A Ghost Story, Isle of Dogs."},{"id":201837,"name":"Kate Dawkins","subtitle":"Approaching pixels and projection","img":"","bio":"Directrice artistique récompensée aux BAFTA, Kate Dawkins a fondé un studio spécialisé dans la création de contenus sur mesure — projections et LED — pour des performances et évènements spectaculaires. Elle a travaillé avec les Jeux olympiques de Londres 2012, Nike, Samsung, Jaguar."},{"id":201838,"name":"Jenny Odell","subtitle":"Designing for the In-Between","img":"/speakers/2018/Content3_-Jenny-Odell_Waste-and-Salt-Ponds-2012.jpg","bio":"Jenny Odell habite à Oakland. Elle est auteure, plasticienne et ornithologue malgré elle. En 2015, elle devient artiste résidente à la décharge de San Francisco. Elle a aussi été artiste résidente auprès de l'Internet Archive et Facebook."},{"id":201839,"name":"Dominic Wilcox","subtitle":"Reinventing Normal","img":"","bio":"Dominic Wilcox mêle les mondes de l'art, du design, de l'artisanat et de la technologie pour créer des objets innovants et surprenants. Il a notamment créé les premières chaussures GPS au monde et une voiture-lits du futur avec vitrail."},{"id":201840,"name":"Florian Dussopt","subtitle":"From Art Exploration to Brand Experiences","img":"","bio":"Florian Dussopt ouvre son studio de design interactif à Londres. Il réalise pour ses clients du design expérientiel, des objets fonctionnels, des installations interactives et de l'art immersif. Son studio est un laboratoire de recherches inspiré des sciences, en particulier l'optique et le son."},{"id":201841,"name":"Xandra van der Eijk","subtitle":"Re-Interpreting the landscape","img":"","bio":""}],"2019":[{"id":201900,"name":"Stefan Sagmeister","subtitle":"Design and Happiness","img":"/speakers/2019/Sagmeister_shot_by_Werner-Streitfelder_small-(1).jpg","bio":"Stefan Sagmeister a fondé la société new-yorkaise Sagmeister Inc. en 1993 et a depuis travaillé pour des clients aussi divers que les Rolling Stones et le Musée Guggenheim. En plus de deux Grammy, il a remporté pratiquement tous les prix de design internationaux importants."},{"id":201901,"name":"Aaron Duffy","subtitle":"","img":"/speakers/2019/AaronDuffy-2.jpg","bio":"Aaron Duffy est le cofondateur de SpecialGuest. Sa spécialité est la communication et l'expérimentation visuelle, apportant souvent une touche d'humanité à la technologie. Son travail a été reconnu par le service des archives du MoMA."},{"id":201902,"name":"Donatella Della Ratta","subtitle":"","img":"/speakers/2019/dona.jpg","bio":"Donatella Della Ratta est écrivaine, artiste et conservatrice spécialisée dans les médias et les cultures arabes. Elle a été boursière postdoctorale à l'Annenberg School for Communication et est affiliée au Berkman Klein Center for Internet and Society de l'Université Harvard."},{"id":201903,"name":"Nadieh Bremer","subtitle":"","img":"/speakers/2019/Headshot-NBremer-3.jpg","bio":"Nadieh Bremer est une astronome diplômée et conceptrice de data visualisation. En 2017, elle a reçu le prix \"Best Individual\" de l'association \"Information is Beautiful\". Elle se concentre sur des visualisations de données interactives de conception unique."},{"id":201904,"name":"Memo Akten","subtitle":"Waves and Gods : on rituals for the future","img":"/speakers/2019/Memo_Akten.jpg","bio":"Artiste, chercheur et philomathe travaillant avec l'informatique comme médium pour étudier les collisions entre nature, science, technologie, éthique, rituel, tradition et religion. Il termine un doctorat à Goldsmiths en IA et machine learning."},{"id":201905,"name":"Foxdog Studios","subtitle":"","img":"/speakers/2019/foxdog-kikk-portrait.jpg","bio":"Consultants en informatique et programmateurs, ce duo crée des spectacles comiques où le public contrôle des jeux interactifs et gadgets DIY. Leur spectacle \"Robot Chef\" était sold-out au Fringe d'Édimbourg. Les téléspectateurs faisaient cuire des saucisses via un robot sur leur téléphone."},{"id":201906,"name":"Claudio Agosti","subtitle":"","img":"/speakers/2019/768px-ClaudioAgosti.jpg","bio":"Claudio Agosti est un technologue d'intérêt public. Depuis 21 ans, il travaille dans le domaine de la confidentialité numérique et de la sécurité sur Internet. Directeur du Tracking Exposed, il dirige une technologie d'analyse des algorithmes de plateformes."},{"id":201907,"name":"HeHe","subtitle":"Truth in fakes","img":"/speakers/2019/HeHe_thumbnail.jpg","bio":"HeHe, Helen Evans et Heiko Hansen, sont un duo d'artistes basé au Havre. Issus d'une génération des années 1980-1990, leur travail questionne les paradoxes sociaux, industriels et écologiques des paysages technologiques actuels. Ils utilisent l'humour, le romantisme et l'ingéniosité."},{"id":201908,"name":"Hyphen Labs","subtitle":"","img":"/speakers/2019/Capture-d-e-cran-2019-07-29-a-08.01.58.png","bio":""},{"id":201909,"name":"Jacques Andre","subtitle":"","img":"/speakers/2019/unnamed-(3).png","bio":"Jacques André est né en Bretagne. Il mène un travail de création multimédia entre image et art vivant : vidéo d'art, documentaire de création, performance, mise en scène et animation 3D couplée à de la programmation de données."},{"id":201910,"name":"Marshmallow Laser Feast","subtitle":"Orchestrated Sensory Experiences in the age of Anthropocene","img":"/speakers/2019/ErsinhanErsin_Headtshot_-FF.jpg","bio":"Ersin Han Ersin est directeur créatif de Marshmallow Laser Feast. Ce collectif d'art expérimental travaille dans l'espace liminal entre l'art, la technologie et le monde naturel, créant des langages visuels qui élargissent la perception."},{"id":201911,"name":"Random Studio","subtitle":"","img":"/speakers/2019/Daan-Lucas-Portrait-(1).jpg","bio":""},{"id":201912,"name":"Vladan Joler","subtitle":"","img":"/speakers/2019/vladan-bw.jpg","bio":"Vladan Joler est fondateur de la Fondation Share et professeur à l'Université de Novi Sad. Il dirige le Share Lab, un laboratoire d'investigation de données qui explore la transparence algorithmique, l'exploitation du travail numérique et les infrastructures invisibles."},{"id":201913,"name":"disnovation.org","subtitle":"Online Culture Wars","img":"/speakers/2019/logo_disnovation_test.png","bio":"DISNOVATION.ORG est un collectif basé à Paris. Au croisement de l'art contemporain, de la recherche et du piratage, ils développent des situations de perturbation pour questionner les idéologies techno-positivistes et stimuler des récits technologiques post-croissance."},{"id":201914,"name":"Patrick Tresset","subtitle":"","img":"/speakers/2019/patricktresset.jpg","bio":"Installé à Bruxelles, Patrick Tresset développe des installations artistiques mettant en scène des agents robotiques. Il utilise des systèmes informatiques pour sublimer les aspects expressifs et obsessionnels du comportement des robots, influencés par la recherche sur le comportement humain."},{"id":201915,"name":"Sissel Marie Tonn","subtitle":"Composing Attention","img":"/speakers/2019/Marcel-de-Buck_Van-Abbe_Sissel-Marie-Tonn-3704.jpg","bio":"Sissel Marie Tonn est une artiste danoise basée à La Haye. Dans sa pratique, elle explore les façons dont les humains perçoivent, agissent et s'immiscent dans les environnements. Elle est particulièrement fascinée par la façon dont nos sens affectent notre capacité à percevoir le changement."},{"id":201916,"name":"Julien Maire","subtitle":"Out of order","img":"/speakers/2019/JULIEN_MAIRE-(1).jpg","bio":"Né en 1969, Julien Maire travaille depuis le milieu des années 90 au croisement de la performance, de l'installation média et du cinéma. Ses œuvres ont été présentées à Transmediale, Ars Electronica, ZKM, ICC Tokyo, et au Festival de film de Rotterdam."},{"id":201917,"name":"Marie-des-Neiges Ruffo de Calabre","subtitle":"","img":"/speakers/2019/photo-2.png","bio":"Jeune philosophe belge, Marie-des-Neiges a choisi pour sa thèse les « systèmes d'armes létales autonomes ». Soutenue à Sorbonne Université, sa thèse sur les « Problèmes éthiques posés par le remplacement de l'humain par des robots » lui a valu un prix de l'IHEDN."},{"id":201918,"name":"Superhero Cheesecake","subtitle":"","img":"/speakers/2019/ArneVanKauter.jpg","bio":"Superhero Cheesecake est un studio de création basé à Amsterdam, dont le but est de créer des expériences interactives inoubliables. Le studio se définit par son obsession du détail et de l'établissement de relations durables avec ses partenaires."},{"id":201919,"name":"Dirty Monitor Audrey Ballez","subtitle":"","img":"/speakers/2019/Dirty-Monitor-Audrey.jpg","bio":"Originaire de Namur, Audrey Ballez alias Dirty Monitor gravite dans le monde artistique depuis ses 8 ans. Depuis plus de 10 ans installée à Charleroi, elle développe son projet artistique Dirty Monitors avec le fondateur du collectif, Mauro Cataldo."},{"id":201920,"name":"Nocomputer","subtitle":"Where did we go wrong?","img":"/speakers/2019/No-Computer-profile_picture.jpg","bio":"Wim Vanhenden, cofondateur de nøcomputer, combine perspicacité artistique et compétences technologiques pour créer des expériences engageantes. Un technologue créatif à l'intersection du design et des technologies nouvelles et émergentes."},{"id":201921,"name":"Dogstudio","subtitle":"An-e-motion","img":"/speakers/2019/antho-thomas.jpg","bio":"Anthony et Thao sont développeurs chez Dogstudio. Formés à la Haute Ecole Albert Jacquard à Namur, ils partagent leur vision de l'impact des animations web sur les gens et leurs trucs et astuces pour créer des émotions par le biais de la technologie."},{"id":201922,"name":"Sabrina Verhage","subtitle":"Back of house dreaming","img":"","bio":"Sabrina Verhage est une conceptrice de médias interactifs et technologue créative passionnée par les environnements interactifs immersifs. Elle a co-fondé Creative Coding Amsterdam, un rendez-vous mensuel pour les passionnés du coding créatif."},{"id":201923,"name":"Nadia Aime - Liliana Carrillo","subtitle":"Upgrading our society by using co-creative tools & processes. Let's collaborate!","img":"/speakers/2019/LilianaCarrillo_UniversityCollegeArtevelde.png","bio":"Liliana Carrillo est ingénieure en informatique avec un diplôme de maîtrise en intelligence artificielle. Elle plaide en faveur de systèmes de plaintes dans le cadre du GDPR, centrés sur l'agent et l'humain, et travaille à la création de systèmes plus résilients."},{"id":201924,"name":"Sofian Audry","subtitle":"Art + artificial agents","img":"/speakers/2019/Sofian-Audry-ToTheSooe-1.jpg","bio":"Sofian Audry crée des œuvres computationnelles en robotique, installations interactives et environnements immersifs. Son travail s'inspire de l'intelligence artificielle, de la vie artificielle, de la biologie et des sciences cognitives."},{"id":201925,"name":"Valery Vermeulen","subtitle":"Music, wall street, (deep) space and black holes","img":"/speakers/2019/ValeryVermeulenKIKK_Portrait01.jpg","bio":"Valery Vermeulen est musicien électronique, mathématicien et professeur invité au Conservatoire Royal de Gand. Il détient un doctorat en mathématiques pures et travaille sur des projets multimédias où l'interaction entre l'homme, la machine et les mathématiques joue un rôle central."},{"id":201926,"name":"Art Orienté Objet","subtitle":"Bioart et microbiote","img":"/speakers/2019/Portrait-en-pied-MD.jpg","bio":"Marion Laval Jeantet est bio-artiste et performeuse au sein du duo 'Art Orienté Objet'. Chercheuse en bio-anthropologie et en ethnopsychiatrie, son travail s'intéresse au lien de l'homme au vivant non-humain, en particulier à l'animalité et la barrière inter-espèces."},{"id":201927,"name":"Anna Ginsburg","subtitle":"","img":"/speakers/2019/unnamed-3.jpg","bio":"Née à Londres, Anna Ginsburg est une cinéaste qui se spécialise dans la combinaison de différentes méthodes — dessin à la main 2D, stop-motion, imagerie numérique et action en direct. Son premier vidéoclip pour Bombay Bicycle Club a remporté un Bafta."},{"id":201928,"name":"Martin Messier","subtitle":"Artiste pluriel","img":"/speakers/2019/4-Portrait_credit_Martin-Messier.jpg","bio":"Depuis plus de quinze ans, le Montréalais Martin Messier crée des œuvres où se rencontrent son, objet et image. Sous forme de performances et d'installations, ses créations mettent à l'avant-plan la présence du corps et le potentiel sonore des matériaux."},{"id":201929,"name":"Victor Galaz","subtitle":"Our Planet on the Edge – Can Technology Really Save Us?","img":"/speakers/2019/Viktor_Hogupplosta_2vignette.jpg","bio":"Victor Galaz est Directeur adjoint du Stockholm Resilience Centre. Ses recherches explorent les nouveaux défis sociétaux créés par les changements mondiaux rapides et les nouvelles technologies, notamment la géo-ingénierie et les systèmes d'alerte précoce des épidémies."},{"id":201930,"name":"Elise Morin","subtitle":"Spring Odyssey","img":"/speakers/2019/ELISE_MORIN_c2.jpg","bio":"Elise Morin est une artiste plasticienne française née en 1978. Elle développe des installations et des expériences empreintes de références aux différentes mutations des environnements contemporains. Son travail engage une réflexion sur le rapport entre la création et le bien commun."},{"id":201931,"name":"Aurelien Fache","subtitle":"Sexualités dé-hybridées","img":"/speakers/2019/me.jpg","bio":"Aurélien Fache est un personnage clé dans l'histoire de l'internet français. Après Multimania, Lycos et Caramail, il a participé à la création de Dailymotion en 2004 et cofondé le média en ligne Owni. Depuis 2013, il développe des objets connectés oniriques avec le collectif 'We love the Net'."},{"id":201932,"name":"Giulia Tomasello","subtitle":"","img":"/speakers/2019/Giulia-Tomasello.jpg","bio":"Giulia Tomasello est une créatrice innovante dans le domaine de la santé des femmes combinant la biotechnologie et les vêtements interactifs. Lauréate du prix Re-FREAM et du prix STARTS, décernés par EU Horizon 2020 pour ses projets Alma et Future Flora."},{"id":201933,"name":"HKI.PARIS","subtitle":"Off the Browser","img":"/speakers/2019/hkib-w.jpg","bio":"HKI (Hellohikimori) est une société de création indépendante basée à Paris, penseurs et fabricants depuis 2004. Ils créent des expériences numériques, des concepts créatifs, des installations interactives et des films, en confrontant technologie et design."},{"id":201934,"name":"Fragmentin","subtitle":"Artificial heaven, or the rise of technology in the era of global warming","img":"/speakers/2019/Fragmentin_-cre-uditsphoto-charlotte_krieger.jpg","bio":"Fragmentin est un studio artistique suisse fondé en 2014. Au croisement de l'art et de l'ingénierie, leur oeuvre questionne l'impact des technologies sur notre quotidien. Leurs installations démystifient des systèmes complexes par l'interaction et posent le hasard comme remède au contrôle."},{"id":201935,"name":"Spark AR Studio","subtitle":"Create Immersive AR Experiences for Facebook and Instagram with Spark AR","img":"/speakers/2019/Hannes-Verlinde.jpg","bio":"Hannes Verlinde est directeur technique chez Spark AR, l'équipe de Facebook responsable de la création de toutes les expériences AR sur Facebook, Instagram et Messenger. Il partage les compétences, les défis et les meilleures pratiques de l'AR en 2019."},{"id":201936,"name":"Rosalie Dumont Gagne","subtitle":"Règne artificiel","img":"/speakers/2019/36.jpg","bio":"Rosalie D. Gagné vit et travaille à Montréal. Titulaire d'une maîtrise en arts visuels de l'Université Concordia, ses œuvres ont été présentées au Canada, aux États-Unis, au Mexique et en Europe. Sa démarche prend racine dans la phénoménologie de la matière et de la perception."},{"id":201937,"name":"Julia Pfeiffer & Chiara Ullstein","subtitle":"Bias in Algorithms","img":"/speakers/2019/Julia-Pfeiffer-and-Chiara-Ullstein-BiasinAlgorithm.png","bio":"Julia Pfeiffer et Chiara Ullstein sont les fondatrices de ThinkTech, une ONG basée à Munich qui traite de l'impact des technologies numériques et de l'IA sur notre société, avec la devise \"Réfléchissez avant de coder\"."},{"id":201938,"name":"Chris Salter","subtitle":"Ethical Futurity or Raging against the Anthropocene","img":"/speakers/2019/Chris-salter_Portrait_Quadrat2.jpg","bio":"Chris Salter est artiste et professeur d'informatique à l'Université Concordia de Montréal. Son travail a été exposé à la Biennale de Venise, au Barbican Centre, au Vitra Design Museum et au National Art Museum de Chine. Il est l'auteur d'Entangled (MIT Press, 2010)."},{"id":201939,"name":"Ghofran Akil & Douglas Edric Stanley","subtitle":"Narrations jouables","img":"/speakers/2019/HEAD-conf-8CCyExAw.jpeg","bio":"Le Master Media Design de la HEAD–Genève se focalise sur l'apprentissage du design d'interaction pour l'innovation scientifique et sociale. Le programme met l'accent sur les défis engendrés par les intelligences artificielles et les nouvelles interfaces."},{"id":201940,"name":"Darsha Hewitt","subtitle":"","img":"/speakers/2019/HEWITT_SIDEMAN.jpg","bio":"Darsha Hewitt est une artiste canadienne connue pour ses recherches sur les technologies de communication domestiques. Par la déconstruction de technologies obsolètes, son travail vise à démystifier les systèmes cachés dans la technologie et les structures de pouvoir du capitalisme."},{"id":201941,"name":"Mala Kumar","subtitle":"","img":"/speakers/2019/MalaKumar_portrait1.jpg","bio":"Ces dix dernières années, Mala Kumar a travaillé dans les Tech au service du bien social. Elle a conçu une application en Afrique de l'Ouest pour aider les jeunes à s'engager dans la politique locale et a travaillé avec l'USAID et l'UNICEF."},{"id":201942,"name":"Base Design","subtitle":"","img":"/speakers/2019/Thomas-ThomasBase-carre-.jpg","bio":"Thomas Léon et Thomas Byttebier dirigent le studio bruxellois Base Design. Les \"Twomas\" ont collaboré pour Deezer, ING, BOZAR, La Fondation Cartier pour l'art contemporain, Delvaux et bien d'autres. Sur scène, ils parlent image de marque à l'ère du numérique."},{"id":201943,"name":"Nexus Studios","subtitle":"","img":"/speakers/2019/DSC07547.jpg","bio":"Alexander Jenkins est directeur de la création des arts interactifs chez Nexus Studios. Il crée des projets pour communiquer avec le public de façon surprenante, associant technologies numériques naissantes avec les disciplines de l'art, du design, de l'animation et du cinéma."},{"id":201944,"name":"Mimi Onuoha","subtitle":"","img":"/speakers/2019/mimi_image(1).jpg","bio":"Mimi Onuoha est une artiste et chercheuse nigério-américaine dont les travaux mettent en lumière les contradictions culturelles au sein des technologies. Sa pratique se concentre sur la façon dont les données et systèmes numériques représentent, ignorent et oublient certains publics."},{"id":201945,"name":"FIELD","subtitle":"Visualising the invisible","img":"/speakers/2019/FIELD-x-Ailsa-Bay-12.jpg","bio":"FIELD est un studio créatif spécialisé en art + technologie. Leur travail s'inspire des changements technologiques, créant des projets qui mélangent environnements physiques et virtuels en connectant des expériences audiovisuelles avec de la sculpture et du film."},{"id":201946,"name":"Jens Riegelsberger","subtitle":"","img":"/speakers/2019/Jens-Riegelsberger-Headshot.jpg","bio":"Avec plus de 12 ans d'expérience chez Google UX Design, Jens Riegelsberger dirige les équipes mondiales d'UX en Recherche, Informations et Assistanat. Il a transformé la vision des équipes de Google et a façonné la culture de développement de produits à l'échelle de l'entreprise."},{"id":201947,"name":"Tom Galle & Anush Sarkisian","subtitle":"We Live in a Hypermemetic Society","img":"/speakers/2019/Tom-Galle-mFg9_s2J.jpeg","bio":"Tom Galle, basé à Berlin, est l'incarnation même de l'artiste web contemporain. Son travail est empli de nuances hyper-numériques. Il crée un art à la fois philosophique et politique, mais aussi instantané et accessible, franchissant la ligne entre l'art académique et les cultures mèmes."},{"id":201948,"name":"Jacque Njeri","subtitle":"Representation","img":"/speakers/2019/Jacque-Njeri-WANJIRU-WEB-1.png","bio":"Jacque Njeri est une artiste multidisciplinaire dont le travail aborde la culture, le féminisme et l'autonomisation des femmes à travers des réalités extraterrestres projetées. Elle est titulaire d'un baccalauréat en art et design de l'Université de Nairobi."},{"id":201949,"name":"Chevalvert","subtitle":"Tooooools","img":"/speakers/2019/Chevalvert(1).jpg","bio":"Chevalvert est un studio de design visuel basé à Paris depuis 2007. La singularité du studio se caractérise par son rapport à l'image orienté objet et systémique, où le processus compte autant que le résultat."},{"id":201950,"name":"Gil Damoiseaux","subtitle":"Math is art","img":"/speakers/2019/Gil.jpg","bio":"Gil Damoiseaux est un analyste programmeur passionné par la 3D temps réel. Il a été démomaker, développeur de jeu vidéo (Outcast) et ingénieur de moteur 3D. Il enseigne le jeu vidéo à la H.E.A.J. en Belgique et est à l'origine du hackerspace namurois Incubhacker."}],"2020":[{"id":202000,"name":"Studio Moniker","subtitle":"Une série de discussions performatives","img":"https://placehold.it/400","bio":"-fondateurs du studio Moniker basé à Amsterdam. Avec Moniker, ils explorent les caractéristiques de la technologie et la façon dont elle influence notre vie quotidienne. Ils sont experts en projets participatifs et ont un faible pour le web, le cinéma et les performances. Leurs clients vont des inst"},{"id":202001,"name":"Espadaysantacruz","subtitle":"FAKE IT TILL YOU MAKE IT : exploring design and technology","img":"https://placehold.it/400","bio":", Espada y Santacruz combine l'innovation artisanale, la technologie et la créativité."},{"id":202002,"name":"Dries Depoorter","subtitle":"Art de la surveillance, téléphones mourants et faux likes","img":"https://placehold.it/400","bio":"Dries Depoorter est un artiste belge qui utilise la technologie pour rendre tangibles les phénomènes actuels de manière humoristique et directe. Son travail accrocheur aborde des thèmes tels que la vie privée, les médias sociaux, l'intelligence artificielle et la surveillance."},{"id":202003,"name":"Mélia Roger","subtitle":"Hacking vocal identity","img":"https://placehold.it/400","bio":"Conferences Hacking vocal identity Dates et heures Le 5 Nov 2020, de 10:20 à 11:00 Le lieu Théâtre Langue Anglais Tickets À propos Website Instagram Mélia Roger (née en 1996) est une artiste et sounddesigner basée à Zurich (Suisse)."},{"id":202004,"name":"Xander Steenbrugge","subtitle":"L'IA générative","img":"https://placehold.it/400","bio":"Xander Steenbrugge est chercheur indépendant en Machine Learning, YouTuber et artiste numérique belge. Après son mémoire sur les interfaces cerveau-ordinateur, il a dirigé la division de recherche appliquée au ML6, l'extension belge de l'IA."},{"id":202005,"name":"Cathline Smoos","subtitle":"Téléportez-vous grâce aux SexTech","img":"https://placehold.it/400","bio":"Passionnée du monde de la sexualité, des mondes imaginaires et de liberté, Cathline Smoos est une «Noosexploratrice» qui explore les confins de la sexualité et de l'imaginaire avec une dimension poétique et ludique. Elle partage son temps entre l'accompagnement des difficultés sexuelles et ses explorations créatives."},{"id":202006,"name":"Andreas Refsgaard","subtitle":"Playful Machine Learning","img":"https://placehold.it/400","bio":"Andreas Refsgaard est un artiste et codeur créatif basé à Copenhague. Il utilise des algorithmes et le machine learning pour permettre aux gens de jouer de la musique avec les mouvements des yeux ou de transformer des dessins d'instruments en véritables compositions."},{"id":202007,"name":"Lab212","subtitle":"Ce qui se trouve entre la pomme et l'assiette se peint aussi","img":"https://placehold.it/400","bio":"'artistes interdisciplinaire, fondé en 2008 à Paris."},{"id":202008,"name":"Filipe Vilas-Boas","subtitle":"Éthique et esthétique technologique","img":"https://placehold.it/400","bio":"Filipe Vilas-Boas est un artiste portugais qui vit à Paris. Son travail combine récupération, détournement et nouveaux médias. Il examine nos pratiques numériques et leurs implications éthiques. Il expose en France et à l'international : Tate Modern, UNESCO, MAAT Museum."},{"id":202009,"name":"LAb[au] - Els Vermang","subtitle":"Hocus Locus","img":"https://placehold.it/400","bio":"Conferences Hocus Locus Dates et heures Le 6 Nov 2020, de 11:20 à 12:00 Le lieu Théâtre Langue Anglais Tickets À propos Website Els Vermang est artiste et conservatrice."}],"2021":[{"id":202100,"name":"Tina Touli","subtitle":"Mélanger les mondes analogiques et numériques","img":"/speakers/2021/Tina-Touli-Portrait.jpg","bio":"Tina Touli est directrice de création, designer graphique, maker, conférencière et éducatrice. Elle dirige actuellement son propre studio multidisciplinaire basé à L"},{"id":202101,"name":"Cyril Diagne","subtitle":"Interfaces utilisateurs assistées par IA","img":"/speakers/2021/cyril-diagne.jpg","bio":"Cyril est co-fondateur de Init ML, une société spécialisée dans l'application du Machine Learning (technologie d'intelligence artificielle permettant aux ordinateurs"},{"id":202102,"name":"MediaMonks - Liva Grinberga","subtitle":"Liva Grinberga","img":"/speakers/2021/Liva_grinberga.jpg","bio":"Liva Grinberga est Lead Designer chez MediaMonks. Elle supervise une équipe de designers talentueux et a contribué à certains des projets les plus importants et les"},{"id":202103,"name":"Studio Moniker","subtitle":"Une série de discussions performatives","img":"/speakers/2021/portrait_modifie-.jpg","bio":"Luna Maurer et Roel Wouters sont les directeurs créatifs et les co-fondateurs du studio Moniker basé à Amsterdam. Avec Moniker, ils explorent les caractéristiques de"},{"id":202104,"name":"Caroline Sinders","subtitle":"Données féministes","img":"/speakers/2021/Caroline_Crop.png","bio":"Caroline Sinders est une artiste et designer critique. Depuis quelques années, elle examine les intersections entre l'intelligence artificielle, les abus et la polit"},{"id":202105,"name":"DIA Studio - Mitchell Paone","subtitle":"Mitchell Paone","img":"/speakers/2021/Mitch_Paone_USA.jpg","bio":"Mitch Paone est directeur créatif et partenaire l'agence de création basée à New York et Genève DIA Studio. Celle-ci est spécialisée dans le design graphique, la typ"},{"id":202106,"name":"Ivan Poupyrev - Google ATAP","subtitle":"Google ATAP","img":"/speakers/2021/IVAN-POUPYREV(2).png","bio":"Ivan Poupyrev est un inventeur, un scientifique, un concepteur et un directeur de l'ingénierie chez Google. Auparavant, il dirigeait une équipe chez Walt Disney et S"},{"id":202107,"name":"Louise Ashcroft","subtitle":"Faire ses achats à l'envers.","img":"/speakers/2021/IMG_4655.jpg","bio":"Louise Ashcroft (née en 1983, Yorkshire, Royaume-Uni) vit et travaille à Londres. De la fantaisie au pouvoir, les vidéos, installations et performances de Louise fon"},{"id":202108,"name":"Jer Thorp","subtitle":"Vivre parmi les données","img":"/speakers/2021/Jer-Thorp.png","bio":"Jer Thorp est un artiste, écrivain et enseignant vivant à New York. Il est surtout connu pour avoir conçu l'algorithme permettant de placer les près de 3 000 noms su"},{"id":202109,"name":"Cathline Smoos","subtitle":"Téléportez-vous grâce aux SexTech","img":"","bio":"Passionnée du monde de la sexualité, des mondes imaginaires et de liberté, cette nouvelle \"Noosexploratrice\" a décidé de prendre les commandes du vaisseau, afin d'ex"},{"id":202110,"name":"Moritz Stefaner","subtitle":"Qu'est-ce qu'un tableau de bord ?","img":"/speakers/2021/Moritz-Stefaner(1).jpg","bio":"En tant qu'indépendant comme \"Opérateur de vérité et de beauté\", Moritz Stefaner ne cesse de rechercher la forme parfaite de l'information. Grâce à sa formation en s"},{"id":202111,"name":"Loulou João","subtitle":"Miss Focket Forever Flower Bebe","img":"/speakers/2021/Loulou.JPG","bio":"Loulou João est une illustratrice et animatrice 3D Afro-belge, en raison de ses racines mixtes, elle a développé une vision du monde inter-dimensionnelle. Pour cette"},{"id":202112,"name":"Dries Depoorter","subtitle":"Art de la surveillance, téléphones mourants et faux likes","img":"/speakers/2021/Dries-Depoorter-by-Wim-Vzergan-Eesbeek-.jpg","bio":"Dries Depoorter est un artiste belge qui travaille avec la technologie. Ses œuvres accrocheuses et humoristiques abordent des thèmes tels que la vie privée, les médi"},{"id":202113,"name":"Xander Steenbrugge","subtitle":"L'IA générative","img":"/speakers/2021/Xander-Copy.jpg","bio":"Xander est chercheur indépendant en Machine Learning (technologie d'intelligence artificielle permettant aux ordinateurs d'apprendre sans avoir été programmés explic"},{"id":202114,"name":"Forensic Architecture - Lola Conte","subtitle":"Lola Conte","img":"/speakers/2021/forensic_architectur_djtqp1-scaled.jpeg","bio":"Lola est designer et chercheuse à Forensic Architecture, une agence de recherche basée à Goldsmiths, Université de Londres, qui produit des enquêtes spatiales sur le"},{"id":202115,"name":"Alison Killing","subtitle":"Enquête sur le réseau de camps de détention du Xinjiang","img":"/speakers/2021/Allison-Killing.jpeg","bio":"Alison Killing est une architecte qui a remporté le prix Pulitzer pour avoir dénoncé les camps d'internement chinois présumés. Elle a utilisé son expertise en matièr"},{"id":202116,"name":"Tim Bolland - KIKK Tech","subtitle":"CG Brain Freeze","img":"/speakers/2021/lick_the_drip.jpg","bio":"Rejoignez Tim Bolland alors qu'il présente son récent travail sur Magnum Ice Cream. Il explorera les différents défis et techniques utilisés pour aider à ré-imaginer"},{"id":202117,"name":"Klasien van de Zandschulp","subtitle":"Réalités hybrides","img":"/speakers/2021/profiel_phone.png","bio":"Klasien van de Zandschulp (www.klasien.nl) est la directrice créative du studio affect lab. affect lab est une plateforme créative et un cabinet de recherche. affect"},{"id":202118,"name":"Andreas Refsgaard","subtitle":"Playful Machine Learning","img":"/speakers/2021/Andreas-Refsgaard.jpeg","bio":"Andreas Refsgaard est un artiste basé à Copenhague. Travaillant dans le domaine entre l'art et le design d'interaction, il utilise les algorithmes, le codage et l'ap"},{"id":202119,"name":"Robert Henke","subtitle":"La fabrication du CBM8032AV","img":"/speakers/2021/Robert_Henke_Lumiere_III_by_RobertHenke_Pink_1920x1080.jpeg","bio":"Robert Henke est compositeur, artiste et développeur de logiciels. Il est principalement connu pour ses contributions à la musique électronique et pour ses œuvres au"},{"id":202120,"name":"Bellingcat - Aiganysh Aidarbekova","subtitle":"Aiganysh Aidarbekova","img":"/speakers/2021/logo-BC-(1).jpeg","bio":"Aiganysh Aidarbekova est une chercheuse et investigatrice du Kirghizistan pour Bellingcat. Elle a enquêté sur des fonctionnaires corrompus, a construit des bases de"},{"id":202121,"name":"Isabelle Arvers","subtitle":"Décolonisation de l'art numérique et des jeux","img":"/speakers/2021/restitution-atelier-lome-copie.jpg","bio":"Isabelle Arvers est une artiste et commissaire d'exposition française dont les recherches portent sur l'interaction entre l'art et les jeux vidéo. Au cours des vingt"},{"id":202122,"name":"Lab212","subtitle":"Faire simple, c'est compliqué","img":"/speakers/2021/_portrait_NicolasGuichardBeatriceLartigue-copie.jpg","bio":"Le Lab212 est un collectif d'artistes interdisciplinaire, fondé en 2008 à Paris. A travers les nouveaux médias, le collectif réalise des installations qui explorent"},{"id":202123,"name":"Thomas Kubski - Deloitte Digital","subtitle":"La réalité mixte pour les décisions d'entreprises","img":"/speakers/2021/Thomas_Kubski.jpg","bio":"Thomas est un expert en stratégie numérique et en expérience utilisateur. Il est co-auteur du Digital Delivery Model, qui combine le design thinking et l'agile et qu"},{"id":202124,"name":"Ronald Grauer - benuts","subtitle":"Hinterland, étude de cas","img":"/speakers/2021/Hint2.jpg","bio":"Hinterland est centré sur un ancien prisonnier de guerre autrichien, Peter Perg, qui rentre chez lui à Vienne en 1920. Tout a changé. Le puissant empire austro-hongr"},{"id":202125,"name":"François Grassard","subtitle":"Vers une modernisation des outils de Motion-Design","img":"/speakers/2021/Francois_Grassard.jpg","bio":"François GRASSARD est le co-fondateur, chef de produit et responsable de la communication de Left Angle. Il sera présent avec la Délégation Minalogic Auvergne Rhône-"},{"id":202126,"name":"Table ronde de créatifs nantais","subtitle":"Des espaces de fabrication et des usines créatives","img":"/speakers/2021/S02-JON-07.15-15-45.JPG","bio":"Conferences Des espaces de fabrication et des usines créatives... Dates et heures Le 5 Nov 2021, de 12:00 à 13:00 Le lieu Bourse Langue Français Tickets A propos Franky Trichet - Vice-président en charge de l’innovation, du numérique et des relations internationales de Nantes Métropole Fabrice Berth"},{"id":202127,"name":"Amélie Bouvier, Lucien Bitaux & André Fuzfa","subtitle":"Chill & Sciences : Arts, sciences & technologies","img":"/speakers/2021/P1390406.JPG","bio":"Diplômée des Ecoles des Beaux-Arts de Toulouse, Amélie Bouvier est une artiste à la fois déconstructive et poétique dans son approche, son œuvre lutte avec l'espace"},{"id":202128,"name":"Active Theory","subtitle":"Repousser les limites de la technologie Web créative","img":"/speakers/2021/eddiemichaelpic.jpg","bio":"Eddie Benson est un stratège numérique créatif. Ayant travaillé avec l'équipe d'Active Theory pendant près de quatre ans à Los Angeles, Londres et Amsterdam, Eddie a"},{"id":202129,"name":"Carolien Teunisse","subtitle":"Augmentations (non) naturelles","img":"/speakers/2021/(un)natural_augmentations_3.jpg","bio":"Carolien Teunisse est une artiste des médias visuels et une conférencière basée à Utrecht. Avec son travail, elle vise à découvrir les dialogues intéressants qui se"},{"id":202130,"name":"Robert Werner - Artifical Rome","subtitle":"Artifical Rome","img":"/speakers/2021/speaker.jpg","bio":"Artificial Rome est un studio de conception numérique et de communication visuelle. Offrant des expériences interactives approfondies et expérimentant sans cesse, il"},{"id":202131,"name":"Zachary Diebold - Cowboy","subtitle":"Cowboy","img":"/speakers/2021/Zach-Diebold_500.png","bio":"Cowboy est le vélo électrique connecté pour les usagers urbains et continue de transformer l'espace du vélo et de la mobilité - du point de vente au point de service"},{"id":202132,"name":"Gilles Bazelaire","subtitle":"Session de présentation : Utilisation des technologies immersives","img":"/speakers/2021/gilles-bazelaire-light.jpg","bio":"Session de présentation :  Utilisation des technologies immersives et interactives et du design d'expérience dans les lieux à fort taux de fréquentation : espaces pu"},{"id":202133,"name":"S+T+ARTS talk - Art / Science / Technologie","subtitle":"Art / Science / Technologie","img":"/speakers/2021/Capture-d-e-cran-2021-10-30-a-17.54.15.png","bio":"Ce lunch talk vous présente 2 projets réalisés dans le cadre des projets S+T+ARTS: un collaboration Art / Sciences avec le projet Synthetic Choir et une collaboratio"}],"2022":[{"id":202200,"name":"Anastasia Pistofidou","subtitle":"Des FabLabs aux laboratoires de textiles et de matériaux","img":"","bio":"Grâce à une pratique interdisciplinaire au carrefour de la fabrication numérique, des textiles et de la biologie nous naviguerons à travers des projets qui activent la co-création citoyenne et exploreront différentes voies pour le design circulaire en promouvant des écosystèmes de matériaux circulai"},{"id":202201,"name":"Alex Verhaest","subtitle":"Penser comme des étrangers ","img":"","bio":"Alex Verhaest a étudié à Bruxelles à la Luca School of arts, où elle est professeure invitée depuis 2015"},{"id":202202,"name":"Ytasha Womack","subtitle":"Afrofuturisme : Revendiquer notre humanité dans la technologie","img":"","bio":"Cet atelier permettra de repenser les approches centrées sur l humanité, tant pour créeret la vie dans un monde où nous dépendons de plus en plus des technologies"},{"id":202203,"name":"Merci Michel","subtitle":"Etude de cas \"Coastal World\" — estomper la frontière entre marketing digitale et gaming","img":"","bio":"\"Coastal World\" est une plateforme web 3D gamifiée, réalisée pour le compte de la banque américaine Coastal Community Bank"},{"id":202204,"name":"Pilar Rosado","subtitle":"Spéculations post-photographiques sur les algorithmes intelligents, la co-création et la recherche.","img":"","bio":"Aujourd hui, la caméra et l œil humain sont remplacés par les algorithmes et l intelligence artificielle. Il est nécessaire de réfléchir à nouveau au rôle que les images et le patrimoine artistique ont joué dans la construction de notre sensibilité"},{"id":202205,"name":"Marcus Wendt – FIELD","subtitle":"Seeding the Future","img":"","bio":"Dans les coulisses de FIELD.IO et de ses nouveaux produits dérivés SYSTEMS + BLUE."},{"id":202206,"name":"Anouk Kruithof","subtitle":"Pratiquer la convivialité : l art n est presque jamais fait seul","img":"","bio":"La danse - le corps en mouvement - plus que tout dans notre monde divers et complexe nous unit dans la reconnaissance de notre fragilité"},{"id":202207,"name":"Délégation France","subtitle":"IMMERSION 2030 – quels seront les enjeux de médiation, de présentation et de conservation des œuvres immersives pour les institutions culturelles ?","img":"","bio":"On sait ce que sont les dispositifs actuels, mais qu en sera-t-il demain ?"},{"id":202208,"name":"Phoenix Perry","subtitle":"Talk write up","img":"","bio":"Phoenix Perry crée des jeux et des installations entremêlés."},{"id":202209,"name":"Deloitte Digital","subtitle":"Que peut apporter la réalité augmentée/mixte/virtuelle à mon organisation ?","img":"","bio":"Que peut apporter la réalité augmentée/mixte/virtuelle à mon organisation ?"},{"id":202210,"name":"MOJO Agency","subtitle":"Quelle relation construire entre le numérique et l environnement ?","img":"","bio":"L impact carbone du numérique est plus importante que celle du transports aérien. On fait quoi ?"},{"id":202211,"name":"Portrait XO","subtitle":"","img":"","bio":"Récemment présenté en première mondiale à SXSW et en Californie, Portrait XO présente \"WIRE\", des audiovisuels générés par l IA et mettant en scène ses dernières recherches en matière d IA créative."},{"id":202212,"name":"Blast Theory","subtitle":"Interactive = Unfinished","img":"","bio":"Matt Adams will show interactive projects Blast Theory have created at the Venice Biennale, in Nagoya and in Philadelphia, showing how the artists use different forms of interactivity to engage and activate the public"},{"id":202213,"name":"Clara Daguin","subtitle":"Révéler l invisible","img":"","bio":"\"Révéler l invisible\" examine le travail de la créatrice de mode/artiste Clara Daguin à travers plusieurs projets, collections et collaborations"},{"id":202214,"name":"Alber-K","subtitle":"When Music meets Tech","img":"","bio":"Alber-K est diplômé du Georgia Institute of Technology (USA), un établissement de renommée mondiale. Il mène actuellement des recherches sur les nouvelles technologies musicales et développe de nouveaux dispositifs matériels et instruments de musique électroniques."},{"id":202215,"name":"Mutant & nocomputer","subtitle":"How much colour does your grey matter have?","img":"","bio":"Mutant et nocomputer présentent \"Think in Colour\", une campagne créée pour le magazine d actualité Knack, une publication ouverte à la diversité des idées et aux nuances d opinion."},{"id":202216,"name":"L Effet Québec","subtitle":"L écosystème montréalais repousse les frontières technologiques pour émerveiller et rassembler!","img":"","bio":"À la rencontre de créateurs québécois en vue de collaborations transatlantiques!"},{"id":202217,"name":"Vincent Morisset","subtitle":"","img":"","bio":"Vincent Morisset est un réalisateur connu pour son utilisation astucieuse de la technologie."},{"id":202218,"name":"Pau Garcia – Domestic Data Streamers","subtitle":"Transformer les feuilles de calcul Excel en émotions collectives","img":"","bio":"Nous, les humains, avons du mal à faire preuve d empathie envers de grandes quantités d informations. Comment résoudre ces défis lorsque les problèmes auxquels nous sommes confrontés aujourd hui sont si intrinsèquement grands, interconnectés, méchants et mondialisés ?"},{"id":202219,"name":"Iregular","subtitle":"Cursor : Une technologie interactive qui transforme les villes en musées","img":"","bio":"Une technologie intéractive qui transforme les villes en musées"},{"id":202220,"name":"Olia Lialina","subtitle":"Welcome to My Metaverse","img":"","bio":"Olia Lialina est l un des participants les plus connus de la scène du net.art des années 1990."},{"id":202221,"name":"David Bennett","subtitle":"Des humains numériques pour les industries créatives","img":"","bio":"Mimic Productions, un studio 3D qui crée les humains numériques les plus réalistes au monde pour tous les secteurs d activité, présentera ses études de cas et ses ambitions pour les êtres virtuels."},{"id":202222,"name":"Lauren Moffatt","subtitle":"The Digital Strange","img":"","bio":"Lauren Moffatt est une artiste australienne qui travaille avec des environnements immersifs et des pratiques narratives expérimentales"},{"id":202223,"name":"Annie Saunders","subtitle":"Il fallait y être : vivacité, créativité et imprévu","img":"","bio":"'You had to be there': liveness, creativity and the unforeseen"},{"id":202224,"name":"Lundahl & Seitl","subtitle":"A Language of What May Not Be Said","img":"","bio":"Lundahl & Seitl, formé en 2003, fait une recherche continue sur la question de la façon dont nous percevons la réalité."},{"id":202225,"name":"Nicolas Nova","subtitle":"Laboratoires de soins cachés : les ateliers de réparation de smartphones comme centres sociaux","img":"","bio":"\"Dr. Smartphone,\" \"iklinik,\" \"Smartphone clinique…\""},{"id":202226,"name":"Base Design","subtitle":"Comment créer une culture de studio","img":"","bio":"How to create a studio culture? Plongez au coeur des processus qui ont boosté Base design. "},{"id":202227,"name":"Kathleen Siminyu","subtitle":"Honorer le kiswahili à travers la technologie et la communauté","img":"","bio":"Kathleen Siminyu est une chercheuse en intelligence artificielle qui se concentre sur le traitement du langage naturel pour les langues africaines."},{"id":202228,"name":"Sophie de Oliveira Barata","subtitle":"The alternative limb project","img":"","bio":"Le projet Alternative Limb a été fondé par Sophie de Oliveira Barata, elle utilise un medium unique; les prothèses pour créer des œuvres d art portables super stylées."},{"id":202229,"name":"Immersive Garden","subtitle":"L intuition comme élément principal du processus ","img":"","bio":"Studio de production numérique basé à Paris, spécialisé dans le design, l animation et le développement."},{"id":202230,"name":"Neil Mendoza","subtitle":"Écrans et machines","img":"","bio":"Artiste numérique connu pour ses œuvres cinétiques et ses installations humoristiques, robotiques et de creative coding."},{"id":202231,"name":"Kimchi and Chips","subtitle":"Des images qui changent notre façon de voir","img":"","bio":"Artistes numériques basés à Séoul, qui fusionnent art, science et technologie."},{"id":202232,"name":"SNASK","subtitle":"Change is Fu*king Inevitable","img":"","bio":"Agence de création de renommée internationale basée à Stockholm, qui crée des images de marque, des designs et des films qui déchirent."},{"id":202233,"name":"Artificial Rome","subtitle":"Creating the Metaverse since 1996","img":"","bio":"Studio de création d expériences interactives en ligne, VR, AR et gaming."},{"id":202234,"name":"Accurat","subtitle":"Les choses que j aurais aimé savoir AVANT de lancer un studio de conception de données","img":"","bio":"Studio de data visualisation, design et développement basé à Milan et New York."},{"id":202235,"name":"Onformative","subtitle":"L inspiration et la co-création à l ère des données et de l IA","img":"","bio":"Studio créatif basé à Berlin et spécialisé en art numérique et design."}],"2023":[{"id":202300,"name":"Nelly Ben Hayoun-Stépanian","subtitle":"Radical Imagination at Work","img":"/speakers/2023/Nelly-Ben-Hayoun-Stepanian-in-their-office-Photo-by-Kasia-Bobula-for-Soho-House-magazine.jpg","bio":"Comment faire évoluer les esprits et les systèmes grâce à la pluralité et à l'imagination radicale ?"},{"id":202301,"name":"Edan Kwan","subtitle":"Immersive Experience in Pyjamas: A Fantastical Bedtime Story from the Realm of creativity","img":"/speakers/2023/Edan-Kwan_LUSION.jpg","bio":"Edan Kwan (né en 1986 à Hong Kong) est un artiste numérique visionnaire et le directeur créatif très demandé de Lusion, un studio de production numérique primé à plusieurs reprises."},{"id":202302,"name":"Anagram","subtitle":"Everything you feel is real","img":"/speakers/2023/anagram-e1694707012606.png","bio":"Kirsty Jennings est productrice exécutive pour Anagram, un studio créatif primé spécialisé dans la narration interactive et la conception d'expériences immersives."},{"id":202303,"name":"Maywa Denki","subtitle":"Closing talk & robotic music performance","img":"/speakers/2023/2023_tosa-3.jpg","bio":"Une conférence de clôture par les stars japonaises, enrichie d'une incroyable performance musicale robotique !"},{"id":202304,"name":"Jack Isles","subtitle":"Hostile Waters ; Strategies for Resistance","img":"/speakers/2023/Jack-Headshot_001.jpg","bio":"\"Hostile Waters\" explore les limites érodées et la violence intrinsèque des frontières intérieures et extérieures de l'Europe."},{"id":202305,"name":"Gemma O'Brien","subtitle":"How to Be An Ultra Artist","img":"/speakers/2023/Gemma-O_Brien-Artist-credit-Jeremy-Shaw_sq-scaled.jpeg","bio":"Gemma racontera les débuts de sa carrière, les processus pratiques à l'origine de ses plus grandes installations murales et expliquera ce que signifie, selon elle, être une artiste ultra."},{"id":202306,"name":"Porto Rocha","subtitle":"What Futures Could We Design ?","img":"/speakers/2023/PortoRocha1200px.jpg","bio":"PORTO ROCHA est une agence de branding et de design basée à New York développant un travail créatif et stratégique qui s'engage profondément dans le monde dans lequel nous vivons."},{"id":202307,"name":"Nadieh Bremer","subtitle":"Visualizing Connections","img":"/speakers/2023/NBremer-Credit-to-Piek.cc-1211-1.jpg","bio":"Nadieh Bremer, diplômée en astronomie, est une artiste de la visualisation de données reconnue et primée."},{"id":202308,"name":"Étienne Mineur","subtitle":"Using complementary intelligences in design","img":"/speakers/2023/etiennemineur.jpg","bio":"Comment l'IA peut-elle contribuer à améliorer le processus créatif ?"},{"id":202309,"name":"Kling Klang Klong","subtitle":"Resonance : Exploring the Transformative Power of Sound","img":"/speakers/2023/02.jpg","bio":"Découvrez ce collectif innovant, qui fusionne depuis dix ans musique, son, technologie et science."},{"id":202310,"name":"Maya Indira Ganesh & Georgina Voss – Writing Club","subtitle":"The hard watery edges of AI","img":"/speakers/2023/L1000907.jpg","bio":"Une conférence-performance qui interroge la matérialité de la cohabitation à l'époque de l'IA."},{"id":202311,"name":"Carl Addy","subtitle":"A Journey to Mayda","img":"/speakers/2023/Carl_BW-2.jpg","bio":"Carl Addy est un directeur créatif exécutif et un réalisateur pluridisciplinaire. Il réalise des travaux visuels révolutionnaires dans les domaines du design, des médias numériques et de la technologie VR immersive."},{"id":202312,"name":"Mélodie Mousset","subtitle":"Echoes of the Jellyfish : A synesthetic conversation between species","img":"/speakers/2023/melodie_119.jpg","bio":"Échos de la méduse : une conversation synesthésique inter-espèces."},{"id":202313,"name":"Navid Navab","subtitle":"Adventures With Excitable Matter : From Music to Surgery","img":"/speakers/2023/IMG_3378.jpg","bio":"Dans cet exposé, Navid partage ses aventures post-Schizophonic de co-création avec la dynamique computationnelle de la matière."},{"id":202314,"name":"Vera-Maria Glahn","subtitle":"The Handbook of Non-Toxic Leadership in the Creative Industries","img":"/speakers/2023/2022-vera-portraits-final-crop-print-02-1.jpg","bio":"Le \"Manuel\" de Vera-Maria Glahn vise à sensibiliser et fournir de l'inspiration et des conseils concrets sur la manière de \"créer en collaboration\" d'une manière positive et solidaire, pour une culture du travail plus égalitaire et plus diversifiée."},{"id":202315,"name":"Brian Afande","subtitle":"Demystification of the African XR landscape","img":"/speakers/2023/IMG-7387-2.jpg","bio":"Cet exposé propose un voyage à travers les écosystèmes XR africains, leurs cas d'utilisation, leurs défis, leurs réussites, leurs perspectives d'avenir et les opportunités qui s'offrent à eux."},{"id":202316,"name":"Tatiana Vilela dos Santos","subtitle":"Crafting Magic : Transforming Interactive Installations into Playful Adventures","img":"/speakers/2023/photo5.jpg","bio":"Abordez le design d'installation interactive du point de vue d'un game designer, par-delà la manette et l'écran, comme expansion du domaine du jeu vidéo au-delà des frontières du numérique."},{"id":202317,"name":"Kyle McDonald","subtitle":"Notes from the Pacific","img":"/speakers/2023/KyleMcDonald-portrait-4-1-1.jpg","bio":"Une réflexion sur nos relations avec les autres et avec l'environnement, et sur le lien entre la société et la technologie."},{"id":202318,"name":"Alysha Naples","subtitle":"Transceive, Transport, Transcend","img":"/speakers/2023/2308_home.jpg","bio":"Comment pouvons-nous utiliser la technologie pour créer des expériences transcendantes ?"},{"id":202319,"name":"Daito Manabe","subtitle":"The Power of Collaboration","img":"/speakers/2023/daito_manabe_portrait2.jpg","bio":"Découvrez les processus et les contextes qui permettent de mener à bien de grands projets."},{"id":202320,"name":"Fernanda Gonzalez","subtitle":"Embracing Change : Designing Experiences in Times of Uncertainty","img":"/speakers/2023/Fer-FITC-Square.jpg","bio":"Stratégies pratiques destinées aux professionnels du design pour mettre en place des équipes performantes."},{"id":202321,"name":"Zach Lieberman","subtitle":"Working openly","img":"/speakers/2023/0077895.jpg","bio":"Explorez le remaniement du processus créatif lorsqu'il se fait de manière ouverte."},{"id":202322,"name":"Freya Salway","subtitle":"Culture X Technology experiments with the Head of Google Arts & Culture Lab","img":"/speakers/2023/freya-bio-image.jpg","bio":"Rencontrez la responsable du Google Arts & Culture Lab à propos de son programme de résidence d'artistes."},{"id":202323,"name":"OMSE","subtitle":"The Ducks Legs","img":"/speakers/2023/IMG_5906-1.jpg","bio":"OMSE est un studio créatif qui conçoit des marques simples et percutantes."},{"id":202324,"name":"Anna Ridler","subtitle":"Synthetic Data","img":"/speakers/2023/image001-1-1-1.jpg","bio":"Anna Ridler est une artiste et une chercheuse qui travaille sur les systèmes de connaissance et sur la façon dont les technologies sont créées afin de mieux comprendre le monde."},{"id":202325,"name":"Tactical Tech","subtitle":"And so what ?","img":"/speakers/2023/Marek_headshot_2021.jpg","bio":"Est-il possible de raconter des histoires convaincantes qui créent quelque chose de plus positif que quelques démangeaisons mentales et un inconfort à court terme ?"},{"id":202326,"name":"Valentina Peri","subtitle":"Love, Lies and Romance Scam","img":"/speakers/2023/Portrait_Valentina_Peri.jpg","bio":"Valentina Peri est une commissaire d'exposition indépendante, une artiste et une autrice basée à Paris. Son exposition itinérante \"Data Dating\", sur l'amour à l'ère d'Internet, a été présentée à Paris, Tel Aviv, Londres, Bruxelles, Genève et Brescia."},{"id":202327,"name":"Martial Geoffre-Rouland","subtitle":"Design, Engineering & Art : A Cycle of Creative and Technical Synergy","img":"/speakers/2023/f6bacce2-f656-41e7-8ef3-b7e7920cc630.jpg","bio":"Exploration par le studio Screen-Club du parcours de co-création entre artistes et technologues."},{"id":202328,"name":"Špela Petrič","subtitle":"AI as Infrastructure, Automation as Care","img":"/speakers/2023/SPELA-PETRIC-portait_photo@ANZE-SEKELJ-scaled.jpg","bio":"Špela Petrič (Slovénie) est une artiste des nouveaux médias formée aux sciences naturelles."},{"id":202329,"name":"Simone Rebaudengo","subtitle":"Intelligence as a material","img":"/speakers/2023/simone-A-scaled.jpg","bio":"Durant son exposé, Simone ne vous expliquera pas comment vous simplifier la vie grâce à l'IA, mais plutôt le contraire..."},{"id":202330,"name":"Antoine Bertin","subtitle":"Biomimetic Listening","img":"/speakers/2023/2021-12-17-Leg-Bloom_Portrait_AntoineBertin_DSC08835-©Marin-LE-ROUX-polaRYSE-Fondation-Tara-Ocean-scaled.jpg","bio":"Antoine Bertin est un artiste européen qui travaille à l'intersection de la science et de l'immersion sensorielle, de l'enregistrement sur le terrain et de la narration sonore, des données et de la composition musicale."},{"id":202331,"name":"Studio Mals","subtitle":"Clever, Colorful, Playful","img":"/speakers/2023/TeamMals-02-1.jpg","bio":"Martin van der Molen et Silas Nout du Studio Mals créent de fascinants films et images de haute qualité."},{"id":202332,"name":"State","subtitle":"Naked - The beauty of feeling uncomfortable","img":"/speakers/2023/Marcel_Headshot.jpg","bio":"Marcel Ziul, fondateur et directeur exécutif de la création de STATE, a une riche expérience professionnelle dans plusieurs pays, dont les États-Unis et le Brésil."},{"id":202333,"name":"Chris Salter","subtitle":"The art, science and politics of immersion","img":"/speakers/2023/CSALTER_PORTRAIT.jpg","bio":"Un tableau historique et socio-technique critique de nos visions actuelles et futures de l'art à l'ère de l'immersion."},{"id":202334,"name":"Henry Daubrez","subtitle":"Coming of A(I)ge","img":"/speakers/2023/6025_10153462876003520_1848223907358575662_n.jpg","bio":"Le récit fidèle de deux années de péripéties dans le domaine de l'IA générative."},{"id":202335,"name":"Laser Talks Brussels","subtitle":"Illuminating Liquid Crystals : A Fusion of Art and Scientific Exploration","img":"/speakers/2023/Domnitch-Gelfand_photo-P_Vogelenzang1.jpg","bio":"Dans le cadre d'un projet novateur intitulé \"Lemniscate Cascade\", des artistes et des scientifiques unissent leurs forces pour percer les secrets des cristaux liquides sensibles à la lumière."},{"id":202336,"name":"L'Effet Québec","subtitle":"L'Effet Québec : immersive installations & large scale public projects","img":"/speakers/2023/Xn-Effet-QC_KIKK_Website_2023-10-20-A.jpg","bio":"Une discussion menée par Fisheye Immersive avec la SAT, MUTEK, OTTOMATA et Transversal Studio."},{"id":202337,"name":"Digital Inter/Section (DI/S)","subtitle":"How to make money with new media art ? The Starving Artist Myth and other misconceptions","img":"/speakers/2023/4fe908941ddec6b05e3dd01f26d13dc253137b21-adespondsdc.jpg","bio":"Comment gagner de l'argent avec les arts des nouveaux médias ? Table ronde."},{"id":202338,"name":"Virginie Civrais & Nejma Ben Brahim","subtitle":"ST'ART, l'Invest des créateurs : opportunités de financement des ICC en Wallonie et à Bruxelles","img":"/speakers/2023/B9723892760Z.1_20200701191911_000GMVG8ST57.1-0.jpg","bio":"Quelles opportunités pour le financement des secteurs culturels et créatifs sur notre territoire ?"},{"id":202339,"name":"Focus ICC Wallonie-Bruxelles","subtitle":"Parcours inspirants d'industriel.le.s culturel.le.s et créatif.ve.s","img":"/speakers/2023/Hovertone1.jpg","bio":"Parcours inspirants d'industriel.le.s culturel.le.s et créatif.ve.s en Wallonie-Bruxelles."},{"id":202340,"name":"HITT","subtitle":"Jeux vidéo et innovations XR : les ponts entre ludification et industrie","img":"/speakers/2023/A6K_Driving_simulator_AISIN_shared_equipments.jpg","bio":"Jeux vidéo et innovations XR : les ponts entre ludification et industrie."},{"id":202341,"name":"HACNUM","subtitle":"Exploring the French digital creation ecosystem","img":"/speakers/2023/hacnum.jpg","bio":"Une exploration de l'écosystème français de la création numérique."}],"2024":[{"id":202400,"name":"Grégory Chatonsky","subtitle":"","img":"/speakers/2024/alula-DSC6070_Lorenzo-Arrigoni-scaled-772x579.jpg","bio":"Grégory Chatonsky est un artiste franco-Canadien qui explore une zone trouble entre l’être humain et la technique dans ses fictions et sa manière de travailler. Ce trouble modifie la définition de la finitude jusqu’au point où elle n’est plus existentielle. Son démarche constitue une exploration de "},{"id":202401,"name":"Cristina Tarquini","subtitle":"","img":"/speakers/2024/crtqSmall-772x579.jpg","bio":"Cristina Tarquini, directrice de création et technologue, crée des expériences immersives en associant la narration visuelle à la technologie interactive, en fusionnant les domaines numériques et physiques pour créer des moments percutants pour les marques. Son travail explore l’IA et le design inte"},{"id":202402,"name":"Naadira Patel - softwork studio","subtitle":"","img":"/speakers/2024/NaadiraPatel_photo-by-Zen-Marie-772x579.jpg","bio":"Naadira Patel est une artiste sud-africaine et la directrice de softwork studio, un cabinet de design et de conservation qui travaille dans les domaines de l’art, de l’architecture et du travail d’organisation féministe et queer. Elle est membre d’Imperfect Futures (IF), un collectif interdisciplina"},{"id":202403,"name":"Bruno Ribeiro - Stroboscope","subtitle":"","img":"/speakers/2024/Bruno-Ribeiro-772x579.jpg","bio":"Bruno Ribeiro est un directeur créatif primé et un artiste média, avec plus de 15 ans d’expérience internationale dans les arts et le divertissement. Sa pratique artistique couvre un large éventail : installations artistiques, œuvres interactives, scénographie, expériences immersives, projections mo"},{"id":202404,"name":"Sofia Crespo","subtitle":"","img":"/speakers/2024/%C2%A9FILIPA_AURELIO_SOFIA-CRESPO-PORTRAITS-13-772x579.jpg","bio":"L’artiste Sofia Crespo est passionnée par l’exploration des intersections entre l’art, la science et l’intelligence artificielle. S’inspirant du vivant et de la complexité fascinante des systèmes biologiques, elle crée des espèces oniriques à l’aide de l’IA. Ses créations remettent en question notre"},{"id":202405,"name":"Stefan Sagmeister","subtitle":"","img":"/speakers/2024/Stefan_Sagmeister_by_c_jamesbraund-scaled-e1727428490549-772x579.jpg","bio":"Stefan Sagmeister a travaillé pour des clients aussi divers que les Rolling Stones et le musée Guggenheim. Il a remporté deux Grammies et pratiquement toutes les récompenses internationales importantes en matière de design. Si son travail est imprégné de graphisme, il a également réalisé un film, cr"},{"id":202406,"name":"Anouk Wipprecht","subtitle":"","img":"/speakers/2024/PANA4780_H2-1-scaled-772x579.jpg","bio":"Dutch FashionTech designer Anouk Wipprecht creates designs ahead of her time; combining the latest in science and technology to make fashion an experience that transcends mere appearances. She wants her garments to facilitate and augment the interactions we have with ourselves and our surroundings. "},{"id":202407,"name":"Liza Enebeis - Studio Dumbar​/​DEPT®","subtitle":"","img":"/speakers/2024/LizaEnebeis_97A9130RED-scaled-e1727883426731-772x579.jpg","bio":"Liza est partenaire et directrice créative chez Studio Dumbar/DEPT®, une agence internationale primée d’origine néerlandaise, spécialisée dans le branding visuel et le motion design. Liza est directement impliquée dans tous les projets principaux tels que l’identité en mouvement d’Instagram, le fest"},{"id":202408,"name":"Mr Bingo","subtitle":"","img":"/speakers/2024/Mr-B_Portrait-by-Carlos-Guillen-Apezteguia-772x579.jpg","bio":"M. Bingo a été illustrateur commercial pendant 15 ans, travaillant régulièrement pour des clients tels que The New Yorker, The Guardian, TIME, CH4, The Mighty Boosh et The New York Times. L’archive des milliers d’illustrations de cette période n’existe pas en ligne, car un jour, pris d’ennui à bord "},{"id":202409,"name":"Vulane Mthembu - /divide by zero research","subtitle":"","img":"/speakers/2024/Vulane-Mthembu-2-scaled-772x579.jpg","bio":"Vulane Mthembu est le fondateur de /divide by zero research et rédacteur invité pour le segment AI en Afrique du journal HERRI de l’Institut africain ouvert de musique, de recherche et d’innovation de l’Université de Stellenbosch. Membre du jury pour les Loeries, le AI2Amplify Global Fellowship et A"},{"id":202410,"name":"Talia Cotton","subtitle":"","img":"/speakers/2024/talia-cotton-headshot-2023-e1729687514219-772x579.jpg","bio":"Talia Cotton est designer, codeuse, entrepreneuse créative et grande spécialiste de l’intersection de l’image de marque et de la technologie. Elle est la fondatrice et la directrice créative de Cotton, une agence créative primée qui vise à créer de nouvelles possibilités en matière de design grâce à"},{"id":202411,"name":"Niklas Roy","subtitle":"","img":"/speakers/2024/PORTRAIT_HIRES-scaled-772x579.jpg","bio":"Niklas Roy est un artiste indépendant basé à Berlin, travaillant sur des projets dans le monde entier. Sa pratique artistique explore l’intersection de l’art et de la technologie, ce qui se traduit par des sculptures cinétiques, des machines mécaniques, des installations interactives, des appareils "},{"id":202412,"name":"Anna Ginsburg","subtitle":"","img":"/speakers/2024/20191115T182050a-BT-Berlin_2019-Anna_Ginsburg-NP-e1720522582456-772x579.jpg","bio":"Anna Ginsburg est une réalisatrice primée aux compétences variées : stop motion, tournage et animation 2D dessinée à la main. Connue pour ses transitions inventives, sa narration visuellement riche et son regard sans concession, Anna est capable de passer avec dextérité de l’émotion au divertissemen"},{"id":202413,"name":"Julien Vallée - Vallée-Duhamel","subtitle":"","img":"/speakers/2024/Portrait_Julien-scaled-772x579.jpg","bio":"Vallée Duhamel est un duo de réalisateurs visionnaires connu pour leur approche novatrice de la réalisation de films et de l’art vidéo. En mélangeant des techniques traditionnelles avec des technologies de pointe, ils créent des récits visuellement époustouflants et stimulants sur le plan intellectu"},{"id":202414,"name":"Liva Grinberga - Hypersolid","subtitle":"","img":"/speakers/2024/Liva_Grinberga_profile-scaled-e1727684661788-772x579.jpg","bio":"En tant que Directrice du Design, j’ai le privilège de travailler avec une équipe mondiale exceptionnelle de designers. Ensemble, nous nous concentrons sur la création de travaux de haute qualité grâce à une collaboration ouverte, en inspirant à la fois nos clients et la communauté du design dans so"},{"id":202415,"name":"Borja Martinez - Lo Siento","subtitle":"","img":"/speakers/2024/Borja-Martinez-Lo-Siento-e1724230781706-772x579.jpg","bio":"Borja Martinez est le fondateur et directeur créatif du studio de design graphique Lo Siento, situé à Barcelone depuis 2007. La philosophie de Lo Siento Studio est basée sur la créativité, l’innovation et l’expérimentation constante. Son approche multidisciplinaire lui permet d’explorer différents d"},{"id":202416,"name":"Jessica In","subtitle":"","img":"/speakers/2024/Jessica-In-001_bw-772x579.jpg","bio":"Jessica est architecte, designer, codeuse créative et enseignante. Elle enseigne à la Bartlett School of Architecture de Londres, où elle est également doctorante. Ses recherches portent sur l’utilisation de la programmation et de l’apprentissage automatique dans l’architecture, en se concentrant su"},{"id":202417,"name":"Wouter van Dijk - CLEVER​°​​FRANKE","subtitle":"","img":"/speakers/2024/wouter-VD-e1720522512100-772x579.png","bio":"Wouter van Dijk, directeur de la création chez CLEVER°FRANKE, apporte son expertise en développement de concepts et en design d’interaction aux projets numériques. Il se concentre sur la création de produits qui aident les gens à comprendre le monde qui les entoure. Son parcours l’a amené à travaill"},{"id":202418,"name":"Juliette Bibasse & Joanie Lemercier","subtitle":"","img":"/speakers/2024/I1A9386-%C2%A9-Arnaud-Bertereau-scaled-772x579.jpg","bio":"Juliette Bibasse (née en 1984) est une artiste-productrice et commissaire indépendante depuis plus de 10 ans, notamment en tant que commissaire internationale pour le festival STRP à Eindhoven, Art Souterrain à Montréal et Llum à Barcelone. Depuis 2020, elle dirige et organise (Un)Holy Light pour la"},{"id":202419,"name":"Sara De Bondt","subtitle":"","img":"/speakers/2024/IMG_2066-772x579.jpg","bio":"Sara De Bondt est une graphiste, éducatrice et chercheuse. Les projets de design actuels comprennent un nouveau site web pour The Showroom, des graphiques d’exposition pour Wellcome Collection, l’identité d’Europalia et la conception de livres pour Camden Art Centre. En 2008, elle a co-fondé la mais"},{"id":202420,"name":"Joel Gethin Lewis","subtitle":"","img":"/speakers/2024/me-772x579.jpg","bio":"Je suis consultant, conférencier et artiste. J’adore organiser des contextes et concevoir des contraintes pour des projets. J’apprécie être un catalyseur d’apprentissage pour les étudiants et les clients, les aidant à développer leurs compétences et à transmettre leurs connaissances à d’autres. J’ai"},{"id":202421,"name":"Anne Horel","subtitle":"","img":"/speakers/2024/Portrait-scaled-772x579.jpg","bio":"Anne Horel est une artiste numérique multi-récompensée basée à Paris. Son travail de collage polymorphe, connu pour ses couleurs vives et son esthétique étrange, a été présenté dans le monde entier dans divers lieux prestigieux tels que Art Basel Miami, le Palais de Tokyo et Times Square, captivant "},{"id":202422,"name":"Pinaffo & Pluvinage","subtitle":"","img":"/speakers/2024/Pinaffo-Pluvinage-portait-772x579.jpeg","bio":"Depuis ses débuts en 2015, le duo Pinaffo & Pluvinage a adopté une approche à cheval entre le design et l’art visuel, couvrant plusieurs domaines tels que les jouets, les installations, les objets et la scénographie. Peu importe l’échelle ou le contexte, leur travail tourne toujours autour de la pou"},{"id":202423,"name":"Brendan Dawes","subtitle":"","img":"/speakers/2024/20240103_BrendanDawes_1562_print-scaled-e1720522437322-772x579.jpg","bio":"Brendan Dawes est un artiste britannique qui utilise des processus génératifs impliquant les données, l’apprentissage automatique et les algorithmes pour créer des installations interactives, des objets électroniques, des expériences en ligne, des visualisations de données, des graphiques de mouveme"},{"id":202424,"name":"Zala Šeško - Unseen Studio","subtitle":"","img":"/speakers/2024/1701802807231-01-1-772x579.jpeg","bio":"Zala est une développeuse créative passionnée par la création d’art computationnel accrocheur. Née et élevée en Slovénie, elle vit actuellement à Bristol (Royaume-Uni) où elle repousse les limites des expériences web en tant que membre de l’équipe d’Unseen Studio."},{"id":202425,"name":"Ferdi Alici - Ouchhh Studio","subtitle":"","img":"/speakers/2024/OUCHHH_ARTIST_PHOTO-e1719750581734-772x579.jpg","bio":"Ouchhh Studio s’est taillé une place de choix dans les formes d’art pionnières basées sur les données. Leur méthodologie unique fusionne l’exploration technologique avec une compréhension profonde des racines énigmatiques de l’art, de la science et de la technologie, créant ainsi une vision résolume"},{"id":202426,"name":"Dr Formalyst","subtitle":"","img":"/speakers/2024/lk-smile-772x579.jpg","bio":"Dr. Formalyst est un artiste visuel basé à Madrid qui compte 25 ans d’expérience dans les domaines de l’architecture, du design et du codage. Travaillant principalement dans le domaine de la vidéo, il a développé une approche unique qui utilise l’image de synthèse pour garder un contrôle créatif tot"},{"id":202427,"name":"Marcin Ignac - Variable.io","subtitle":"","img":"/speakers/2024/marcin20ignac202022201200-2000-772x579.jpg","bio":"Marcin Ignac est un artiste informatique polonais qui travaille sur les systèmes génératifs et sur l’art fondé sur les données. Il trouve la beauté et l’inspiration dans les structures des organismes biologiques, dans les modèles émergeant des données et dans la complexité des algorithmes informatiq"},{"id":202428,"name":"Varvara & Mar","subtitle":"","img":"/speakers/2024/5_Varvara-Mar_by_Laura_Strandberg-e1727433750940-772x579.jpg","bio":"Varvara & Mar, un duo d’artistes formé par Varvara Guljajeva et Mar Canet en 2009, explorent l’impact social de l’ère numérique à travers leur travail, abordant le changement technologique et ses effets sur la société. Leur art a été présenté dans des lieux internationaux tels que MAD à New York, FA"},{"id":202429,"name":"Playmodes","subtitle":"","img":"/speakers/2024/SantiEloi_Full-scaled-772x579.jpg","bio":"Playmodes est un tandem d’artisans numériques. Santi Vilanova et Eloi Maduell, formés dans les domaines du design graphique, de la composition musicale et de l’ingénierie informatique, conçoivent des œuvres à mi-chemin entre l’art, la science et la recherche audiovisuelle. Tous leurs projets sont dé"},{"id":202430,"name":"Robyn Landau - Kinda Studios","subtitle":"","img":"/speakers/2024/Robyn-scaled-e1727684796685-772x579.jpg","bio":"Robyn Landau est chercheuse en neuroesthétique, designer et entrepreneure culturelle, reliant art et science. En tant que co-fondatrice et directrice du studio et laboratoire de neurosciences Kinda, elle ouvre une nouvelle voie pour combiner neurosciences et expériences créatives, afin d’améliorer l"},{"id":202431,"name":"Martin Nadal","subtitle":"","img":"/speakers/2024/20151017_124110-scaled-772x579.jpg","bio":"Martin Nadal est un artiste média basé à Berlin. Avec un diplôme en génie informatique et une formation supplémentaire à la Kunst Uni, Linz, Autriche, Nadal plonge son public dans de profondes explorations de la façon dont les cadres technologiques tels que la blockchain et les réseaux neuronaux faç"},{"id":202432,"name":"Dasha Ilina","subtitle":"","img":"/speakers/2024/dasha-grilled-cheese-1-scaled-772x579.jpg","bio":"Dasha Ilina est une artiste russe technocritique basée à Paris, en France. Par l’utilisation d’approches low-tech et DIY, son travail interroge la volonté d’intégrer la technologie moderne dans nos vies quotidiennes en montrant les implications d’une telle démarche. Sa pratique implique le public af"},{"id":202433,"name":"Andreas Refsgaard","subtitle":"","img":"/speakers/2024/AndreasRefsgaard_1x1_hires-772x579.jpg","bio":"Andreas Refsgaard est un artiste et un codeur créatif basé à Copenhague. Travaillant dans le domaine de l’art et du design d’interaction, il utilise les algorithmes, les données et l’apprentissage automatique pour explorer les potentiels créatifs des technologies numériques émergentes. Dans sa prati"},{"id":202434,"name":"Ida Toft - ELEKTRA","subtitle":"","img":"/speakers/2024/Ida_Profile_portrait-scaled-772x579.jpg","bio":"Ida Toft est un.e artiste et chercheureuse basé.e à Tiohtià:ke (Montréal). Ida détient un doctorat de la Faculté des beaux-arts de l’Université Concordia (Canada), une maîtrise en sciences de l’Université IT de Copenhague (Danemark) et un baccalauréat ès sciences sociales de l’Université de Roskild"},{"id":202435,"name":"Marc-André Cossette","subtitle":"","img":"/speakers/2024/MACossette_Portrait_credit_Agustina_Isidori.jpg","bio":"Marc-André Cossette [CA/QC] est un artiste canadien transdisciplinaire qui utilise le son, le design visuel et l’interaction dans la création d’installations interactives et de performances audiovisuelles. Marc-André détient un baccalauréat en médias interactifs et une maîtrise en médias expérimenta"},{"id":202436,"name":"Kurt Hentschlaeger","subtitle":"","img":"/speakers/2024/kh-portrait_ZEE-Bochum-2018_Foto-Martin-Steffen-scaled-772x579.jpg","bio":""},{"id":202437,"name":"Unesco Creative Cities panel","subtitle":"","img":"/speakers/2024/DALL%C2%B7E-2024-10-22-22.44.58-A-vibrant-futuristic-city-representing-a-UNESCO-Creative-City-of-Media-Arts.-The-skyline-features-a-mix-of-modern-skyscrapers-with-digital-screens-di-772x579.webp","bio":""},{"id":202438,"name":"PopulAR","subtitle":"","img":"/speakers/2024/Melting-cube-3D-grid-600x579.jpeg","bio":"Laszlo Arnould est à l’origine de PopulAR, un écosystème international dédié à la création de contenu significatif en réalité augmentée (AR) pour aider à populariser celle-ci."},{"id":202439,"name":"Digital Inter​/​Section","subtitle":"","img":"/speakers/2024/2022-12-06_Ab_ins_Metaverse_0276_16-18-Gerngross-Glowinski-772x579.jpeg","bio":"Une conférence donnée par CHRONIQUES, The Catalysts, Signal Festival, Le Pavillon by KIKK et Kontejner. Digital Inter/Section (DI/S) est une initiative européenne visant à explorer de nouveaux modèles économiques pour les organisations culturelles dans le secteur des arts numériques. Le projet souha"},{"id":202440,"name":"Panel : Digital Horizons: Exploring African New Media Art and Creativity","subtitle":"","img":"/speakers/2024/heashot-23-772x579.png","bio":""},{"id":202441,"name":"Peter Aigner & Alex Wright","subtitle":"","img":"/speakers/2024/REPLAY_MEMORIES3-772x579.jpg","bio":"Centre névralgique de la creative tech, la ville de New-York commémore cette année le 400ème anniversaire de sa fondation (1624-2024). Pour célébrer l’événement, Wallonie-Bruxelles International (WBI) et le KIKK festival proposent un panel spécial pour débattre de ce sujet essentiel en présence de :"},{"id":202442,"name":"Jos Auzende, Marie Papazoglou & Amélie Bouvier","subtitle":"","img":"/speakers/2024/book_cover_AB_590.jpg","bio":"Jos Auzende est une directrice artistique et commissaire d’exposition qui s’attache à faire connaître les pratiques artistiques émergentes pluridisciplinaires nées avec les médias et les réseaux. Diplômée en architecture à Paris, elle cultive les logiques de projets et les visions portées par des ré"},{"id":202443,"name":"CCI in Africa Ecosystem - modération par Brian Afande","subtitle":"","img":"/speakers/2024/Copie-de-AntoninWeber_kikk23_129A2321-772x579.jpg","bio":""},{"id":202444,"name":"Panel XR Espagne","subtitle":"","img":"/speakers/2024/Mozart_Things-Happen_INMERSIVA-XR-772x579.jpg","bio":"– INMERSIVA XR – Association Espagnole de Réalité Étendue – Javier Acosta, Directeur chez Estudio Gurugú – Guillermo Aracil, CEO – Fondateur & Directeur Créatif chez NowAR Lab – Pep Collados, Executive Creative Producer chez Seeds XR – Itziar Arriaga, Co-Fondatrice chez Things Happen – Sandra Martín"},{"id":202445,"name":"Panel wake! by Digital Wallonia","subtitle":"","img":"/speakers/2024/Belgian-Tech-Creative-Biodiversity-772x579.jpg","bio":"Une conférence avec Kathleen & Clément Jadot, Paul Vacca, Mateo Salvai, Damien Van Achter (facilitateur). Kathleen et Clément Jadot sont les fondateurs de Sirop magazine et de Boulettes magazine. Paul Vacca est consultant stratégique ICC et éditorialiste (Trends Tendances, Les Echos, Rolling Stone)."},{"id":202446,"name":"Panel Wallimage","subtitle":"","img":"/speakers/2024/Cyanview-772x579.jpg","bio":"Wallimage Entreprise finance les entreprises wallonnes du son et de l’image depuis plus de 15 ans, et ce pour tout type de besoin financier. Au-delà du financement, c’est un réel accompagnement qui est proposé par : – Odile Malevé, responsable du département Entreprises et analyste Gaming chez Walli"}]};

// ════════════════════════════════════════════════════════
// YEAR VISUAL THEMES — one color identity per edition
// ════════════════════════════════════════════════════════
const THEMES = {
  2024:{ bg:"#1a0030",surface:"#260044",accent:"#c84aff",accentH:"#aa22ee",text:"#fff",muted:"#cc66ff",tagline:"Intelligence Artificielle",bgImg:"/homepage/2024/2024_homepage.jpg",num:"2024",homepageImg:"/homepage/2024/2024_homepage.jpg" },
  2023:{ bg:"#002828",surface:"#003838",accent:"#00ffff",accentH:"#00dddd",text:"#fff",muted:"#00cccc",tagline:"Roots & Routes",bgImg:"/homepage/2023/2023_homepage.jpg",num:"2023",homepageImg:"/homepage/2023/2023_homepage.jpg" },
  2022:{ bg:"#1a0028",surface:"#280040",accent:"#ff22cc",accentH:"#ee00bb",text:"#fff",muted:"#ff66dd",tagline:"Connected Bodies",bgImg:"/homepage/2022/2022_homepage.jpg",num:"2022",homepageImg:"/homepage/2022/2022_homepage.jpg" },
  2021:{ bg:"#1e1a00",surface:"#2a2400",accent:"#ffd600",accentH:"#eec400",text:"#fff",muted:"#ffee44",tagline:"Alive & Kicking",bgImg:"/homepage/2021/2021_homepage.jpg",num:"2021",homepageImg:"/homepage/2021/2021_homepage.jpg" },
  2020:{ bg:"#0d0d1e",surface:"#181828",accent:"#aaaadd",accentH:"#9999cc",text:"#fff",muted:"#8888bb",tagline:"Virtual Edition",bgImg:"/homepage/2020/2020_homepage.jpg",num:"2020",homepageImg:"/homepage/2020/2020_homepage.jpg" },
  2019:{ bg:"#000a2a",surface:"#001040",accent:"#4499ff",accentH:"#2277ee",text:"#fff",muted:"#66aaff",tagline:"Humans & Machines",bgImg:"/homepage/2019/2019_homepage.jpg",num:"2019",homepageImg:"/homepage/2019/2019_homepage.jpg" },
  2018:{ bg:"#280010",surface:"#3a0018",accent:"#ff2277",accentH:"#ee0055",text:"#fff",muted:"#ff6699",tagline:"In Machines We Trust",bgImg:"/homepage/2018/2018_homepage.jpg",num:"2018",homepageImg:"/homepage/2018/2018_homepage.jpg" },
  2017:{ bg:"#002200",surface:"#003300",accent:"#44ee66",accentH:"#2abb44",text:"#fff",muted:"#66ff88",tagline:"New Narratives",bgImg:"/homepage/2017/2017_homepage.jpg",num:"2017",homepageImg:"/homepage/2017/2017_homepage.jpg" },
  2016:{ bg:"#2a1c00",surface:"#3a2800",accent:"#ffbb22",accentH:"#cc9a14",text:"#fff",muted:"#ffcc66",tagline:"In the Mood for Code",bgImg:"/homepage/2016/2016_homepage.jpg",num:"2016",homepageImg:"/homepage/2016/2016_homepage.jpg" },
  2015:{ bg:"#cc2244",surface:"#dd3355",accent:"#ff6688",accentH:"#ee4466",text:"#fff",muted:"#ffaabb",tagline:"Fold / Unfold",bgImg:"/homepage/2015/2015_homepage.jpg",num:"2015",homepageImg:"/homepage/2015/2015_homepage.jpg" },
  2014:{ bg:"#001a30",surface:"#002244",accent:"#00ccff",accentH:"#0099bb",text:"#fff",muted:"#44bbff",tagline:"The State of Play",bgImg:"/homepage/2014/2014_homepage.jpg",num:"2014",homepageImg:"/homepage/2014/2014_homepage.jpg" },
  2013:{ bg:"#120030",surface:"#1c0044",accent:"#cc66ff",accentH:"#9944dd",text:"#fff",muted:"#dd88ff",tagline:"Next Utopia",bgImg:"/homepage/2013/2013_homepage.jpg",num:"2013",homepageImg:"/homepage/2013/2013_homepage.jpg" },
  2012:{ bg:"#2a1000",surface:"#3a1800",accent:"#ff7744",accentH:"#ee5522",text:"#fff",muted:"#ffaa77",tagline:"Making Digital Tangible",bgImg:"/homepage/2012/2012_homepage.jpg",num:"2012",homepageImg:"/homepage/2012/2012_homepage.jpg" },
  2011:{ bg:"#111111",surface:"#1e1e1e",accent:"#dddddd",accentH:"#ffffff",text:"#fff",muted:"#aaaaaa",tagline:"Digital & Society",bgImg:"/homepage/2011/2011_homepage.jpg",num:"2011",homepageImg:"/homepage/2011/2011_homepage.jpg" },
};

const ALL_YEARS = [2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011];

// ════════════════════════════════════════════════════════
// STRAPI SERVICE — plug in your Strapi URL + token
// ════════════════════════════════════════════════════════
const STRAPI_URL = "http://localhost:1337";
const STRAPI_TOKEN = "";
const USE_STRAPI = false;

async function fetchStrapi(path) {
  const res = await fetch(`${STRAPI_URL}/api/${path}`, {
    headers: { ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }) }
  });
  if (!res.ok) throw new Error(`Strapi ${res.status}`);
  return res.json();
}

async function getSpeakersForYear(year) {
  if (!USE_STRAPI) {
    const speakers = (SPEAKERS_DB[year] || []);
    return speakers;
  }
  const d = await fetchStrapi(`speakers?filters[year][$eq]=${year}&populate=photo&sort=name:asc&pagination[pageSize]=100`);
  return d.data.map(s => ({
    id: s.id, name: s.attributes.name, subtitle: s.attributes.subtitle,
    bio: s.attributes.bio, img: s.attributes.photo?.data?.attributes?.url
      ? STRAPI_URL + s.attributes.photo.data.attributes.url : null,
  }));
}

async function searchAllSpeakers(query) {
  if (!USE_STRAPI) {
    const q = query.toLowerCase();
    const results = [];
    ALL_YEARS.forEach(yr => {
      (SPEAKERS_DB[yr] || []).forEach(s => {
        if (s.name.toLowerCase().includes(q) || (s.subtitle||"").toLowerCase().includes(q))
          results.push({ ...s, year: yr });
      });
    });
    return results.slice(0, 50);
  }
  const d = await fetchStrapi(`speakers?filters[name][$containsi]=${encodeURIComponent(query)}&populate=photo,year&pagination[pageSize]=50`);
  return d.data.map(s => ({
    id: s.id, name: s.attributes.name, subtitle: s.attributes.subtitle,
    img: s.attributes.photo?.data?.attributes?.url ? STRAPI_URL + s.attributes.photo.data.attributes.url : null,
    year: s.attributes.year?.data?.attributes?.year,
  }));
}

// ════════════════════════════════════════════════════════
// GLOBAL STYLES (injected)
// ════════════════════════════════════════════════════════
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', system-ui, sans-serif; overflow: hidden; }
  
  @keyframes bounceIn {
    0%   { transform: scale(0.3) translateY(-80px); opacity: 0; }
    50%  { transform: scale(1.08) translateY(8px); opacity: 1; }
    70%  { transform: scale(0.96) translateY(-4px); }
    85%  { transform: scale(1.03) translateY(2px); }
    100% { transform: scale(1) translateY(0); }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-30px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.6; }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  
  .year-num {
    animation: bounceIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
  .fade-up {
    opacity: 0;
    animation: fadeInUp 0.5s ease forwards;
  }
  .slide-in {
    animation: slideIn 0.4s ease forwards;
  }
  
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 3px; }
  
  .speaker-card:hover { transform: translateY(-4px) scale(1.02); }
  .speaker-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
  
  .skeleton {
    background: linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.05) 75%);
    background-size: 400px 100%;
    animation: shimmer 1.4s infinite;
  }
`;

// ════════════════════════════════════════════════════════
// HELPER: Speaker photo with fallback
// ════════════════════════════════════════════════════════
function SpeakerPhoto({ img, name, size = 80, accent = "#888", square = false }) {
  const [err, setErr] = useState(false);
  const isFullWidth = size === "100%";
  const radius = square || isFullWidth ? 0 : (typeof size === "number" && size > 100 ? 12 : "50%");
  if (!img || err) {
    const initials = name.split(" ").map(w => w[0]).filter(Boolean).slice(0,2).join("").toUpperCase();
    return (
      <div style={{
        width: size, height: isFullWidth ? "100%" : size,
        borderRadius: radius,
        background: `linear-gradient(135deg, ${accent}44, ${accent}22)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: isFullWidth ? 48 : size * 0.32, fontWeight: 700, color: accent,
        flexShrink: 0, border: `1px solid ${accent}33`,
      }}>
        {initials || <User size={isFullWidth ? 48 : size * 0.4} />}
      </div>
    );
  }
  return (
    <img
      src={img} alt={name} onError={() => setErr(true)}
      style={{
        width: size, height: isFullWidth ? "100%" : size,
        objectFit: "cover", borderRadius: radius,
        flexShrink: 0, display: "block",
      }}
    />
  );
}

// ════════════════════════════════════════════════════════
// YEAR CARD — Full-screen visual identity per year
// ════════════════════════════════════════════════════════
function YearCard({ year, theme, isActive, onClick }) {
  const speakerCount = (SPEAKERS_DB[year] || []).length;
  const keyframe = isActive ? "active" : "idle";

  // Decorative pattern SVG overlay
  const patternId = `p${year}`;

  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute", inset: 0,
        background: theme.bg,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        cursor: "pointer", userSelect: "none",
        overflow: "hidden",
      }}
    >
      {/* Background hero image — full visibility */}
      {theme.bgImg && (
        <img
          src={theme.bgImg}
          alt=""
          aria-hidden="true"
          style={{
            position:"absolute", inset:0,
            width:"100%", height:"100%",
            objectFit:"cover", objectPosition:"center",
            opacity:1,
            filter:"saturate(0.85) brightness(0.75)",
          }}
          onError={e => { e.target.style.display = 'none'; }}
        />
      )}
      {/* Dark colour tint — just enough to let text read */}
      <div style={{
        position:"absolute", inset:0,
        background:`linear-gradient(180deg, ${theme.bg}99 0%, ${theme.bg}77 50%, ${theme.bg}bb 100%)`,
        pointerEvents:"none",
      }} />

      {/* Radial accent glow — centre highlight */}
      <div style={{
        position:"absolute", width:"65vw", height:"65vw",
        borderRadius:"50%", top:"50%", left:"50%",
        transform:"translate(-50%,-50%)",
        background:`radial-gradient(circle, ${theme.accent}55 0%, ${theme.accent}11 60%, transparent 80%)`,
        mixBlendMode:"screen",
        pointerEvents:"none",
      }} />

      {/* KIKK logo mark */}
      <div style={{
        position:"absolute", top:32, left:40,
        fontSize:13, fontWeight:700, letterSpacing:4,
        color: theme.accent, opacity:0.7, textTransform:"uppercase",
      }}>
        KIKK FESTIVAL
      </div>

      {/* Year — main element with bounce */}
      <div key={`${year}-${isActive}`} className={isActive ? "year-num" : ""}
        style={{
          fontSize: "clamp(120px, 22vw, 260px)",
          fontWeight: 900, lineHeight: 0.85,
          color: theme.text,
          letterSpacing: "-0.04em",
          textShadow: `0 0 80px ${theme.accent}44, 0 4px 20px rgba(0,0,0,0.4)`,
          zIndex: 1,
        }}>
        {year}
      </div>

      {/* Tagline */}
      <div className="fade-up" style={{
        animationDelay:"0.3s",
        marginTop:24, fontSize:16, fontWeight:400,
        color: theme.accent, letterSpacing:2, textTransform:"uppercase",
        zIndex:1,
      }}>
        {theme.tagline}
      </div>

      {/* Speaker count badge */}
      <div className="fade-up" style={{
        animationDelay:"0.5s",
        marginTop:20,
        padding:"8px 20px", borderRadius:999,
        border:`1px solid ${theme.accent}44`,
        background:`${theme.accent}14`,
        color:theme.muted, fontSize:13, fontWeight:500,
        letterSpacing:1, zIndex:1,
      }}>
        {speakerCount} speakers
      </div>

      {/* Bottom accent line */}
      <div style={{
        position:"absolute", bottom:0, left:0, right:0,
        height:3, background:`linear-gradient(90deg, transparent, ${theme.accent}, transparent)`,
      }} />
    </div>
  );
}

// ════════════════════════════════════════════════════════
// SPEAKER CARD — in year listing grid
// ════════════════════════════════════════════════════════
function SpeakerCard({ speaker, theme, onClick, delay = 0 }) {
  return (
    <div
      className="speaker-card fade-up"
      onClick={onClick}
      style={{
        animationDelay: `${delay}ms`,
        background: theme.surface,
        border: `1px solid ${theme.accent}22`,
        borderRadius: 12, padding: "16px",
        cursor: "pointer", display: "flex", gap: 14, alignItems: "flex-start",
        boxShadow: `0 2px 8px rgba(0,0,0,0.3)`,
      }}
    >
      <SpeakerPhoto img={speaker.img} name={speaker.name} size={60} accent={theme.accent} />
      <div style={{ overflow: "hidden", flex: 1 }}>
        <div style={{
          fontSize: 15, fontWeight: 600, color: theme.text,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {speaker.name}
        </div>
        {speaker.subtitle && (
          <div style={{
            fontSize: 12, color: theme.muted, marginTop: 3,
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {speaker.subtitle}
          </div>
        )}
      </div>
      <ChevronRight size={16} style={{ color: theme.muted, flexShrink: 0, marginTop: 4 }} />
    </div>
  );
}

// ════════════════════════════════════════════════════════
// SEARCH MODAL
// ════════════════════════════════════════════════════════
function SearchModal({ onClose, onSelectSpeaker, onSelectYear }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const r = await searchAllSpeakers(query.trim());
        setResults(r);
      } finally { setLoading(false); }
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,0.85)",
      backdropFilter:"blur(12px)", zIndex:1000,
      display:"flex", flexDirection:"column", alignItems:"center",
      padding:"60px 20px 20px",
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        width:"100%", maxWidth:640,
        background:"#111", borderRadius:16,
        border:"1px solid rgba(255,255,255,0.12)",
        overflow:"hidden",
        boxShadow:"0 24px 80px rgba(0,0,0,0.6)",
      }}>
        {/* Input */}
        <div style={{ display:"flex", alignItems:"center", padding:"0 20px", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
          <Search size={20} style={{ color:"#666", flexShrink:0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Rechercher un speaker..."
            style={{
              flex:1, background:"transparent", border:"none", outline:"none",
              padding:"18px 14px", fontSize:17, color:"#fff",
              fontFamily:"inherit",
            }}
          />
          {query && (
            <button onClick={() => setQuery("")} style={{ background:"none", border:"none", color:"#666", cursor:"pointer" }}>
              <X size={18} />
            </button>
          )}
          <button onClick={onClose} style={{
            background:"rgba(255,255,255,0.08)", border:"none", color:"#aaa",
            borderRadius:6, padding:"4px 10px", cursor:"pointer", fontSize:12, marginLeft:8,
          }}>esc</button>
        </div>

        {/* Results */}
        <div style={{ maxHeight:460, overflowY:"auto" }}>
          {loading && (
            <div style={{ padding:24, textAlign:"center", color:"#555", fontSize:14 }}>Recherche…</div>
          )}
          {!loading && query && results.length === 0 && (
            <div style={{ padding:32, textAlign:"center", color:"#555" }}>Aucun résultat pour « {query} »</div>
          )}
          {!loading && results.map((s, i) => {
            const t = THEMES[s.year] || THEMES[2024];
            return (
              <div key={s.id} onClick={() => onSelectSpeaker(s, s.year)}
                style={{
                  display:"flex", alignItems:"center", gap:14,
                  padding:"12px 20px", cursor:"pointer",
                  borderBottom:"1px solid rgba(255,255,255,0.05)",
                  transition:"background 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.06)"}
                onMouseLeave={e => e.currentTarget.style.background="transparent"}
              >
                <SpeakerPhoto img={s.img} name={s.name} size={44} accent={t.accent} />
                <div style={{ flex:1, overflow:"hidden" }}>
                  <div style={{ fontWeight:600, color:"#fff", fontSize:14 }}>{s.name}</div>
                  <div style={{ color:"#666", fontSize:12, marginTop:2 }}>{s.subtitle}</div>
                </div>
                <div style={{
                  fontSize:11, fontWeight:700, color:t.accent,
                  background:`${t.accent}18`, borderRadius:6, padding:"3px 8px",
                  letterSpacing:1,
                }}>
                  {s.year}
                </div>
              </div>
            );
          })}
          {!query && (
            <div style={{ padding:32, textAlign:"center" }}>
              <div style={{ color:"#444", fontSize:14, marginBottom:16 }}>Parcourir par année</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center" }}>
                {ALL_YEARS.map(yr => {
                  const t = THEMES[yr];
                  return (
                    <button key={yr} onClick={() => { onSelectYear(yr); onClose(); }}
                      style={{
                        background:`${t.accent}18`, border:`1px solid ${t.accent}33`,
                        color:t.accent, borderRadius:8, padding:"6px 14px",
                        cursor:"pointer", fontSize:13, fontWeight:600,
                        fontFamily:"inherit",
                      }}>
                      {yr}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════
// SPEAKER DETAIL PAGE
// ════════════════════════════════════════════════════════
function SpeakerDetail({ speaker, year, theme, onBack }) {
  return (
    <div style={{
      position:"absolute", inset:0, background:theme.bg,
      overflowY:"auto", zIndex:10,
    }}>
      {/* Nav buttons */}
      <div style={{
        position:"fixed", top:20, left:20, display:"flex", gap:10, zIndex:11,
      }}>
        <button onClick={() => navigate("/")} style={{
          display:"flex", alignItems:"center", gap:8,
          background:"rgba(0,0,0,0.5)", backdropFilter:"blur(8px)",
          border:`1px solid ${theme.accent}44`, borderRadius:999,
          color:theme.text, padding:"10px 18px", cursor:"pointer",
          fontSize:14, fontWeight:500, fontFamily:"inherit",
          transition:"background 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.background=`${theme.accent}22`}
          onMouseLeave={e => e.currentTarget.style.background="rgba(0,0,0,0.5)"}
        >
          <ArrowLeft size={16} /> Accueil
        </button>
        <button onClick={onBack} style={{
          display:"flex", alignItems:"center", gap:8,
          background:"rgba(0,0,0,0.5)", backdropFilter:"blur(8px)",
          border:`1px solid ${theme.accent}44`, borderRadius:999,
          color:theme.text, padding:"10px 18px", cursor:"pointer",
          fontSize:14, fontWeight:500, fontFamily:"inherit",
          transition:"background 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.background=`${theme.accent}22`}
          onMouseLeave={e => e.currentTarget.style.background="rgba(0,0,0,0.5)"}
        >
          KIKK {year}
        </button>
      </div>

      {/* Hero */}
      <div style={{
        background:`linear-gradient(180deg, ${theme.surface} 0%, ${theme.bg} 100%)`,
        padding:"100px 40px 60px",
        display:"flex", alignItems:"flex-end", gap:40,
        borderBottom:`1px solid ${theme.accent}22`,
        maxWidth:900, margin:"0 auto",
      }}>
        <SpeakerPhoto img={speaker.img} name={speaker.name} size={160} accent={theme.accent} />
        <div style={{ flex:1 }}>
          <div style={{
            fontSize:11, fontWeight:700, letterSpacing:3,
            color:theme.accent, textTransform:"uppercase", marginBottom:12,
          }}>
            KIKK Festival {year}
          </div>
          <h1 style={{
            fontSize:"clamp(28px, 4vw, 52px)", fontWeight:900,
            color:theme.text, lineHeight:1.05, marginBottom:12,
          }}>
            {speaker.name}
          </h1>
          {speaker.subtitle && (
            <div style={{ fontSize:17, color:theme.muted, fontWeight:400 }}>
              {speaker.subtitle}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth:900, margin:"0 auto", padding:"48px 40px 80px" }}>
        {speaker.bio ? (
          <div style={{
            fontSize:17, lineHeight:1.75, color:theme.text,
            opacity:0.85, whiteSpace:"pre-wrap",
          }}>
            {speaker.bio}
          </div>
        ) : (
          <div style={{ color:theme.muted, fontStyle:"italic" }}>
            Biographie non disponible.
          </div>
        )}

        {speaker.url && (
          <a href={speaker.url} target="_blank" rel="noopener noreferrer"
            style={{
              display:"inline-flex", alignItems:"center", gap:8, marginTop:40,
              color:theme.accent, fontSize:14, textDecoration:"none",
              border:`1px solid ${theme.accent}44`, borderRadius:8,
              padding:"10px 18px",
            }}>
            <ExternalLink size={14} /> Voir sur kikk.be
          </a>
        )}
      </div>
      <KikkFooter theme={theme} />
    </div>
  );
}

// ════════════════════════════════════════════════════════
// YEAR LISTING PAGE
// ════════════════════════════════════════════════════════
function YearListing({ year, theme, onBack, onSpeakerClick }) {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQ, setSearchQ] = useState("");

  useEffect(() => {
    setLoading(true);
    getSpeakersForYear(year).then(s => { setSpeakers(s); setLoading(false); });
  }, [year]);

  const filtered = useMemo(() => {
    if (!searchQ.trim()) return speakers;
    const q = searchQ.toLowerCase();
    return speakers.filter(s => s.name.toLowerCase().includes(q) || (s.subtitle||"").toLowerCase().includes(q));
  }, [speakers, searchQ]);

  return (
    <div style={{
      position:"absolute", inset:0, background:theme.bg,
      display:"flex", flexDirection:"column", overflow:"hidden",
    }}>
      {/* Background homepage image */}
      {theme.bgImg && (
        <div style={{
          position:"absolute", inset:0, zIndex:0,
          backgroundImage:`url(${theme.bgImg})`,
          backgroundSize:"cover", backgroundPosition:"center",
          opacity:0.12, pointerEvents:"none",
        }} />
      )}
      {/* Header */}
      <div style={{
        background:theme.surface, borderBottom:`1px solid ${theme.accent}22`,
        padding:"20px 28px", flexShrink:0,
        display:"flex", alignItems:"center", gap:20,
        position:"relative", zIndex:1,
      }}>
        <button onClick={onBack} style={{
          display:"flex", alignItems:"center", gap:6,
          background:"none", border:`1px solid ${theme.accent}33`,
          borderRadius:8, color:theme.text, padding:"8px 14px",
          cursor:"pointer", fontSize:13, fontWeight:500, fontFamily:"inherit",
        }}>
          <ArrowLeft size={15} /> Accueil
        </button>

        <div style={{ flex:1 }}>
          <div style={{ fontSize:22, fontWeight:800, color:theme.text }}>{year}</div>
          <div style={{ fontSize:12, color:theme.accent, letterSpacing:1 }}>{theme.tagline}</div>
        </div>

        {/* Inline search */}
        <div style={{
          display:"flex", alignItems:"center", gap:8,
          background:"rgba(0,0,0,0.3)", border:`1px solid ${theme.accent}22`,
          borderRadius:8, padding:"8px 14px", flex:"0 0 240px",
        }}>
          <Search size={15} style={{ color:theme.muted }} />
          <input
            value={searchQ} onChange={e => setSearchQ(e.target.value)}
            placeholder="Filtrer..."
            style={{
              background:"none", border:"none", outline:"none",
              color:theme.text, fontSize:14, fontFamily:"inherit", flex:1,
            }}
          />
        </div>

        <div style={{ fontSize:13, color:theme.muted }}>
          {loading ? "…" : `${filtered.length} speakers`}
        </div>
      </div>

      {/* Grid */}
      <div style={{ flex:1, overflowY:"auto", padding:"24px 28px", position:"relative", zIndex:1 }}>
        {loading ? (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))", gap:16 }}>
            {Array(12).fill(0).map((_, i) => (
              <div key={i} className="skeleton" style={{ paddingTop:"130%", borderRadius:16 }} />
            ))}
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))", gap:16, paddingBottom:64 }}>
            {filtered.map((s, i) => (
              <SpeakerCard key={s.id} speaker={s} theme={theme}
                delay={Math.min(i * 30, 300)}
                onClick={() => onSpeakerClick(s)} />
            ))}
          </div>
        )}
      </div>
      <div style={{ position:"relative", zIndex:1 }}>
        <KikkFooter theme={theme} />
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════
// NAVIGATION BAR (overlaid on landing)
// ════════════════════════════════════════════════════════
function NavBar({ currentYear, onYearSelect, onSearchOpen, theme }) {
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const handler = e => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div style={{
      position:"fixed", top:0, left:0, right:0, zIndex:100,
      display:"flex", alignItems:"center", justifyContent:"space-between",
      padding:"16px 28px",
      background:`linear-gradient(180deg, ${theme.bg}cc 0%, transparent 100%)`,
    }}>
      {/* KIKK wordmark */}
      <div style={{
        fontSize:18, fontWeight:900, letterSpacing:4,
        color:theme.accent, textTransform:"uppercase",
      }}>
        KIKK DB
      </div>

      {/* Year dropdown */}
      <div ref={dropRef} style={{ position:"relative" }}>
        <button
          onClick={() => setDropOpen(v => !v)}
          style={{
            display:"flex", alignItems:"center", gap:8,
            background:"rgba(0,0,0,0.5)", backdropFilter:"blur(8px)",
            border:`1px solid ${theme.accent}44`, borderRadius:999,
            color:theme.text, padding:"8px 16px",
            cursor:"pointer", fontSize:15, fontWeight:700, fontFamily:"inherit",
          }}>
          {currentYear}
          <ChevronDown size={15} style={{ transform: dropOpen ? "rotate(180deg)" : "none", transition:"0.2s" }} />
        </button>
        {dropOpen && (
          <div style={{
            position:"absolute", top:"calc(100% + 8px)", left:"50%",
            transform:"translateX(-50%)",
            background:"#111", border:"1px solid rgba(255,255,255,0.12)",
            borderRadius:12, padding:8, zIndex:200,
            boxShadow:"0 16px 48px rgba(0,0,0,0.6)",
            display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:4, minWidth:220,
          }}>
            {ALL_YEARS.map(yr => {
              const t = THEMES[yr];
              return (
                <button key={yr}
                  onClick={() => { onYearSelect(yr); setDropOpen(false); }}
                  style={{
                    background: yr === currentYear ? `${t.accent}33` : "transparent",
                    border:`1px solid ${yr === currentYear ? t.accent : "transparent"}`,
                    borderRadius:8, color: yr === currentYear ? t.accent : "#aaa",
                    padding:"6px", cursor:"pointer", fontSize:13, fontWeight:600,
                    fontFamily:"inherit", textAlign:"center",
                    transition:"all 0.15s",
                  }}
                  onMouseEnter={e => { if(yr !== currentYear) e.currentTarget.style.background="rgba(255,255,255,0.06)"; }}
                  onMouseLeave={e => { if(yr !== currentYear) e.currentTarget.style.background="transparent"; }}
                >
                  {yr}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Search */}
      <button onClick={onSearchOpen} style={{
        display:"flex", alignItems:"center", gap:8,
        background:"rgba(0,0,0,0.5)", backdropFilter:"blur(8px)",
        border:`1px solid ${theme.accent}44`, borderRadius:999,
        color:theme.text, padding:"8px 18px",
        cursor:"pointer", fontSize:14, fontFamily:"inherit",
      }}>
        <Search size={15} style={{ color:theme.accent }} />
        Rechercher
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════════════
// MINIMAL HISTORY-API ROUTER (no external deps)
// ════════════════════════════════════════════════════════
function useRouter() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  return path;
}

function navigate(to) {
  window.history.pushState(null, "", to);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function matchPath(path) {
  const speaker = path.match(/^\/year\/(\d+)\/speaker\/([^/]+)\/?$/);
  if (speaker) return { view: "speaker", year: parseInt(speaker[1], 10), slug: speaker[2] };
  const year = path.match(/^\/year\/(\d+)\/?$/);
  if (year) return { view: "year", year: parseInt(year[1], 10) };
  return { view: "landing" };
}

// ════════════════════════════════════════════════════════
// KIKK FOOTER
// ════════════════════════════════════════════════════════
function KikkFooter({ theme, fixed = false }) {
  return (
    <div style={{
      position: fixed ? "fixed" : "relative",
      bottom: 0, left: 0, right: 0,
      padding: "10px 24px",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: fixed
        ? `linear-gradient(0deg, ${theme.bg}ee 0%, transparent 100%)`
        : `linear-gradient(0deg, ${theme.bg} 0%, transparent 100%)`,
      zIndex: fixed ? 50 : 1,
      pointerEvents: "none",
    }}>
      <a
        href="https://galaxy.kikk.be/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          pointerEvents: "all",
          display: "inline-flex", alignItems: "center", gap: 6,
          color: theme.muted, fontSize: 12, textDecoration: "none",
          letterSpacing: 1, textTransform: "uppercase",
          opacity: 0.7, transition: "opacity 0.2s",
          fontWeight: 500,
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = "1"}
        onMouseLeave={e => e.currentTarget.style.opacity = "0.7"}
      >
        <ExternalLink size={11} />
        KIKK Galaxy
      </a>
    </div>
  );
}

// ════════════════════════════════════════════════════════
// SLUG UTILITIES
// ════════════════════════════════════════════════════════
const toSlug = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const findSpeakerBySlug = (year, slug) => {
  const speakers = SPEAKERS_DB[String(year)] || [];
  return speakers.find((s) => toSlug(s.name) === slug) || null;
};

// ════════════════════════════════════════════════════════
// MAIN APP — router shell
// ════════════════════════════════════════════════════════
export default function App() {
  const path = useRouter();
  const route = matchPath(path);

  if (route.view === "speaker") return <SpeakerPage year={route.year} slug={route.slug} />;
  if (route.view === "year")    return <YearPage year={route.year} />;
  return <LandingPage />;
}

// ════════════════════════════════════════════════════════
// LANDING PAGE — year carousel
// ════════════════════════════════════════════════════════
function LandingPage() {
  const [yearIdx, setYearIdx] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [animDir, setAnimDir] = useState(1);
  const [key, setKey] = useState(0);

  const currentYear = ALL_YEARS[yearIdx];
  const theme = THEMES[currentYear];

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") navigateYear(-1);
      if (e.key === "ArrowRight") navigateYear(1);
      if (e.key === "/") { e.preventDefault(); setSearchOpen(true); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [yearIdx]);

  const navigateYear = useCallback((dir) => {
    setAnimDir(dir);
    setYearIdx((i) => {
      const n = i + dir;
      if (n < 0 || n >= ALL_YEARS.length) return i;
      setKey((k) => k + 1);
      return n;
    });
  }, []);

  const goToYear = (yr) => {
    const idx = ALL_YEARS.indexOf(yr);
    if (idx >= 0) {
      setAnimDir(idx > yearIdx ? 1 : -1);
      setYearIdx(idx);
      setKey((k) => k + 1);
    }
  };

  return (
    <>
      <style>{CSS}</style>
      <div style={{
        width: "100vw", height: "100vh", position: "relative",
        overflow: "hidden", fontFamily: "inherit",
        background: theme.bg,
        transition: "background 0.4s ease",
      }}>
        {/* Year card (full screen) */}
        <div key={key} style={{
          position: "absolute", inset: 0,
          animation: "fadeInUp 0.35s ease forwards",
        }}>
          <YearCard
            year={currentYear}
            theme={theme}
            isActive={true}
            onClick={() => navigate(`/year/${currentYear}`)}
          />
        </div>

        {/* Left arrow */}
        <button
          onClick={() => navigateYear(1)}
          disabled={yearIdx >= ALL_YEARS.length - 1}
          style={{
            position: "fixed", left: 20, top: "50%", transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
            border: `1px solid ${theme.accent}44`, borderRadius: "50%",
            width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center",
            cursor: yearIdx >= ALL_YEARS.length - 1 ? "not-allowed" : "pointer",
            opacity: yearIdx >= ALL_YEARS.length - 1 ? 0.3 : 0.9,
            transition: "all 0.2s", zIndex: 50, color: theme.text,
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = `${theme.accent}33`}
          onMouseLeave={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.5)"}
        >
          <ChevronLeft size={22} />
        </button>

        {/* Right arrow */}
        <button
          onClick={() => navigateYear(-1)}
          disabled={yearIdx <= 0}
          style={{
            position: "fixed", right: 20, top: "50%", transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
            border: `1px solid ${theme.accent}44`, borderRadius: "50%",
            width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center",
            cursor: yearIdx <= 0 ? "not-allowed" : "pointer",
            opacity: yearIdx <= 0 ? 0.3 : 0.9,
            transition: "all 0.2s", zIndex: 50, color: theme.text,
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = `${theme.accent}33`}
          onMouseLeave={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.5)"}
        >
          <ChevronRight size={22} />
        </button>

        {/* Year dots indicator */}
        <div style={{
          position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)",
          display: "flex", gap: 8, zIndex: 50,
        }}>
          {ALL_YEARS.map((yr, i) => (
            <button key={yr}
              onClick={() => goToYear(yr)}
              style={{
                width: i === yearIdx ? 24 : 8,
                height: 8, borderRadius: 4,
                background: i === yearIdx ? theme.accent : `${theme.accent}44`,
                border: "none", cursor: "pointer", padding: 0,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Hint text */}
        <div style={{
          position: "fixed", bottom: 72, left: "50%", transform: "translateX(-50%)",
          fontSize: 12, color: theme.muted, letterSpacing: 1, zIndex: 50,
          textTransform: "uppercase",
        }}>
          Cliquez pour explorer · ← → pour naviguer
        </div>

        {/* Navbar */}
        <NavBar
          currentYear={currentYear}
          onYearSelect={(yr) => { navigate(`/year/${yr}`); }}
          onSearchOpen={() => setSearchOpen(true)}
          theme={theme}
        />

        {/* Search modal */}
        {searchOpen && (
          <SearchModal
            onClose={() => setSearchOpen(false)}
            onSelectSpeaker={(s, yr) => {
              setSearchOpen(false);
              navigate(`/year/${yr}/speaker/${toSlug(s.name)}`);
            }}
            onSelectYear={(yr) => {
              setSearchOpen(false);
              navigate(`/year/${yr}`);
            }}
          />
        )}

        {/* Footer */}
        <KikkFooter theme={theme} fixed />
      </div>
    </>
  );
}

// ════════════════════════════════════════════════════════
// YEAR PAGE
// ════════════════════════════════════════════════════════
function YearPage({ year }) {
  const theme = THEMES[year] || THEMES[ALL_YEARS[0]];

  return (
    <>
      <style>{CSS}</style>
      <div style={{
        width: "100vw", height: "100vh", position: "relative",
        overflow: "hidden", background: theme.bg,
      }}>
        <YearListing
          year={year}
          theme={theme}
          onBack={() => navigate("/")}
          onSpeakerClick={(s) => navigate(`/year/${year}/speaker/${toSlug(s.name)}`)}
        />
      </div>
    </>
  );
}

// ════════════════════════════════════════════════════════
// SPEAKER PAGE
// ════════════════════════════════════════════════════════
function SpeakerPage({ year, slug }) {
  const theme = THEMES[year] || THEMES[ALL_YEARS[0]];
  const speaker = findSpeakerBySlug(year, slug);

  if (!speaker) {
    return (
      <>
        <style>{CSS}</style>
        <div style={{
          width: "100vw", height: "100vh", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          background: theme.bg, color: theme.text, gap: 20,
        }}>
          <div style={{ fontSize: 18 }}>Speaker introuvable.</div>
          <button onClick={() => navigate(`/year/${year}`)} style={{
            background: "none", border: `1px solid ${theme.accent}`,
            borderRadius: 8, color: theme.accent, padding: "10px 20px",
            cursor: "pointer", fontSize: 14, fontFamily: "inherit",
          }}>
            ← Retour {year}
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{CSS}</style>
      <div style={{
        width: "100vw", height: "100vh", position: "relative",
        overflow: "hidden", background: theme.bg,
      }}>
        <SpeakerDetail
          speaker={speaker}
          year={year}
          theme={theme}
          onBack={() => navigate(`/year/${year}`)}
        />
      </div>
    </>
  );
}
