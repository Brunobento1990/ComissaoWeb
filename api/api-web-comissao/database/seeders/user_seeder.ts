import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class extends BaseSeeder {
  async run() {
    // Verifica se já existe usuário admin
    const adminExists = await User.query().where('email', 'admin@webcomissao.com').first()

    if (!adminExists) {
      await User.create({
        nome: 'Administrador',
        email: 'admin@webcomissao.com',
        senha: await hash.make('admin123'),
        ativo: true,
      })

      console.log('✅ Usuário admin criado com sucesso!')
      console.log('   Email: admin@webcomissao.com')
      console.log('   Senha: admin123')
    } else {
      console.log('ℹ️  Usuário admin já existe')
    }
  }
}
