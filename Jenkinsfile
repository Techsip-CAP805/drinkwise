pipeline {
    agent any

    environment {
        NODE_VERSION = 'nodejs-lts' //nodeJS install
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'backend', url: 'https://github.com/Techsip-CAP805/drinkwise'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    def nodeHome = tool name: "${NODE_VERSION}", type: 'NodeJSInstallation'
                    env.PATH = "${nodeHome}/bin:${env.PATH}"
                }
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                // Add your deployment steps here
                // For example, you might rsync files to a server
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/out/**', allowEmptyArchive: true
            junit 'reports/**/*.xml'
        }

        success {
            echo 'Build succeeded!'
        }

        failure {
            echo 'Build failed!'
        }
    }
}
