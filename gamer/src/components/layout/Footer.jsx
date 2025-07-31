import { motion } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin,
  FaHeart,
  FaReact,
  FaGamepad
} from 'react-icons/fa';
import { 
  MdEmail,
  MdGames 
} from 'react-icons/md';
import { 
  SiVite, 
  SiTailwindcss,
  SiFramer,
  SiAxios
} from 'react-icons/si';
import { IoGameController } from 'react-icons/io5';
import Container from './Container';

const Footer = () => {
  const technologies = [
    { name: 'React', icon: FaReact, color: 'text-blue-400' },
    { name: 'Vite', icon: SiVite, color: 'text-purple-400' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-cyan-400' },
    { name: 'Framer Motion', icon: SiFramer, color: 'text-pink-400' },
    { name: 'Axios', icon: SiAxios, color: 'text-blue-300' }
  ];

  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: FaGithub, 
      href: 'https://github.com/Mimir-23',
      color: 'hover:text-gray-400'
    },
    { 
      name: 'LinkedIn', 
      icon: FaLinkedin, 
      href: 'https://www.linkedin.com/in/deivi-mesa-3ba573186/',
      color: 'hover:text-blue-400'
    },
    { 
      name: 'Email', 
      icon: MdEmail, 
      href: 'mailto:deivi1817@gmail.com',
      color: 'hover:text-red-400'
    }
  ];

  return (
    <motion.footer
      className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 border-t-2 border-primary/30 mt-auto overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Animated Gaming Line */}
      <motion.div
        className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      <Container>
        <div className="py-16 relative z-10">
          
          {/* Technologies Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-bold font-outfit text-white mb-2 flex items-center justify-center">
              <FaGamepad className="h-6 w-6 text-primary mr-3" />
              Tecnologías Utilizadas
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Construido con las mejores tecnologías modernas para una experiencia gaming excepcional
            </p>
            
            <div className="flex flex-wrap justify-center gap-8">
              {technologies.map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    <div className={`p-4 rounded-xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm group-hover:border-primary/50 transition-all duration-300 mb-3`}>
                      <Icon className={`h-8 w-8 ${tech.color} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                      {tech.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <div className="flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0">
            
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left max-w-md"
            >
              <h3 className="text-3xl font-bold font-outfit text-white mb-3 flex items-center justify-center lg:justify-start">
                <IoGameController className="h-8 w-8 text-primary mr-3" />
                Upnext
              </h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Descubre qué sigue en tu lista gaming. Mantente al día con los lanzamientos más populares y encuentra tu próxima aventura.
              </p>
              <div className="flex items-center justify-center lg:justify-start text-sm text-gray-500">
                <MdGames className="h-4 w-4 mr-2" />
                <span>Powered by RAWG.io API</span>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col items-center"
            >
              <h4 className="text-lg font-semibold text-white mb-6">Conecta Conmigo</h4>
              <div className="flex space-x-6">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target={social.name !== 'Email' ? '_blank' : undefined}
                      rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                      className={`p-4 rounded-xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm text-gray-300 ${social.color} hover:border-primary/50 hover:bg-gray-700/50 transition-all duration-300 group`}
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    >
                      <Icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                      <span className="sr-only">{social.name}</span>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Divider with Gaming Elements */}
          <div className="border-t border-gray-700/50 mt-12 pt-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 space-y-4 md:space-y-0"
            >
              <div className="flex items-center">
                <span>Desarrollado por </span>

            
                <a 
                  href="https://deivimesa.art/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-white transition-colors duration-300 font-medium mx-2 underline underline-offset-2"
                >
                  Deivi Mesa
                </a>
                <span>para la comunidad gaming</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <span>© 2025 Upnext.</span>
                <div className="flex items-center text-xs text-gray-500">
                  <span>API by</span>
                  <a 
                    href="https://rawg.io" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-white transition-colors duration-300 ml-1"
                  >
                    RAWG.io
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </motion.footer>
  );
};

export default Footer;
