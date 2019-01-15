<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Therapy Model
 *
 * @property \CakeDC\Users\Model\Table\UsersTable|\Cake\ORM\Association\BelongsTo $Users
 * @property \App\Model\Table\SessionsTable|\Cake\ORM\Association\HasMany $Sessions
 *
 * @method \App\Model\Entity\Therapy get($primaryKey, $options = [])
 * @method \App\Model\Entity\Therapy newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Therapy[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Therapy|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Therapy|bool saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Therapy patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Therapy[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Therapy findOrCreate($search, callable $callback = null, $options = [])
 */
class TherapyTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->setTable('therapy');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsTo('Users', [
            'foreignKey' => 'user_id',
            'joinType' => 'INNER'
        ]);
        $this->hasMany('Sessions', [
            'foreignKey' => 'therapy_id'
        ]);
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator)
    {
        $validator
            ->uuid('id')
            ->allowEmpty('id', 'create');

        $validator
            ->scalar('typeOfInjury')
            ->maxLength('typeOfInjury', 256)
            ->requirePresence('typeOfInjury', 'create')
            ->notEmpty('typeOfInjury');

        $validator
            ->dateTime('startingDate')
            ->requirePresence('startingDate', 'create')
            ->notEmpty('startingDate');

        $validator
            ->scalar('name')
            ->maxLength('name', 255)
            ->requirePresence('name', 'create')
            ->notEmpty('name');

        $validator
            ->dateTime('DOB')
            ->requirePresence('DOB', 'create')
            ->notEmpty('DOB');

        $validator
            ->scalar('gender')
            ->maxLength('gender', 255)
            ->requirePresence('gender', 'create')
            ->notEmpty('gender');

        $validator
            ->integer('age')
            ->requirePresence('age', 'create')
            ->notEmpty('age');

        $validator
            ->scalar('medID')
            ->maxLength('medID', 255)
            ->requirePresence('medID', 'create')
            ->notEmpty('medID');

        return $validator;
    }

    /**
     * Returns a rules checker object that will be used for validating
     * application integrity.
     *
     * @param \Cake\ORM\RulesChecker $rules The rules object to be modified.
     * @return \Cake\ORM\RulesChecker
     */
    public function buildRules(RulesChecker $rules)
    {
        $rules->add($rules->existsIn(['user_id'], 'Users'));

        return $rules;
    }
}
