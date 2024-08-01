pipeline {
    agent any

    environment {
        NODE_VERSION = 'nodejs-lts' // nodeJs install name
        VERCEL_TOKEN = credentials('vercel-token') //jenkin credential ID
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Techsip-CAP805/drinkwise'
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
                script {
                    def nodeHome = tool name: "${NODE_VERSION}", type: 'NodeJSInstallation'
                    env.PATH = "${nodeHome}/bin:${env.PATH}"
                }
                sh 'npm install -g vercel'
                sh 'vercel --token $VERCEL_TOKEN --prod'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/out/**', allowEmptyArchive: true
            junit 'reports/**/*.xml'
        }

        success {
            echo 'Build and deployment succeeded!'
        }

        failure {
            echo 'Build or deployment failed!'
        }
    }
}
